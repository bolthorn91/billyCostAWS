const mongoose = require('mongoose');

var KeysSchema = mongoose.Schema({
    publicAWSKey:String,
    privateAWSKey:String,
    createdAt: Number
});

var keys = mongoose.model('penes', KeysSchema);
console.log("2")
module.exports = keys;