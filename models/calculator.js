var mongoose = require("mongoose");

var calculatorSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    urlscript: String,
    Created: String
});


module.exports = mongoose.model("Calculator", calculatorSchema);