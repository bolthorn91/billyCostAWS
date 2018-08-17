const KeysModel = require('./keyaws.model');
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = {
    getAllKeys:getAllKeys, 
    getKeyById:getKeyById, 
    createKeys:createKeys, 
    // updateUser:updateUser, 
    // deleteUser:deleteUser
}

function getAllKeys(req, res) {
    KeysModel.find()
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))

}
function getKeyById(req, res) {
    KeysModel.findById(req.params.id)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

// function deleteUser(req, res) {
//     UserModel.findById(req.params.id)
//         .remove()
//         .then(response => res.json(response))
//         .catch((err) => handdleError(err, res))
// }

function createKeys(req, res) {
    req.body.createdAt=new Date()
    KeysModel.create(req.body)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}
// function updateUser(req, res) {
//     UserModel.findByIdAndUpdate(req.params.id, req.body, _UPDATE_DEFAULT_CONFIG)
//         .then(response => res.json(response))
//         .catch((err) => handdleError(err, res))
// }

function handdleError(err, res){
    return res.status(400).json(err);
}