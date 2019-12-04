var express = require("express");

var app = express();

app.use(function(req,res,next){
    console.log("1");
    next();
    console.log("2");
    
})
app.use(function(req,res,next){
    console.log("3");
    next();
    console.log("4");
    
})
app.use(function(req,res,next){
    console.log("5");  
})

app.listen(3000,function(){
    console.log("服务器已开启");
    
})