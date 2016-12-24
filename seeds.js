var mongoose = require("mongoose"),
    Calculator = require("./models/calculator.js");


var data = [{
        name: "Simple Regeresi Linear",
        image: "images/1.jpg",
        urlscript: "/calculators/srl.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Simple Regeresi Multilinear",
        image: "images/1.jpg",
        urlscript: "/calculators/srm.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Binomial",
        image: "images/1.jpg",
        urlscript: "/calculators/binomial.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Multinomial",
        image: "images/1.jpg",
        urlscript: "/calculators/multinomial.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Distribusi Hiper Geometry",
        image: "images/1.jpg",
        urlscript: "/calculators/dhg.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Distribusi Posion",
        image: "images/1.jpg",
        urlscript: "/calculators/dp.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Distribusi Z",
        image: "images/1.jpg",
        urlscript: "/calculators/dz.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "distribusi Student",
        image: "images/1.jpg",
        urlscript: "/calculators/ds.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Distribusi Fisher",
        image: "images/1.jpg",
        urlscript: "/calculators/df.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    },
    {
        name: "Distribusi Chi Square",
        image: "images/1.jpg",
        urlscript: "/calculators/dcs.html",
        description: "Binomial adalah jumlah keberhasilan dalam n percobaan ya/tidak dimana setiap percobaan memiliki probalitas"
    }
];


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