
// http模块用于创建一个http服务，也可用于发送http请求。
var http = require("http");


// serve服务动词   server服务器名词  service 服务名词

// http对象的createServer方法，用于创建一个服务器对象，参数是一个函数，函数的两个参数分别是request(请求)和response(响应)

//每当服务器收到请求，这个函数就会被调用。 
var server = http.createServer(function(req,res){
    console.log("收到请求");

    // 添加响应状态码，并向响应头中添加字段
    // 200为状态码 2开头为成功
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf-8"
    })


    // res.write向响应体中写入数据。
    res.write("欢迎来到我的服务器啊啊啊");
    // res.end响应体编写完毕，发送给客户端
    res.end();
});

// 服务器创建之后需要开启监听某个端口。
server.listen(8080,function(){
    console.log("服务器已开启");
    
})