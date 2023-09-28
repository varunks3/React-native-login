const port = 8080;
require("dotenv").config();
const express = require("express");
const app = express();
const conncetDB = require("./config/database");
const authRoutes = require('./routes/authRoutes');
const protedRoutes = require('./routes/protectedRoutes');
const otpRoute = require('./routes/otpRoute');
const searchRoute = require('./routes/searchRoute');
const cors = require("cors");
const bodyParser = require('body-parser');
const passwordResetRoute = require("./routes/passwordResetRoute");

conncetDB();

app.use(express.json()); 
app.use(cors())  // Allow cors from all origin
// All routes
app.use('/', authRoutes);
app.use('/', protedRoutes);
app.use('/', otpRoute); // you can remove this if you don't want otpRoute file
app.use('/', passwordResetRoute);
app.use('/', searchRoute)
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
// Need to pass these arguments in env file
// MONGO_URI
// TOKEN
// MAIL_ADD
// MAIL_PASS