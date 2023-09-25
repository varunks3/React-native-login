const nodemailer = require("nodemailer")


// sending mail to email address by Less secure app feature from gmail, change the createTransport method if you want to send mail defferent method
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PASS,
    }
});

const sendEmail = async(mailDetails) => {
    try{
        await mailTransporter.sendMail(mailDetails)
        return;
    }catch (error){
        throw Error("failed to send mail", error)
    }
}

module.exports = sendEmail;