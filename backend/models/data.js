const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  data: {
    type: String,
    default: null,
  }
});

module.exports = mongoose.model("Data", dataSchema);
