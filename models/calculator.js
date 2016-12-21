var mongoose = require("mongoose");

var calculatorSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


module.exports = mongoose.model("Calculator", calculatorSchema);