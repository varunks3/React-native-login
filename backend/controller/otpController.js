const OTP = require("../models/otp")
const generateOTP = require("./generateOTP")
const sendEmail = require("./sendEmail")

const verifyOTP = async ({email, otp}) => {
    try{
        if(!(email && otp)){
           throw Error("email or otp not provided")
        }
        // Getting otp model record for user
        const matchedOTPRecord = await OTP.findOne({
            email,
        })
        if (!matchedOTPRecord){
           throw Error("otp not found")
        }
        const {expiresAt} = matchedOTPRecord
        if (expiresAt < Date.now()){
            await OTP.deleteOne({email})
            throw Error("otp has expired")
        }
        // validating user entered otp and database otp
        const validOTP = (otp == matchedOTPRecord.otp)
        //returnning boolean value
        return validOTP
    }catch(error){
       throw Error(error)
    }
}
const sendOTP = async ({email }) => {
    try {
        if(!(email)){
            throw Error('provide all required input')
        }
        await OTP.deleteOne({email})

        const generatedOTP = await generateOTP();
        let mailDetails = {
            from: process.env.MAIL_ADD,
            to: email,
            subject: "Otp for resetting password",
            html: `<div> 
                    <p>Your Otp for resetting password is ${generatedOTP} expires in 1hr</p>
                </div>
                `,
        };
        await sendEmail(mailDetails);
        let duration = 1 // set the duration to 1 hr 
        const newOTP = new OTP({
            email,
            otp: generatedOTP,
            createdAT: Date.now(),
            expiresAt: Date.now() + 3600000 * + duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord
    }catch(err){
        throw Error("Can't send the mail", err)
    } 
}
const deleteOTP = async (email) => {
    try{
        await OTP.deleteOne({email});
    }catch(error){
        throw Error(error)
    }
}
module.exports = {sendOTP , verifyOTP, deleteOTP}