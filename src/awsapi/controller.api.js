const axios = require('axios')
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
    getBillByKey: getBillByKey
}

function getBillByKey(req,res){
    const id= req.query._id;
    axios.get('http://localhost:4000/keys/'+id)
    .then(function(response){
        let publicKey=response.data.publicAWSKey;
        let privateKey=response.data.privateAWSKey;
        //     var creds = new AWS.Credentials({
//         accessKeyId: publicKey, secretAccessKey: privateKey
//     });
//     AWS.config.credentials = creds;

//     const costexplorer = new AWS.CostExplorer({
//         apiVersion: '2017-10-25',
//         region: 'us-east-1'
//     }); //us west no funcionas
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

    res.send(fakeParams)
    }); 
 

}