const mongoose = require('mongoose');

var AWSSchema = mongoose.Schema({
    publicAWSKey:String,
    privateAWSKey:String,
    createdAt: Number,
});

var AWSConnection = mongoose.model('user', AWSSchema);

module.exports = AWSConnection;