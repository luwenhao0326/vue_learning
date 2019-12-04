// var express = require("express");

// var app = express();

// app.use(express.static("www"));


// app.listen(8080,function(){
//     console.log("服务器已开启"); 
// })

//----------------------------------------

var express = require("express");

// bodyParser模块，用于解析请求体数据，他会把请求方式为POST，且请求数据为urlencode格式的请求体解析为一个对象，并放入req.body中。
var bodyParser = require("body-parser");

express()

.use(express.static("www"))

// 让服务器对象使用bodyParser模块
.use(bodyParser.urlencoded({extended:false}))


.get("/api",function(req,res){

    // req.query是本次请求的get参数。
    // console.log(req.query);

    if(req.query.age>100){
        res.send("您的年龄过高，不适合浏览本网站");
    }else{
        res.send("欢迎来到本页面");
    }

    res.send("/api接口返回的数据");
})

// 添加一个请求方式为POST的接口，用于处理POST请求
.post("/api",function(req,res){

    // post请求的参数在req.body中。
    console.log(req.body);

    res.send("这是POST接口返回的数据");
})


.listen(8080,function(){
    console.log("服务器已开启"); 
})