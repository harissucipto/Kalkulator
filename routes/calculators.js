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
router.get("/:id", cekBookmarkTidakDuplikat, function(req, res) {
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
router.put("/:id/bookmark", tambahBookmark, function(req, res) {
    User.findById(req.user._id, function(err, userUpdate) {
        Calculator.findById(req.params.id, function(err, foundCalculator) {
            userUpdate.bookmarks.push(foundCalculator);
            userUpdate.save();
            res.redirect("back");
        });
    });
});

// delete bookmark
router.delete("/:id/dbookmark", cekUsersamaKalulator, function(req, res) {
    User.findById(req.user._id, function(err, foundUser) {
        var hapusBookmark = function(siArray, cari) {
            var indexCari = siArray.indexOf(cari);
            return siArray
                .slice(0, indexCari)
                .concat(siArray.slice(indexCari + 1, siArray.length));
        };
        console.log(hapusBookmark(foundUser.bookmarks, req.params.id));
        foundUser.bookmarks = hapusBookmark(foundUser.bookmarks, req.params.id);
        foundUser.save();
        res.redirect("back");
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

// tambahBookmark jika sudah login
function tambahBookmark(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            // fungsi untuk menemukan array
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
                var kondisi = ditemukan(foundUser.bookmarks, foundCalculator.name).length;
                if (kondisi === 0) {
                    return next(); // jika tidak duplikat lanjutkan
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

// harus tidakAda bookmarks
function cekBookmarkTidakDuplikat(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
            if (err) {
                req.tombolBookmark = true;
                return next();
            }
            // fungsi untuk menemukan array
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
                var kondisi = ditemukan(foundUser.bookmarks, foundCalculator.name).length;
                if (kondisi === 0) {
                    req.tombolBookmark = true;
                    return next(); // jika tidak duplikat lanjutkan
                } else {
                    req.tombolBookmark = false;
                    return next();
                }
            });
        });
    } else {
        req.tombolBookmark = true;
        return next();
    }
}

// cekUserdanCalculator Sama
function cekUsersamaKalulator(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id, function(err, foundUser) {
            if (err) {
                console.log(err);
                res.redirect("/login");
            }
            var sama = false;
            foundUser.bookmarks.forEach(function(item) {
                if (String(item) === String(req.params.id)) {
                    sama = true;
                }
            });
            if (sama) {
                return next();
            } else {
                res.redirect("back");
            }
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = router;