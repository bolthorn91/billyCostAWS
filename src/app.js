const express = require('express');
const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');
const session = require('express-session')
const sessionController = require('./session/session.controller')
const sessionApi = require ('./session')
const awsapi = require('./awsapi');
const keyaws = require('./keysaws');
const users = require('./users');
const config = require('../.env');
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

const app = express();
app.use(express.json());
app.use(session({
    secret: "secret cookie",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 10000 }
}))
app.use(sessionController.checkAuth);


//Routes
app.use('/users', users);
app.use('/awsapi', awsapi);
app.use('/session', sessionApi);
app.use('/keys', keyaws);


const URI = options.URI;
const mongoDBDataBaseName = options.mongoDBDataBaseName;
const mongoose = require('mongoose');
mongoose.connect(URI + mongoDBDataBaseName);



// app.get('/', function (req, res) {

//     var creds = new AWS.Credentials({
//         accessKeyId: 'AKIAIZEESAFSFDXH3WHA', secretAccessKey: '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'
//     });
//     AWS.config.credentials = creds;

//     const costexplorer = new AWS.CostExplorer({
//         apiVersion: '2017-10-25',
//         region: 'us-east-1'
//     }); //us west no funciona


//     const params = {
//         Granularity: 'MONTHLY',
//         TimePeriod: {
//             End: '2018-06-01', /* required */
//             Start: '2018-03-01' /* required */
//         },
//         Metrics: ["AmortizedCost", "BlendedCost", "UnblendedCost", "UsageQuantity"]
//     }


//     costexplorer.getCostAndUsage(params, function (err, data) {
//         if (err) console.log(err, err.stack);
//         else res.send(data);
//     });
// });

app.listen(_PORT, function () {
    console.log("Escuchando en el puerto " + _PORT);
})