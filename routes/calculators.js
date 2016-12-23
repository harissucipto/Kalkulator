var express = require("express");
var router = express.Router();
var Calculator = require("../models/calculator");
var User = require("../models/user");
var middleware = require("../middleware");

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
router.get("/:id", middleware.cekBookmarkTidakDuplikat, function(req, res) {
    //cari kalkulator berdasarkan id
    Calculator.findById(req.params.id, function(err, foundCalculator) {
        if (err) {
            console.log(err);
        } else {
            // render calculator dan kirim data kalkulator
            res.render("calculators/show", { calculator: foundCalculator, tombolBookmark: req.tombolBookmark });
        }
    });
});

// bookmark calculator
router.put("/:id/bookmark", middleware.tambahBookmark, function(req, res) {
    User.findById(req.user._id, function(err, userUpdate) {
        Calculator.findById(req.params.id, function(err, foundCalculator) {
            userUpdate.bookmarks.push(foundCalculator);
            userUpdate.save();
            res.redirect("back");
        });
    });
});

// delete bookmark
router.delete("/:id/dbookmark", middleware.cekUsersamaKalulator, function(req, res) {
    User.findById(req.user._id, function(err, foundUser) {
        var hapusBookmark = function(siArray, cari) {
            var indexCari = siArray.indexOf(cari);
            return siArray
                .slice(0, indexCari)
                .concat(siArray.slice(indexCari + 1, siArray.length));
        };
        foundUser.bookmarks = hapusBookmark(foundUser.bookmarks, req.params.id);
        foundUser.save();
        res.redirect("back");
    });
});

module.exports = router;