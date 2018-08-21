const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
//const uuidv1 = require('uuid/v1');
//const AWS = require('aws-sdk');
//const session = require('express-session')
//const sessionController = require('./session/session.controller')
const sessionApi = require ('./session')
const awsapi = require('./awsapi');
const keyaws = require('./keysaws');
const users = require('./users');
const config = require('../.env');
var jwt = require('jsonwebtoken');
const UserModel = require('./users/users.model');
var jwt = require('jsonwebtoken');
//var randtoken = require('rand-token')
var SECRET = "tumamasita" 
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(session({
//     secret: "secretcookie",
//     resave: false,
//     saveUninitialized: false,
//     // cookie: { maxAge: 10000 }
// }))
//app.use(sessionController.checkAuth);


//Routes

app.post("/login", function(req,res){
    UserModel.findOne({
        email:req.body.email,
        password:req.body.password
    })
    .then((response) => {
        if(response!=null){
            var user = { 
                'username': response.nombre 
            } 
            var token = jwt.sign(user, SECRET, { expiresIn: 60*60*24 })
            res.json({token:token})
        }else{
            res.status(401).send({
                error: 'usuario o contraseña inválidos'
            })
        } 
    })
    .catch((err) => handdleError(err, res))
})

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
      } else {
            console.log("funciona");
            next();
      }
    })
});
app.use('/users', users);
app.use('/awsapi', awsapi);
app.use('/session', sessionApi);
app.use('/keys', keyaws);


const URI = options.URI;
const mongoose = require('mongoose');
mongoose.connect(URI);
app.listen(_PORT, function () {
    console.log("Escuchando en el puerto " + _PORT);
})