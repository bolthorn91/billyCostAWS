const express = require('express');
const cors = require('cors')
const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');
const session = require('express-session')
const sessionController = require('./session/session.controller')
const sessionApi = require ('./session')
const awsapi = require('./awsapi');
const keyaws = require('./keysaws');
const users = require('./users');
const config = require('../.env');
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

const app = express();
app.use(cors())
app.use(express.json());
// app.use(session({
//     secret: "secret cookie",
//     saveUninitialized: false,
//     resave: false,
//     cookie: { maxAge: 10000 }
// }))
// app.use(sessionController.checkAuth);



//Routes
app.use('/users', users);
app.use('/awsapi', awsapi);
app.use('/session', sessionApi);
app.use('/keys', keyaws);


const URI = options.URI;
const mongoDBDataBaseName = options.mongoDBDataBaseName;
const mongoose = require('mongoose');
mongoose.connect(URI);
app.listen(_PORT, function () {
    console.log("Escuchando en el puerto " + _PORT);
})