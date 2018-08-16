const UserModel = require('./users.model');
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = {
    getAllUsers:getAllUsers, 
    getUserById:getUserById, 
    createUser:createUser, 
    updateUser:updateUser, 
    deleteUser:deleteUser
}

function getAllUsers(req, res) {
    UserModel.find()
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))

}
function getUserById(req, res) {
    UserModel.findById(req.params.id)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function deleteUser(req, res) {
    UserModel.findById(req.params.id)
        .remove()
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function createUser(req, res) {
    UserModel.create(req.body)
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