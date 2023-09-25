const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // perform password is meet the required criteria or not here
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send('User singup successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
}); 

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('User not found.');
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials.');
    }
    // Generating token for the user
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
