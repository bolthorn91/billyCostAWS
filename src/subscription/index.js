const mongoose = require('mongoose');
const schedule = require('node-schedule')
const axios = require('axios')
const cronjob = schedule.scheduleJob('10 * * * * *', function () {
    subscriptionExec()
})
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

/*function createUser() {
    mockModel.create(
        {
            name: "pepejuan",
            subscribed: true,
            lastDayCall: 0
        },
        {
            name: "antonio",
            subscribed: true,
            lastDayCall: 3
        },
        {
            name: "manuel",
            subscribed: true,
            lastDayCall: 6
        },
        {
            name: "alfonso",
            subscribed: false,
            lastDayCall: 21
        },
    )
        .then(response => response)
}*/

function subscriptionExec() {
    const date = new Date();
    const currentDayOfMonth = { day: date.getDate(), month: date.getMonth() }
    
    function getAllUsersSubs(req, res) {
        mockModel.find()
        .then(response => {
                getSubscriptionVal(response)
            })

    }

    function getSubscriptionVal(usersData) {
        for (let i = 0; i < usersData.length; i++) {
            const user = usersData[i]
            if (user.subscribed === true && user.lastDayCall != currentDayOfMonth.day) {
                updateUser(user)
                launchSlackBot()
            }
            if (user.subscribed === false) {
                console.log('este usuario no esta suscrito', user._id)
            }
            else {
                console.log('el usuario' + user._id + 'ya hizo la peticion')
            }
        }
    }

    getAllUsersSubs()

    function updateUser(userData) {
        console.log('a estos usuarios se les esta cambiando el dia:', userData)
        const body = { lastDayCall: currentDayOfMonth.day }
        mockModel.findByIdAndUpdate(userData._id, body, _UPDATE_DEFAULT_CONFIG)
            .then(response => console.log(response))
            .catch((err) => handdleError(err, res))
    }

    function launchSlackBot() {
        axios.get('http://localhost:4000/awsapi')
            .then(response => console.log(response.data))
            .catch((err) => handdleError(err, res))
    }

}

function handdleError(err, res) {
    return res.status(400).json(err)
}


subscriptionExec()