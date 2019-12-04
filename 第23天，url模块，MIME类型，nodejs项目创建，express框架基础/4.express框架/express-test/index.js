
// require除了可以导入nodejs自带的模块，还可以导入第三方的模块。
// require函数会在本项目目录中的node_modules文件夹中寻找这个模块名字的文件夹，找到之后读取其中的package.json，获得main字段的入口文件，然后倒入这个入口文件所导出的内容。

var express = require("express");


//  express函数用于创建服务器对象。
var app = express();

// 设置服务器的静态文件夹，静态文件夹中的文件可以被前端直接请求，一般用于存放静态页面和资源文件。
// 当请求的url路径中没有文件名时，会默认使用index.html文件名
app.use(express.static("www"));


// app.get,为服务器添加一个get请求接口，每当服务器收到请求路径为/abc的请求时，就会把请求交给这个接口处理。
// 第一个参数是接口地址，第二个参数是请求处理函数,请求处理函数有两个参数，req和res
app.get("/abc",function(req,res){
    res.send("这是/abc接口所返回的数据");
});



// 开启服务器监听
app.listen(8080,function(){
    console.log("服务器已开启");
})