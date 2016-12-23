var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


router.get("/", middleware.checkIsLoggedIn, function(req, res) {
    User.findById(req.user._id).populate("bookmarks").exec(function(err, foundUser) {
        if (err) {
            req.flash("error", "Data sedang bermasalah");
            res.redirect("back");
        }
        res.render("user/showuser", { user: foundUser });
    });
});

module.exports = router;