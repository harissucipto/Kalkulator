var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Calculator = require("./models/calculator"),
    User = require("./models/user.js"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/kalkulator");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// seedDB();


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





// ==========================
// INDEX ROUTES
// =========================
// landing pages route
app.get("/", function(req, res) {
    res.render("landing");
});

// show register form
app.get("/register", function(req, res) {
    res.render("register");
});

// handle signup logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
});

// handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/calculators",
    failureRedirect: "/login"
}), function(req, res) {

});


// =======================
// CALCULATORS ROUTES
// =========================
app.get("/calculators", function(req, res) {
    Calculator.find({}, function(err, allCalculator) {
        if (err) {
            console.log(err);
        } else {
            res.render("calculators/index", { calculators: allCalculator });
        }
    });
});

// tampilkan per kalkulator
app.get("/calculators/:id", function(req, res) {
    //cari kalkulator berdasarkan id
    Calculator.findById(req.params.id, function(err, foundCalculator) {
        if (err) {
            console.log(err);
        } else {
            // render calculator dan kirim data kalkulator
            res.render("calculators/show", { calculator: foundCalculator });
        }
    });
});




// starting server in port 3000
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is starting in port 3000");
    }
});