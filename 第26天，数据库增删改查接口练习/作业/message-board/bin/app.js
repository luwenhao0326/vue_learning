var express = require("express");
var fs = require("fs");
var app = express();
var art = require("express-art-template");
var bodyParser = require("body-parser");


app.engine("html", art);
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(8080, function () {
    console.log("服务器已开启");
});


module.exports = app;