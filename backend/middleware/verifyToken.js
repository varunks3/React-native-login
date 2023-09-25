const jwt = require('jsonwebtoken');

// To verify the user to grant access to protected routes by recieving user's token from header
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access denied.');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = verifyToken;
