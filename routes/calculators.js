var express = require("express");
var router = express.Router();
var Calculator = require("../models/calculator");
var User = require("../models/user");

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

router.put("/:id/bookmark", cekBookmarkTidakDuplikat, function(req, res) {
    User.findById(req.user._id, function(err, userUpdate) {
        Calculator.findById(req.params.id, function(err, foundCalculator) {
            var newBookmark = {
                name: foundCalculator.name,
                id: foundCalculator._id
            };
            userUpdate.bookmarks.push(newBookmark);
            userUpdate.save();
            res.redirect("back");
        });
    });
});

// middleware
// harus login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// harus tidakAda bookmarks
function cekBookmarkTidakDuplikat(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id, function(err, userUpdate) {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            var ditemukan = function(siArray, cari) {
                var temukan = function(item) {
                    if (item.name === cari) {
                        return true;
                    } else {
                        return false;
                    }
                };
                return siArray.filter(temukan);
            };
            Calculator.findById(req.params.id, function(err, foundCalculator) {
                var kondisi = ditemukan(userUpdate.bookmarks, foundCalculator.name).length;
                if (kondisi === 0) {
                    return next();
                } else {
                    console.log("sudah ada");
                    res.redirect("back");
                }
            });
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = router;