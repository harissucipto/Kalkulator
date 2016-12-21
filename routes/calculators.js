var express = require("express");
var router = express.Router();
var Calculator = require("../models/calculator");

// INDEX - tampilkan semua kalkulator
router.get("/", function(req, res) {
    Calculator.find({}, function(err, allCalculator) {
        if (err) {
            console.log(err);
        } else {
            res.render("calculators/index", { calculators: allCalculator });
        }
    });
});

// tampilkan per kalkulator
router.get("/:id", function(req, res) {
    //cari kalkulator berdasarkan id
    Calculator.findById(req.params.id, function(err, foundCalculator) {
        if (err) {
            console.log(err);
        } else {
            // render calculator dan kirim data kalkulator
            res.render("calculators/show", { calculator: foundCalculator });
        }
    });
});

module.exports = router;