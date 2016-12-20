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

/*
Calculator.create({
        name: "binomial",
        image: "images/binomial.png",
        url: "calculators/binomial",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    function(err, calculator) {
        if (err) {
            console.log(err);
        } else {
            console.log("Kalkulator " + calculator.name + "Berhasil dibikin");
            console.log(calculator);
        }
    }

);
*/




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
    Calculator.find({}, function(err, allCalculator) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { calculators: allCalculator });
        }
    });
});

app.get("/show", function(req, res) {
    res.render("show");
});

// tampilkan per kalkulator
app.get("/calculators/:id", function(req, res) {
    //cari kalkulator berdasarkan id
    Calculator.findById(req.params.id, function(err, foundCalculator) {
        if (err) {
            console.log(err);
        } else {
            // render calculator dan kirim data kalkulator
            res.render(foundCalculator.url, { calculators: foundCalculator });
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