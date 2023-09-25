const User = require("../models/user")
const {sendOTP, verifyOTP, deleteOTP} = require("./otpController")
const bcrypt = require('bcrypt');

const resetUserPassword = async ({email, otp, newPassword}) => {
    try{
        const validOTP = await verifyOTP({email, otp})
        if (!validOTP){
            throw Error("Invalid otp")
        }
        // perform new password requirement criteria meets or not
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        // updating old password with new password
        await User.updateOne({email},{password:hashedNewPassword})
        await deleteOTP(email);
        return
    }catch(error){
        console.log(error, "error at resetting pass")
    }
}

const sendPassResetOtpEmail = async (email) => {
    try{
        const existingUser  = await User.findOne({email})
        if (!existingUser){
            throw Error("There is not account found for provided email")
        }
        const createdOTP = await sendOTP({email})
        return createdOTP
    }catch(error){
        console.log(error)
    }
}

module.exports = { sendPassResetOtpEmail, resetUserPassword };