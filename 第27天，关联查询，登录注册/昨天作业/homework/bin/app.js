var express = require("express");
var bodyParser = require("body-parser");

var art = require("express-art-template");

var app = express();

app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}));
app.engine("html",art);


app.listen(3000,function(){
    console.log("服务器已开启");
});


module.exports = app;