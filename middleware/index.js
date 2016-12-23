var User = require("../models/user");
var Calculator = require("../models/calculator.js");


// semua middleware masuk sini
var middlewareObj = {};



// cek jika login
middlewareObj.checkIsLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// cek jika tidak login
middlewareObj.checkIsNotLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/user");
    }
    return next();
};


// cek bisa tambahBookmark jika memenuhi kondisi
middlewareObj.tambahBookmark = function(req, res, next) {
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
};

// harus tidakAda bookmarks
middlewareObj.cekBookmarkTidakDuplikat = function(req, res, next) {
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
};

// cekUserdanCalculator Sama
middlewareObj.cekUsersamaKalulator = function(req, res, next) {
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
};

module.exports = middlewareObj;