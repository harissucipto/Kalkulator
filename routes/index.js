var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// landing pages route
router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username, password: req.body.password });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/calculators");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/calculators",
    failureRedirect: "/login"
}), function(req, res) {

});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/calculators");
});