var User = require("../models/user");
var Calculator = require("../models/calculator.js");


// semua middleware masuk sini
var middlewareObj = {};



// cek jika login
middlewareObj.checkIsLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Kamu Harus Login/Masuk Dulu!!");
    res.redirect("/login");
};

// cek jika tidak login
middlewareObj.checkIsNotLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash("error", "Kamu Harus Logout/Keluar, Baru Bisa Melakukan Aksi ini!");
        res.redirect("/user");
    }
    return next();
};


// cek bisa tambahBookmark jika memenuhi kondisi
middlewareObj.tambahBookmark = function(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
            if (err) {
                req.flash("error", "Pengguna tidak ditemukan!");
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
                    req.flash("success", "Aplikasi berhasil ditambahkan");
                    return next(); // jika tidak duplikat lanjutkan
                } else {
                    req.flash("error", "Error Aplikasi ini sudah ada didalam Bookmark list");
                    res.redirect("back");
                }
            });
        });
    } else {
        req.flash("error", "Silahkan login terlebih dahulu!, untuk bisa melakuka aksi ini!");
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
                if (err) {
                    req.tombolBookmark = false;
                    return next();
                }
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
                req.flash("error", "Error, Pengguna Tidak ditemukan");
                res.redirect("back");
            }
            var sama = false;
            foundUser.bookmarks.forEach(function(item) {
                if (String(item) === String(req.params.id)) {
                    sama = true;
                }
            });
            if (sama) {
                req.flash("success", "Berhasil menghapus Aplikasi dari Bookmark");
                return next();
            } else {
                req.flash("error", "Error, Tidak Dapat menghapus!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "Anda Harus Login terlebih dahulu untuk bisa melakukan aksi ini!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;