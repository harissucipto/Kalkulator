var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Calculator = require("./models/calculator"),
    User = require("./models/user.js"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/kalkulator");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// seedDB();


// requiring routes
var calculatorRoutes = require("./routes/calculators"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user");


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Aplikasi kalkulator",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/calculators", calculatorRoutes);
app.use("/user", userRoutes);


// starting server in port 3000
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is starting in port 3000");
    }
});