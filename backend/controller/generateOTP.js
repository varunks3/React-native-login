const generateOTP = async() => {
    try{
        // generating 4 digit otp
        return (otp = `${Math.floor(1000 + Math.random() * 9000)}`)
    }catch(error){
        throw Error("Can not generate otp")
    }
}

module.exports = generateOTP;