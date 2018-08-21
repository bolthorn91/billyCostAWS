const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    password:String,
    createdAt: Number,
    isActive: Boolean,
    subDay: Boolean,
    subMonth: Boolean,
});

// UserSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.hash_password);
// }

var users = mongoose.model('user', UserSchema);

module.exports = users;