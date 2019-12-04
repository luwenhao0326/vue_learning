var express = require("express");
var app = express();
app.use(express.static("www"));
var bodyParser = require("body-parser");

var num1 = 123456789;
var num2 = 123456;
app.use(bodyParser.urlencoded({extended:false}))
app.post("/api",function(req,res){
    console.log(req.body);
    if(req.body.name*1==num1&&req.body.psw*1==num2){
        res.send("充值成功");
    }else{
        res.send("充值失败");
    }

})

app.listen(8080,function(){
    console.log("服务器已开启");
})