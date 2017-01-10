var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// landing pages route
router.get("/", function(req, res) {
    res.render("landing", { beradaLanding: "active" });
});

// show register form
router.get("/register", middleware.checkIsNotLoggedIn, function(req, res) {
    res.render("register", { beradaRegister: "active" });
});

// handle signup logic
router.post("/register", middleware.checkIsNotLoggedIn, function(req, res) {
    var newUser = new User({
        username: req.body.username,
        nama: req.body.nama,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Selamat datang, " + user.username + " di Aplikasi Statistika");
            res.redirect("/calculators");
        });
    });
});

// show login form
router.get("/login", middleware.checkIsNotLoggedIn, function(req, res) {
    res.render("login", { beradaLogin: "active" });
});

// handle login logic
router.post("/login", middleware.checkIsNotLoggedIn, passport.authenticate("local", {
    successRedirect: "/calculators",
    failureRedirect: "/login"
}), function(req, res) {});

router.get("/logout", middleware.checkIsLoggedIn, function(req, res) {
    req.logout();
    req.flash("success", "Kamu berhasil Keluar!");
    res.redirect("/");
});

router.get("/about", function(req, res) {
    res.render("about", { beradaAbout: "active" });
});

router.get("/about", function(req, res) {
    res.render("about", { beradaAbout: "active" });
});

router.get("/contact", function(req, res) {
    res.render("contact", { beradaContact: "active" });
});
module.exports = router;