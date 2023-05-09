const helpers={}
const nodemailer = require('nodemailer');

//Creamos el objeto de transporte
helpers.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'alejandro_toro23202@elpoli.edu.co',
        pass: 'elpoli202'
    }
});

// Contenido del correo
helpers.mailOptions = {
    from: 'alejandro_toro23202@elpoli.edu.co',
    to: 'destinatario@dominio.com',
    subject: 'Tu mascota feliz',
    text: 'Hola, este es un correo para validar tu adquisición en mascota feliz!'
};

module.exports=helpers