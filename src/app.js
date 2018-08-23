const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sub = require('./subscription')
const pruebas = require('./subscription/pruebas')
const awsapi = require('./awsapi');
const secure = require('./secure');
const users = require('./users');
const config = require('../.env');
const SECRET = "tumamasita" 
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use('/users', users);

// Midleware de json web token
app.use(function(req, res, next){
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }
    token = token.replace('Bearer ', '')
    jwt.verify(token, SECRET, function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      }
      next();
    })
});
app.use('/awsapi', awsapi);
app.use('/secure', secure);



const URI = options.URI;
const mongoose = require('mongoose');
mongoose.connect(URI);
app.listen(_PORT, function () {
    console.log("Escuchando en el puerto " + _PORT);
})