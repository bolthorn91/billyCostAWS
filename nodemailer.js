var nodemailer = require('nodemailer');
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
    from: '"Proyectazo" <proyecto.botslack@gmail.com',
    to: 'eduardo.places@gmail.com',
    subject: 'Esto es otra prueba',
    text: "FUNCIONA!!!!"
};
transporter.sendMail(HelperOtions, (error, info) => {
    if(error) {
        return console.log(error);
    }
    console.log("mensaje enviado")
    console.log(info);

});