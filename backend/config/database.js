const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function conncetDB() {
try{ 
    const response = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    if(response){ 
    console.log("Connected to mongodb database")
    }
}
catch(error){
    console.error('An error occurred:', error);
}}

module.exports = conncetDB