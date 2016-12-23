var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// landing pages route
router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", middleware.checkIsNotLoggedIn, function(req, res) {
    res.render("register");
});

// handle signup logic
router.post("/register", middleware.checkIsNotLoggedIn, function(req, res) {
    var newUser = new User({
        username: req.body.username,
        nama: req.body.nama,
        email: req.body.email
    });
    User.register(newUser, middleware.req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        console.log(user);
        passport.authenticate("local")(req, res, function() {
            res.redirect("/calculators");
        });
    });
});

// show login form
router.get("/login", middleware.checkIsNotLoggedIn, function(req, res) {
    res.render("login");
});

// handle login logic
router.post("/login", middleware.checkIsNotLoggedIn, passport.authenticate("local", {
    successRedirect: "/calculators",
    failureRedirect: "/login"
}), function(req, res) {

});

router.get("/logout", middleware.checkIsLoggedIn, function(req, res) {
    req.logout();
    res.redirect("/calculators");
});

module.exports = router;