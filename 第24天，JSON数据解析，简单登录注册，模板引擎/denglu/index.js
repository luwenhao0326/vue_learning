var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}))
app.get("/denglu",function(req,res){
    if(req.query.zhanghao=="1111"&&req.query.psw=="2222"){
        res.send("<h1>登陆成功</h1>")
    }else{
        res.send("<h1>登录失败</h1>")
    }
    
})



app.post("/zhuce",function(req,res){
    if(req.body.psw==req.body.pswTwo&&req.body.psw!=""&&req.body.pswTwo!=""&&req.body.zhanghao!=""){
        res.send("注册成功");
    }else{
        res.send("注册失败");
    }
    
})



app.listen(8080,function(){
    console.log("服务器已开启");
    
})