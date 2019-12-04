var express = require("express");
var art = require("express-art-template");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("www"));
app.engine("html",art);


app.listen(3000,function(){
    console.log("服务器已启动");
    
})

module.exports = app
