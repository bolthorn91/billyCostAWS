//const fs = require('fs')
const axios = require('axios')


const bill = {
    "GroupDefinitions": [
      {
        "Key": "SERVICE",
        "Type": "DIMENSION"
      },
      {
        "Key": "Environment",
        "Type": "TAG"
      }
    ],
    "ResultsByTime": [
      {
        "Estimated": false,
        "Groups": [
          {
            "Keys": [
              "Amazon Simple Storage Service",
              "Environment$Prod"
            ],
            "Metrics": {
              "BlendedCost": {
                "Amount": "39.1603300457",
                "Unit": "USD"
              },
              "UnblendedCost": {
                "Amount": "39.1603300457",
                "Unit": "USD"
              },
              "UsageQuantity": {
                "Amount": "173842.5440074444",
                "Unit": "N/A"
              }
            }
          },
          {
            "Keys": [
              "Amazon Simple Storage Service",
              "Environment$Test"
            ],
            "Metrics": {
              "BlendedCost": {
                "Amount": "0.1337464807",
                "Unit": "USD"
              },
              "UnblendedCost": {
               "Amount": "0.1337464807",
                "Unit": "USD"
              },
              "UsageQuantity": {
                "Amount": "15992.0786663399",
                "Unit": "N/A"
              }
            }
          }
        ],
        "TimePeriod": {
          "End": "2017-10-01",
          "Start": "2017-09-01"
        },
        "Total": {}
      }
    ]
  }
module.exports = {
    getBillByKey: getBillByKey
}

function getBillByKey(req,res){
    console.log(bill)
    res.send(bill)
}