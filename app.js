var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


// contoh data kalkulator
/*
var Calculators = [{
    name: "binomial",
    image: "images/binomial.png",
    url: "calculators/binomial",
    description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
}];
*/

mongoose.connect("mongodb://localhost/kalkulator");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// SCEHMA SETUP
var calculatorSchema = new mongoose.Schema({
    name: String,
    image: String,
    url: String,
    description: String
});

var Calculator = mongoose.model("Calculator", calculatorSchema);







// ==========================
// INDEX ROUTES
// =========================
// landing pages route
app.get("/", function(req, res) {
    res.render("landing");
});



// =======================
// CALCULATORS ROUTES
// =========================
app.get("/calculators", function(req, res) {
    res.render("calculators", { calculators: Calculators });
});

app.get("/calculators/:id", function(req, res) {
    Calculators.forEach(function(calculator) {
        if (req.params.id == calculator.name) {
            res.render(calculator.url);
        }
    });
});




// starting server in port 3000
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is starting in port 3000");
    }
});