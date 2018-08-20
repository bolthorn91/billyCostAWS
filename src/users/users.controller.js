const UserModel = require('./users.model');
const nodemailer = require('nodemailer')
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = {
    getAllUsers:getAllUsers, 
    getUserById:getUserById, 
    createUser:createUser, 
    updateUser:updateUser, 
    deleteUser:deleteUser,
    validateUser:validateUser
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

async function createUser(req, res) {
    req.body.createdAt=new Date()
    const email = req.body.email;

   /* let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth:{
            user: 'proyecto.botslack@gmail.com',
            pass: 'proyectobotslack1.'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    
    let HelperOtions = {
        from: '"Proyectazo" <proyecto.botslack@gmail.com',
        to: email,
        subject: 'Esto es otra prueba',
        text: "FUNCIONA!!!!",
        html: '<a href ="http://localhost:4000/users/validate/5b7aa567567a2514408a8a2d">Click aqui para validar tu cuenta</a>'
    };
    
    transporter.sendMail(HelperOtions, (error, info) => {
        if(error) {
            return console.log(error);
        }
        console.log("mensaje enviado")
        console.log(info);
    
    });*/

    const pepito = ''
    let petition = UserModel.create(req.body)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
    let awaiting = await petition
}

function validateUser(req, res) {
    req.body.isActive=true;
     UserModel.findByIdAndUpdate(req.params.id, req.body, _UPDATE_DEFAULT_CONFIG)
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