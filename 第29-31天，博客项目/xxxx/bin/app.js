var express= require("express");
var app = express();

// 模板引擎
var art = require("express-art-template");
app.engine("html",art);


// post接口
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

var session = require("express-session");

app.use(session({
    secret:"a",
    resave:false,
    saveUninitialized:true,
}))


app.use(express.static("www"));

app.listen(8080,function(err){
    if(!err){
        console.log("服务器已启动");
    }else{
        console.log("服务器启动失败");   
    }
})

module.exports = app;