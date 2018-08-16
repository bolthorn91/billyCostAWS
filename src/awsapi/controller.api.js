const axios = require('axios')


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
    console.log(fakeParams)
    res.send(fakeParams)
}