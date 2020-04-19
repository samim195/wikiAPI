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

// mongoose.connect("mongodb://localhost:27017/wikiDB")

// const articleSchema = new Schema ({
//     title: String,
//     content: String
// });




app.listen(3000, function() {
    console.log("Server started on port 3000");
});