const mongoose = require('mongoose');
const schedule = require('node-schedule')
const axios = require('axios')
const config = require('../../.env');
const userModel = require('../users/users.model')
const options = config[process.env.NODE_ENV];
if (options.GET === true) {
    const cronjob = schedule.scheduleJob('1 * * * * *', function () {
        subscriptionExec()
    })
}
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

const pruebaSchema = mongoose.Schema({
    name: String,
    subscribed: Boolean,
    lastDayCall: Number
});

var mockModel = mongoose.model('prueba', pruebaSchema)

module.exports = {
    subscriptionExec: subscriptionExec,

}

function subscriptionExec() {
    const date = new Date();
    const currentDayOfMonth = { day: date.getDate(), month: date.getMonth() }
    
    function getAllUsersSubs() {
        userModel.find()
        .then(response => {
                getSubscriptionVal(response)
            })

    }

    function getSubscriptionVal(usersData) {
        for (let i = 0; i < usersData.length; i++) {
            const user = usersData[i]
            if (user.subDay === true && user.lastDayCall != currentDayOfMonth.day) {
                updateUser(user)
                launchSlackBot()
            }
            if (user.subDay === false) {
                console.log('este usuario no esta suscrito', user._id)
                dayGet(user)
            }
            else {
                console.log('el usuario ' + user._id + 'ya hizo la peticion')
            }
        }
    }

    getAllUsersSubs()

    function updateUser(userData) {
        console.log('a estos usuarios se les esta cambiando el dia:', userData)
        const body = { lastDayCall: currentDayOfMonth.day }
        userModel.findByIdAndUpdate(userData._id, body, _UPDATE_DEFAULT_CONFIG)
            .then(response => console.log(response))
            .catch((err) => handdleError(err, res))
    }

    function launchSlackBot() {
        axios.get('http://localhost:4000/awsapi')
            .then(response => console.log(response.data))
            .catch((err) => handdleError(err, res))
    }

    function dayGet(userData){
        axios.get('http://localhost:4000/users/'+userData._id)
        .then(response => console.log(response.data))
        //.catch((err) => handdleError(err, res))
    }
}

function handdleError(err, res) {
    return res.status(400).json(err)
}