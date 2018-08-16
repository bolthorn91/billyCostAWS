const express = require('express');
const config = require('../.env');
const AWS = require('aws-sdk');
const awsapi = require('./awsapi');
const users = require('./users');
const app = express();
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;
app.use(express.json());
app.use('/users', users);
app.use('/awsapi', awsapi)
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
//         Granularity: 'DAILY',
//         TimePeriod: {
//             End: '2018-06-01', /* required */
//             Start: '2018-03-01' /* required */
//         },
//         Metrics: [
//             'AmortizedCost',
//         ],
//     }


//     costexplorer.getCostAndUsage(params, function (err, data) {
//         if (err) console.log(err, err.stack);
//         else res.send(data);
//     });
// });

app.listen(_PORT, function () {
    console.log("Escuchando en el puerto " + _PORT);
})