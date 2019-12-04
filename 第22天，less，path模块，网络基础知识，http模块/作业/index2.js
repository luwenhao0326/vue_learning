var http = require("http");
var fs = require("fs");
var str1;
var str2;
var str3;
fs.readFile("./index.html",function(err,data){
    if(!err){
        str1 = data.toString();
        return str1;
    }else{
        console.log(err);
        
    }
})
fs.readFile("./index2.html",function(err,data){
    if(!err){
        str2 = data.toString();
        return str2;
    }else{
        console.log(err);
        
    }
})
fs.readFile("./index3.html",function(err,data){
    if(!err){
        str3 = data.toString();
        return str3;
    }else{
        console.log(err);
        
    }
})

var server = http.createServer(function(req,res){
    console.log("服务器已启动");
    // console.log(req.url);
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })
    if(req.url=="/index"||req.url=="/index.html"){
        res.write(str1);
    }
    if(req.url=="/index2"||req.url=="/index2.html"){
        res.write(str2);
    }
    if(req.url=="/index3"||req.url=="/index3.html"){
        res.write(str3);
    }

    res.end();
})
server.listen(8080,function(){
    console.log("服务器已开启");
})