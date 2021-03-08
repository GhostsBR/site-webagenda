const nodeoutlook = require('nodejs-nodemailer-outlook')
require('dotenv').config({path:'variables.env'});

exports.sendMail = (to, subject, html) => {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        from: process.env.EMAIL,
        to,
        subject,
        html,
    
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}
