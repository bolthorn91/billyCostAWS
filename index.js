const express = require('express');
const config = require('./.env');
const AWS = require('aws-sdk');
const app = express();
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

app.use(express.json());

app.get('/', function(req,res){
    // var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    // AWS.config.credentials = credentials;
    
    AWS.config.credentials = creds;
    var costexplorer = new AWS.CostExplorer({apiVersion: '2017-10-25',region:'eu-west-1'});
    
    var params=null;
    costexplorer.getCostAndUsage(params, function(err, data) {
    if (err) console.log(err, err.stack); 
    else     res.json(data);           
  });
});

app.listen(_PORT, function() {
    console.log("Escuchando en el puerto " + _PORT);
})