var express = require("express");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("www"));

var session = require("express-session");

app.use(session({
    secret:"abc",
    resave:false,
    saveUninitialized:true

}))

app.post("/user/login",function(req,res){
    if(req.body.account=="qwe"&&req.body.psw=="123"){
        req.session.user = req.body;
        res.send("登陆成功");
    }else{
        res.send("登录失败");
    }
})

app.get("/api/one",function(req,res){
    res.send("这是第一个接口，不登录就能调用")
});

// app.use方法是直接在请求处理管线中插入一个处理函数，所有请求都会经过，所以只适合通用型的中间件，对于只有部分接口使用的中间件，不能使用use插入。

function isLogin(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.send("请先登录");
    }
}

// 对于某些特定接口使用的中间件，可以使用.get或.post单独为这个借口添加中间件。
// app.get("/api/two",isLogin)
// app.get("/api/two",function(req,res){
//     res.send("您已登录，可以正常访问");
// })

// app.get可以一次添加多个请求处理函数。
app.get("/api/two",isLogin,function(req,res){
    res.send("您已登录，可以正常访问");
})

app.listen(3000,function(){
    console.log("服务器已启动");
    
})