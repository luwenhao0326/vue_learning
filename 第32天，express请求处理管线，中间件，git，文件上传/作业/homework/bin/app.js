var express = require("express");

var app = express();

var art = require("express-art-template");
app.engine("html",art);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

var session = require("express-session");
app.use(session({
    secret:"abc",
    resave:false,
    saveUninitialized:true
}))



app.use(express.static("www"));



app.listen(3000,function(){
    console.log("服务器已启动");
    
})

module.exports = app;