const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido.'],
        minlength: [8, 'Haz de introducir mínimo 8 caracteres.'],
        unique : false 
    },
    email: {
        type: String,
        required: [true, 'Email requerido.'],
        unique: true
    },
    api_token:{
        type: String,
        required: [true, 'Fallo API Token.']
    },
    password:String,
    //publicAWSKey:String,
    //privateAWSKey:String,
    //confirmAWSKeys:Boolean,
    createdAt: Number,
    isActive: Boolean
});

var users = mongoose.model('user', UserSchema);

module.exports = users;