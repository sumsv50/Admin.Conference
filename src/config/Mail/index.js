const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
    tls:{
        rejectUnauthorized: false,
    }
});

module.exports.sendMail = async (mailOptions) => {
   await transpoter.sendMail(mailOptions);
}