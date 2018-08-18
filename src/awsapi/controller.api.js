const axios = require('axios')
const AWS = require('aws-sdk');
/*
key public: AKIAIZEESAFSFDXH3WHA 
key private: KWR2Ssep1iIB9UGVYcaIi06fK8RwCPi0GtsKdeTs 
*/

const fakeParams = {
        "ResultsByTime": [
            {
                "TimePeriod": {
                    "Start": "2018-03-01",
                    "End": "2018-04-01"
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
                        "Amount": "0",
                        "Unit": "N/A"
                    }
                },
                "Groups": [],
                "Estimated": true
            },
            {
                "TimePeriod": {
                    "Start": "2018-04-01",
                    "End": "2018-05-01"
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
                        "Amount": "0",
                        "Unit": "N/A"
                    }
                },
                "Groups": [],
                "Estimated": true
            },
            {
                "TimePeriod": {
                    "Start": "2018-05-01",
                    "End": "2018-06-01"
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
                        "Amount": "0",
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
    getBillByKey: getBillByKey
}

function getBillByKeyFake(req,res){
    res.send(fakeParams)
}

function getBillByKey(req,res){
    const publicAWSKey= req.query.publicAWSKey
    const privateAWSKey= req.query.privateAWSKey

    console.log(publicAWSKey, privateAWSKey)

    var creds = new AWS.Credentials({
         accessKeyId: publicAWSKey, secretAccessKey: privateAWSKey
     });
     AWS.config.credentials = creds;

     const costexplorer = new AWS.CostExplorer({
         apiVersion: '2017-10-25',
         region: 'us-east-1'
     }); //us west no funcionas
     const params = {
         Granularity: 'DAILY',
         TimePeriod: {
             Start: '2018-06-01', // required 
             End: '2018-06-10', // required 
        },
         Metrics: ["AmortizedCost", "BlendedCost", "UnblendedCost", "UsageQuantity"]
     }


     costexplorer.getCostAndUsage(params, function (err, data) {
         if (err) console.log(err, err.stack);
         else res.send(data);
     })

}
