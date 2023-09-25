const express = require("express");
const router = express.Router();
const {
  sendPassResetOtpEmail,
  resetUserPassword,
} = require("../controller/passwordResetController");

router.post("/reset_password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      throw Error("All credentials are required");
    }
    await resetUserPassword({ email, otp, newPassword });
    res.status(200).json({ email, passwordreset: 'Success' });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/forget_password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw Error("Email is required");
    const createdPassResetOTP = await sendPassResetOtpEmail(email);
    res.status(200).json(createdPassResetOTP);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
