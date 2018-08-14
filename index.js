const express = require('express');
const config = require('./.env');

const app = express();
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;

app.use(express.json());

app.listen(_PORT, function() {
    console.log("Escuchando en el puerto " + _PORT);
})