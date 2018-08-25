const UserModel = require('./users.model');
const nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
const SECRET = "tumamasita"
const jwt = require('jsonwebtoken');
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = { 
    createUser:createUser, 
    validateEmail:validateEmail,
    sessionUser:sessionUser,
    getUsers:getUsers
}

function createUser(req, res) {
    req.body.createdAt=new Date()
    req.body.isActive=false;
    req.body.subDay=false;
    req.body.subMonth=false;
    req.body.lastDayCall= 0,
    req.body.lastMonthCall= 0,
    UserModel.create(req.body)
        .then((response) => {
            sendEmail(response._id, response.email)
            let user = { 
                'username': response.nombre 
            } 
            let token = jwt.sign(user, SECRET, { expiresIn: 60*60*1 })
            let json = {
                "id":response._id,
                "nombre":response.nombre,
                "token":token
            }
            res.json(json);
        })
        .catch((err) => handdleError(err, res))
}

function validateEmail(req, res) {
    req.body.isActive=true;
     UserModel.findByIdAndUpdate(req.params.id, req.body, _UPDATE_DEFAULT_CONFIG)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function sessionUser(req,res){
    UserModel.findOne({
        email:req.body.email,
        password:req.body.password
    })
    .then((response) => {
        if(response!=null){
            var user = { 
                'username': response.nombre 
            } 
            var token = jwt.sign(user, SECRET, { expiresIn: 60*60*1 })
            let json = {
                "id":response._id,
                "nombre":response.nombre,
                "token":token
            }
            res.json(json);
        }else{
            res.status(401).send({
                error: 'usuario o contraseña inválidos'
            })
        } 
    })
    .catch((err) => handdleError(err, res))
}

function handdleError(err, res){
    return res.status(400).json(err);
}

function sendEmail(id, email){
    let transporter = nodemailer.createTransport({
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
        from: '"Bot Cost Slack" <proyecto.botslack@gmail.com',
        to: email,
        subject: 'Validate Email Slackbot',
        text: "FUNCIONA!!!!",
        html: `
        Si quieres validar tu correo pincha en el enlace de abajo.
        <a href ="http://localhost:4000/users/validate/${id}">Click aqui para validar tu cuenta aqui</a>`
    };
    
    transporter.sendMail(HelperOtions, (error, info) => {
        if(error) {
            return console.log(error);
        }
    });
}
   
function getUsers(req, res) {
    UserModel.find()
    .then(response => res.json(response))

}