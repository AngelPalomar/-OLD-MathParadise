const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: `mathparadise.email`,
            service: 'gmail',
            auth: {
                user: 'mathparadise.juega@gmail.com',
                pass: 'math89@$o?3'
            }
        });

        await transporter.sendMail({
            from: 'notificaciones@mathparadise.net',
            to: email,
            subject: subject,
            text: text
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;