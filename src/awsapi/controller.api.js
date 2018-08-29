const AWS = require('aws-sdk');
const fs = require('fs');

const csv = require('fast-csv');

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
    getBillByMonth: getBillByMonth,
    getAllBillFake: getAllBillFake
}

const jsonParams = require('./data/awsparams.json')

function getBillByKeyFake(req, res) {
    console.log(req.query.publicAWSKey, req.query.privateAWSKey)
    res.send(fakeParams)
}

function getBillByDay(req, res) {
    let fecha = new Date();
    let fechAct = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();
    let tiempo = fecha.getTime();
    let milisegundos = parseInt(1 * 24 * 60 * 60 * 1000);
    total = fecha.setTime(tiempo - milisegundos);
    day = fecha.getDate();
    month = fecha.getMonth() + 1;
    year = fecha.getFullYear();
    let fechAnt = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + fecha.getDate();


    if (req.query.dayStart != null && req.query.dayEnd != null) {
        fechAnt = req.query.dayStart
        fechAct = req.query.dayEnd
    }


    const creds = new AWS.Credentials({
        accessKeyId: req.body.publicAWSKey,
        secretAccessKey: req.body.privateAWSKey,
    });

    AWS.config.credentials = creds;
    const costexplorer = new AWS.CostExplorer({
        apiVersion: '2017-10-25',
        region: 'us-east-1'
    }); //us west no funcionas
    const params = {
        Filter: {
            Dimensions: {
                Key: "SERVICE",
                Values: culo
            }
        },
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


function getBillByMonth(req, res) {
    let fecha = new Date();
    let fechAct = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + '01';
    let fechAnt = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 0)).slice(-2) + "-" + '01';

    if (req.query.monthStart != null && req.query.monthEnd != null) {
        fechAnt = req.query.monthStart
        fechAct = req.query.monthEnd
    }

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

function valuesAWS(publicAWSKey, privateAWSKey) {
    const creds = new AWS.Credentials({
        accessKeyId: publicAWSKey, privateAWSKey
    });
    AWS.config.credentials = creds;

    const costexplorer = new AWS.CostExplorer({
        apiVersion: '2017-10-25',
        region: 'us-east-1'
    }); //us west no funcionas

    var params = {
        Dimension: "SERVICE",
        TimePeriod: { /* required */
            End: "2018-08-10",
            Start: '2018-08-01'
        },
        Context: "COST_AND_USAGE"
    };

    costexplorer.getDimensionValues(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            let culo = [];
            for (var i = 0; i < pene.DimensionValues.length; i++) {
                culo.push(pene.DimensionValues[i].Value)
            }
            return culo;
        }
    });
}

var bill = {"data": [
    {"allMonth": [
        {
            "TimePeriod": {
                "Start": "2018-08-01",
                "End": "2018-08-02"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "1112.1153649648",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-02",
                "End": "2018-08-03"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "98.7349646395",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-03",
                "End": "2018-08-04"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "94.0031040595",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-04",
                "End": "2018-08-05"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.490830117",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-05",
                "End": "2018-08-06"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.490830117",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-06",
                "End": "2018-08-07"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "239.4966145044",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-07",
                "End": "2018-08-08"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "2072.4975712342",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-08",
                "End": "2018-08-09"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3062.5008522249",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-09",
                "End": "2018-08-10"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3865.5033112928",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-10",
                "End": "2018-08-11"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "2100.4976287471",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-11",
                "End": "2018-08-12"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4908906002",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-12",
                "End": "2018-08-13"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4908906002",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-13",
                "End": "2018-08-14"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4895.7288307295",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-14",
                "End": "2018-08-15"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3148.5032431341",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-15",
                "End": "2018-08-16"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "51.4929442032",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-16",
                "End": "2018-08-17"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5212.5101092391",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-17",
                "End": "2018-08-18"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3150.5032556383",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-18",
                "End": "2018-08-19"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4929311843",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-19",
                "End": "2018-08-20"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3423.830298771",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-20",
                "End": "2018-08-21"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5244.5279318495",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-21",
                "End": "2018-08-22"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5598.6665247871",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-22",
                "End": "2018-08-23"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4224.5625726828",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-23",
                "End": "2018-08-24"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5251.5660181302",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-24",
                "End": "2018-08-25"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4223.5625658813",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-25",
                "End": "2018-08-26"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.5485637137",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        }
    ]},
    {"ec2": [
        {
            "TimePeriod": {
                "Start": "2018-08-01",
                "End": "2018-08-02"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.7108341275",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "1112.1153649648",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-02",
                "End": "2018-08-03"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.3705501841",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "98.7349646395",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-03",
                "End": "2018-08-04"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.1677762912",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "94.0031040595",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-04",
                "End": "2018-08-05"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.490830117",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-05",
                "End": "2018-08-06"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339885635",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.490830117",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-06",
                "End": "2018-08-07"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0344555637",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "239.4966145044",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-07",
                "End": "2018-08-08"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0441099547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "2072.4975712342",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-08",
                "End": "2018-08-09"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0490599547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3062.5008522249",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-09",
                "End": "2018-08-10"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0530749547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3865.5033112928",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-10",
                "End": "2018-08-11"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0442373547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "2100.4976287471",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-11",
                "End": "2018-08-12"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4908906002",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-12",
                "End": "2018-08-13"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0339899547",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4908906002",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-13",
                "End": "2018-08-14"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0580776791",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4895.7288307295",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-14",
                "End": "2018-08-15"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0495368881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3148.5032431341",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-15",
                "End": "2018-08-16"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0340618881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "51.4929442032",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-16",
                "End": "2018-08-17"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0598568881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5212.5101092391",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-17",
                "End": "2018-08-18"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0495568881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3150.5032556383",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-18",
                "End": "2018-08-19"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0340368881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.4929311843",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-19",
                "End": "2018-08-20"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0505622881",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "3423.830298771",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-20",
                "End": "2018-08-21"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0601176543",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5244.5279318495",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-21",
                "End": "2018-08-22"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.1433596698",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5598.6665247871",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-22",
                "End": "2018-08-23"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0574572436",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4224.5625726828",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-23",
                "End": "2018-08-24"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0629023338",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "5251.5660181302",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-24",
                "End": "2018-08-25"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0574516315",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "4223.5625658813",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        },
        {
            "TimePeriod": {
                "Start": "2018-08-25",
                "End": "2018-08-26"
            },
            "Total": {
                "AmortizedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "BlendedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "UnblendedCost": {
                    "Amount": "0.0353164363",
                    "Unit": "USD"
                },
                "UsageQuantity": {
                    "Amount": "48.5485637137",
                    "Unit": "N/A"
                }
            },
            "Groups": [],
            "Estimated": true
        }
    ]}
]}



async function getAllBillFake(req, res) {
    const ws = "";
    let array = await arrayBillCSV();
    console.log(array)
    csv.write(array, { headers: true }).pipe(fs.createWriteStream('costos.csv'))
    setTimeout(function(){ res.download("costos.csv") }, 2000);
}


function arrayBillCSV(){
    let array = [];
    
    for(let i = 0;i<bill.data.length;i++){
        let type = bill.data[i]
        array.push(Object.keys(type))
        let object = type[Object.keys(type)[0]]
        let variables = ["Fecha", "Gasto", "Moneda" ]
        array.push(variables)
        for(let j = 0;j<object.length;j++){
            let variables_reales=[object[j].TimePeriod.Start, object[j].Total.AmortizedCost.Amount, object[j].Total.AmortizedCost.Unit]
            array.push(variables_reales)
        }
        array.push([""])
    }
    return array;
}














