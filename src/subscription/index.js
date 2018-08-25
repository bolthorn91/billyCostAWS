const mongoose = require('mongoose');
const schedule = require('node-schedule')
const axios = require('axios')
axios.defaults.headers.common['authorization'] = 'soisunosputos';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
                const dayUpdate = true
                updateUser(user, dayUpdate)
                //launchSlackBot()
            }
            if (user.subDay === false) {
                console.log('este usuario no esta suscrito a la petición diaria', user._id)
            }
            if (user.subMonth === true && user.lastMonthCall != currentDayOfMonth.month) {
                const monthUpdate = true
                updateUser(user, monthUpdate)
                //launchSlackBot()
            }
            if (user.subMonth === false) {
                console.log('este usuario no esta suscrito a la petición mensual', user._id)
                //monthlyRequest(user)
            }
            else {
                dailyRequest(user)
                console.log('el usuario' + user._id + 'ya hizo su peticion')
            }
        }
    }

    getAllUsersSubs()

    function updateUser(userData, day, month) {
        if (day = true) { 
            console.log('a estos usuarios se les esta cambiando el dia:', userData)
            const body = { lastDayCall: currentDayOfMonth.day }
            userModel.findByIdAndUpdate(userData._id, body, _UPDATE_DEFAULT_CONFIG)
                .then(response => console.log(response))
                .catch((err) => handdleError(err, res))
        }
        
        if (month = true) { 
            console.log('a estos usuarios se les esta cambiando el mes:', userData)
            const body = { lastMonthCall: currentDayOfMonth.month }
            userModel.findByIdAndUpdate(userData._id, body, _UPDATE_DEFAULT_CONFIG)
                .then(response => console.log(response))
                .catch((err) => handdleError(err, res))
        }
    }
/* 
    function launchSlackBot() {
        axios.get('http://localhost:4000/awsapi')
            .then(response => console.log(response.data))
            .catch((err) => handdleError(err, res))
    }
 */
    function dailyRequest(userData){
        if (userData.publicAWSKey != null || userData.privateAWSKey != null) {
            axios.get(`http://localhost:4000/awsapi/day?publicAWSKey='${userData.publicAWSKey}'
            &privateAWSKey='${userData.privateAWSKey}'`)
            .then(response => response.data)
            .catch(err => console.log(err))
        }
    }

    function monthlyRequest(userData){
        if (userData.publicAWSKey != null || userData.privateAWSKey != null) {
            axios.get(`http://localhost:4000/awsapi/month?publicAWSKey='${userData.publicAWSKey}'
            &privateAWSKey='${userData.privateAWSKey}'`)
            .then(response => response.data)
            .catch(err => console.log(err))
        }
    }
}

function handdleError(err, res) {
    return res.status(400).json(err)
}

//subscriptionExec()