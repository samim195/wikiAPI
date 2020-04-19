//jshint esversion:6

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require ("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);



//// Requests targeting all articles
app.route("/articles")

.get(function(req, res) {
    Article.find({}, function(err, articlesFound) {
        if (!err) {
            res.send(articlesFound)
        } else {
            res.send(err);
        }
        
    });
})

.post(function(req, res) {
    
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Succesfully added a new article");
        }
    });
})

.delete(function(req, res) {
    Article.deleteMany({}, function(err) {
        if (!err) {
            res.send("Succesfully deleted the specified documents");
        } else {
            res.send(err);
        }
    });
});



///// Requests targeting specific articles
app.route("/articles/:articleTitle")

.get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(err, articleFound) {
        if (articleFound) {
            res.send(articleFound);
        } else {
            res.send("No articles matching that title was found");
        }
    });
})

.put(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Succesfully updated article")
        }
    });
})

.patch(function(req, res) {
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err) {
            if (!err) {
                res.send("Successfully updated article!");
            } else {
                res.send(err)
            }
        }
    );
})

.delete(function(req, res) {
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err) {
            if (!err) {
                res.send("Successfully deleted the corresponding article. ");
            } else {
                res.send(err);
            }
        }
    );
});

// .post(function(req, res) {

// })

// .delete(function(req, res) {

// });

app.listen(3000, function() {
    console.log("Server started on port 3000");
});