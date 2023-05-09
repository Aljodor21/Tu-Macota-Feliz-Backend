const helpers={}
const nodemailer = require('nodemailer');

//Creamos el objeto de transporte
helpers.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'tumascotafeliz41@gmail.com',
        pass: 'ajzrwnidkfqbhgtz'
    }
});

// Crear el mensaje de correo electrónico
helpers.mailOptions = {
    from: 'tumascotafeliz41@gmail.com',
    to: 'prueba@.com',
    subject: 'Tu mascota feliz',
    text: 'Este es un correo de prueba enviado desde Node.js'
};


module.exports=helpers