var express = require("express");

var app = express();

// 导入自制的静态文件夹中间价
var static = require("./bin/middleware/static.js");
app.use(static("www"));

// 导入自制的cookie解析中间件
var cookieParser = require("./bin/middleware/cookie-parser.js");
app.use(cookieParser);

// 自制的body-psrser
var bodyParser = require("./bin/middleware/body-parser.js");
app.use(bodyParser);

app.get("/",function(req,res){
    // console.log(req.cookies);
    
    res.cookie("name","zxf");
    res.cookie("age","20");
    res.cookie("qq","qqqq")
    res.send("这是首页接口");
})

app.post("/api/post",function(req,res){
    console.log(req.body);
    
    res.send("aaa");
})

app.use(function(req,res){
    res.status(404)
    res.send("404");
})


app.listen(3000,function(){
    console.log("服务器已开启");
})