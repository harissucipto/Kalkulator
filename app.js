var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


// gunakan body parser agar bisa digunakan
// untuk mendapat data dari form
app.use(bodyParser.urlencoded({ extended: true }));


// set view engine ke ejs
app.set("view engine", "ejs");


// landing pages route
app.get("/", function(req, res) {
    res.send("Ini halaman landing Pages");
});


// starting server
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is starting in port 3000");
    }
});