var http = require("http");
var fs = require("fs");
var path = require("path");

// var server = http.createServer(function(req,res){
    
//     fs.readFile("./www/index.html",function(err,data){
//         if(!err){
//             res.writeHead(200,{
//                 "Content-Type":"text/html;charset=utf-8"
//             });
//             res.write(data);
//         }else{
//             res.writeHead(404,{
//                 "Content-Type":"text/html;charset=utf-8"
//             });
//             res.write("您访问的页面不存在");
//         }
//         res.end();
//     })
// });


// var server = http.createServer(function(req,res){
    
//     // fs.createReadStream，创建一个文件的输入流
//     var out = fs.createReadStream("./www/index.html");

//     // res响应对象的本质是一个输出流。
//     // 输入流可以通过pipe方法直接将数据写入输出流。
//     out.pipe(res);
  
// });

// url模块用于解析或处理url字符串。
var url = require("url");
// console.log(url);


var server = http.createServer(function(req,res){
    // req对象的url属性，表示本次请求的url(相对url，舍弃了协议名，IP/域名，端口，只包含了路径和参数)
    console.log(req.url);

    // url.parse方法，用于将一个url字符串解析为一个url对象
    var urlObj = url.parse(req.url);
    
    // console.log(urlObj.pathname);

    var ext = path.extname(urlObj.pathname);

    var mime;

    switch (ext) {
        case ".mp3":
            mime = "audio/mp3"
            break;
        case ".html":
            mime = "text/html"
            break;
        case ".css":
            mime = "text/css"
            break;
    
        default:
            break;
    }

    res.writeHead(200,{
        "Content-Type":mime
    })
    
    var filePath = path.join(__dirname,"www",urlObj.pathname);
    var inputStram = fs.createReadStream(filePath);

    inputStram.pipe(res);
});

server.listen(8080,function(){
    console.log("服务器开启");
});