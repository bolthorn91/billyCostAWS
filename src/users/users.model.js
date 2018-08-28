const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido.'],
        minlength: [6, 'Haz de introducir mínimo 6 caracteres.'],
        unique : false 
    },
    email: {
        type: String,
        required: [true, 'Email requerido.'],
        unique: true
    },
    password:String,
    publicAWSKey:String,
    privateAWSKey:String,
    createdAt: Number,
    isActive: Boolean,
    subDay: Boolean,
    subMonth: Boolean,
    lastDayCall: Number,
    lastMonthCall: Number,
    peticiones: Array,
    token: String
});
const users = mongoose.model('user', UserSchema);

module.exports = users;