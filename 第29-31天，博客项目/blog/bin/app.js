var express = require("express");

var app = express();

app.use(express.static("www"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

var art = require("express-art-template");
app.engine("html",art);

var session = require("express-session");

// session数据默认存储在内存中，服务器重启时数据就会丢失。
// connect-mongo模块，可以设置让session存储mongodb数据库中。
var cm = require("connect-mongo");
var Store = cm(session);

var mongoose = require("./DAO/connection.js");

app.use(session({
    secret:"aaa",
    resave:false,
    saveUninitialized:true,
    store:new Store({mongooseConnection:mongoose.connection})
}))

app.listen(3000,function(err){
    if(!err){
        console.log("服务器已启动");
    }else{
        console.log("启动失败");  
    }
})

module.exports = app;