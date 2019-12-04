var express = require("express");

var app = express();

// express.static ,是唯一一个express自带的中间件。实现静态文件夹功能。
// 当收到请求之后，请求处理函数会根据本次请求的路径，在www文件夹中寻找有没有对应的文件，如果有则直接将文件数据作为响应返回，如果没有则直接next将请求传给下一个请求处理函数
app.use(express.static("www"));




// 在express服务器中，可以添加多个请求处理函数，每当收到请求时，会将请求传递给第一个请求处理函数，第一个请求处理函数可以直接返回响应，也可以对请求进行加工之后传给下一个请求处理函数，依次类推，直到最后一个请求处理函数。

// 这些请求处理函数组成的队列叫做请求处理管线。

// app.use方法，在请求处理管线中添加一个请求处理函数
// 请求处理函数的第三个参数是next函数，调用next之后，请求会被传递给下一个请求处理函数。
app.use(function(req,res,next){
    console.log("第一个请求处理函数的响应");
    // 将请求传递给下一个处理函数

    next();
});

app.use(function(req,res,next){
    // res.send("第二个请求处理函数的响应")

    // 请求处理管线中的函数可以对本次请求的req进行加工，(例如添加req.body，req.cookies等)，然后传递给下一个请求处理函数，这样后面的请求处理函数就可以使用req.body。这种请求的中间处理函数叫做中间件，例如body-parser
    req.body = {name:"zxf"};
    next();
})

app.use(function(req,res,next){
    console.log(req.body);
    // res.send("第三个请求处理函数的响应")
    next();
});

// app.get方法，在请求处理管线中添加一个请求处理函数，只有当请求方法为get且url的路径为/api/test时，请求会传递给本函数处理，否则直接传给下一个请求处理函数。
app.get("/api/test",function(req,res){
    res.send("test接口")
});

// 一般在请求处理管线的最后，是404处理
app.use(function(req,res){
    res.status(404);
    res.send("您访问的页面不存在");
})



app.listen(3000,function(){
    console.log("服务器已开启");
})