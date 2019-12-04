var http = require("http");
var fs = require("fs");
var str;
fs.readFile("./index.html",function(err,data){
    if(!err){
        str = data.toString();
    }else{
        console.log(err);
    }
})

var server = http.createServer(function(req,res){
    res.write(str);
    res.end();
})

server.listen(8080,function(){
    console.log("服务器已开启");
    
})