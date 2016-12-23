var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", middleware.checkIsLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        console.log(foundUser);
        res.render("user/showuser", { user: foundUser });
    });
});

module.exports = router;