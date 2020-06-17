var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3030;

var app = express();





// always have this and always have it at the bottom
app.listen(PORT, function(){
    console.log("Apps and a bottle of port: ", PORT)
})