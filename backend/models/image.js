const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
    description: String,
});

module.exports = mongoose.model("Image", imageSchema);