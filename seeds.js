var mongoose = require("mongoose"),
    Calculator = require("./models/calculator.js");


var data = [{
    name: "binomial",
    image: "images/binomial.png",
    description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
}];


function seedDB() {
    //Remove all calculators
    Calculator.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed calculators");
        // tambahkan perkalkulator
        data.forEach(function(seed) {
            Calculator.create(seed, function(err, calculator) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a calculator " + calculator.name);
                }
            });
        });
    });
}

module.exports = seedDB;