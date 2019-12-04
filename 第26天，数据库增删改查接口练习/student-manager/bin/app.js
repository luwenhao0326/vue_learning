var express = require("express");
var bodyParser = require("body-parser");
var art = require("express-art-template");
var app = express();
app.engine("html",art);
app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}));


app.listen(8080,function(){
    console.log("服务器已开启");
    
})


module.exports = app;