const UserModel = require('../users/users.model');
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = {
    createKeys:updateKeys,  
    updateUser:updateUser,  
    deleteUser:deleteUser,
    deleteKeys:deleteKeys
}

function deleteUser(req, res) {
    UserModel.findById(req.params.id)
        .remove()
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function updateKeys(req, res) {
    let params={
        "publicAWSKey":req.body.publicAWSKey,
        "privateAWSKey":req.body.privateAWSKey
    }
    UserModel.findByIdAndUpdate(req.params.id, params, _UPDATE_DEFAULT_CONFIG)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}
function deleteKeys(req, res) {
    let params={
        "publicAWSKey":null,
        "privateAWSKey":null
    }
    UserModel.findByIdAndUpdate(req.params.id, params, _UPDATE_DEFAULT_CONFIG)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}


function updateUser(req, res) {
    UserModel.findByIdAndUpdate(req.params.id, req.body, _UPDATE_DEFAULT_CONFIG)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}


function handdleError(err, res){
    return res.status(400).json(err);
}