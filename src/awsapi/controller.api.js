const AWS = require('aws-sdk');

const fakeParams = {
    "ResultsByTime": [
        {
            "TimePeriod": {
                "Start": "2018-08-18",
                "End": "2018-08-19"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "63.3472910715",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        }
    ]
}

module.exports = {
    getBillByKeyFake: getBillByKeyFake,
    getBillByDay: getBillByDay,
    getBillByMonth: getBillByMonth
}

const jsonParams = require('./data/awsparams.json')

function getBillByKeyFake(req,res){
    console.log(req.query.publicAWSKey, req.query.privateAWSKey)
    res.send(fakeParams)
}

function getBillByDay(req,res){
    let fecha = new Date();
    let fechAct= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();
    let tiempo=fecha.getTime();
    let milisegundos=parseInt(1*24*60*60*1000);
    total=fecha.setTime(tiempo-milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
    let fechAnt= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();

    const creds = new AWS.Credentials({
        accessKeyId: req.query.publicAWSKey, 
         secretAccessKey: req.query.privateAWSKey,
    });

     AWS.config.credentials = creds;
     console.log(AWS.config.credentials)

     const costexplorer = new AWS.CostExplorer({
         apiVersion: '2017-10-25',
         region: 'us-east-1'
     }); //us west no funcionas
     const params = {
         Granularity: 'DAILY',
         TimePeriod: {
             Start: fechAnt, // required 
             End: fechAct, // required 
        },
         Metrics: ["AmortizedCost", "BlendedCost", "UnblendedCost", "UsageQuantity"]
     }

     costexplorer.getCostAndUsage(params, function (err, data) {
         if (err) console.log(err, err.stack);
         else res.send(data);
     })
}


function getBillByMonth(req,res){
    let fecha = new Date();
    let fechAct= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + '01';
    let fechAnt= fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 0)).slice(-2) + "-" + '01';

    const creds = new AWS.Credentials({
         accessKeyId: req.query.publicAWSKey, secretAccessKey: req.query.privateAWSKey
     });
     AWS.config.credentials = creds;

     const costexplorer = new AWS.CostExplorer({
         apiVersion: '2017-10-25',
         region: 'us-east-1'
     }); //us west no funcionas


     const params = {
         Granularity: 'MONTHLY',
         TimePeriod: {
             Start: fechAnt, // required 
             End: fechAct, // required 
        },
         Metrics: ["AmortizedCost", "BlendedCost", "UnblendedCost", "UsageQuantity"]
     }

     costexplorer.getCostAndUsage(params, function (err, data) {
         if (err) console.log(err, err.stack);
         else res.send(data);
     })

}
