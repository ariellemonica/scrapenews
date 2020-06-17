var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3030;

var app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(logger("dev"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// ROUTES
app.get("/", function(req,res){
    //do a thing
    console.log("I did a thing!")
});




// always have this and always have it at the bottom
app.listen(PORT, function(){
    console.log("Apps and a bottle of port: ", PORT)
})