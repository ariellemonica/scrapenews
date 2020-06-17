var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3030;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// ROUTES
// app.get("/", function(req,res){
//     //do a thing
//     console.log("I did a thing!")
// });


app.get("/scrape", function (req, res) {
    axios.get("http://www.nytimes.com").then(function (resp) {
        var $ = cheerio.load(resp.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                // .closest("h2")
                .text();
            result.link = $(this)
                .closest("a")
                .attr("href")

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err)
                })
        });
        res.send("done scraping");
    });
});

app.get("/articles", function(req,res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        res.json(err)
    });
});

app.get("articles/:id", function(req,res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.Article.findOneAndUpdate({ _id: req.params.id}, { note: dbNote._id}, { new: true });
    })
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
})

// always have this and always have it at the bottom
app.listen(PORT, function () {
    console.log("Apps and a bottle of port: " + PORT)
})