var express = require("express");
var router = express.Router();
var User = require("../models/user");


router.get("/", isLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        console.log(foundUser);
        res.render("user/showuser", { user: foundUser });
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;