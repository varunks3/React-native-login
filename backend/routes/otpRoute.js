const express = require('express');
const router = express.Router();
const {sendOTP, verifyOtp} = require("../controller/otpController")

// This file is for testing
router.post('/verify', async(req, res)=>{
  try{
    let {email, otp} = req.body
    const validOTP = await verifyOtp({email, otp})
    res.status(200).json({valid: validOTP})
  }catch(error){
    res.status(404).send(error.message)
  }
})
router.post('/otp', async (req, res) => {
  try {
   const { email } = req.body
   const createdOTP = await sendOTP({
    email,
   })
   res.status(200).send(`createdOTP successfully, ${createdOTP}`)
  } catch (error) {
    console.log("route error")
  }
});


module.exports = router;
