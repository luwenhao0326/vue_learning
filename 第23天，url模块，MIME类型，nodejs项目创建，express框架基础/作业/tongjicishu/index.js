var express = require("express");

var app = express();
var fs = require("fs");
var sum ;
var sum1;

app.get("/aaa",function(req,res){
    fs.readFile("./sum.txt",function(err,data){
        if(!err){
            sum = data.toString();
            console.log(sum);
            sum1 = sum*1;
            sum1++;
        }else{
            console.log(err);
        }
        fs.writeFile("./sum.txt",sum1,function(){
            var str1 = sum1+"";
            res.send("这是本网站第"+str1+"次访问");
        })
    })
});

app.listen(8080,function(){
    console.log("服务器已开启");
})