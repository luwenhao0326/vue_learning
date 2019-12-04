var express = require("express");
var fs = require("fs");
var app = express();

// 导入模板引擎
var art = require("express-art-template");
app.engine("html",art);



app.use(express.static("www"));

// 创建一个数组用于接住对象
var arr;
// 后缀.json 比 .txt 更形象化,美观,易于查看
fs.readFile("./message/mes.json",function(err,data){
    if(!err){
        // data原本是buffer,字符串类型,JSON.parse将其转为对象类型.
        arr = JSON.parse(data);
    }else{
        arr = [];
    }
})

// 创建时间构造函数
var time = new Date();
// 创建get接口,点击提交,获取数据.
app.get("/liuyan",function(req,res){
    var h1 = {}
    // 获取当前时间
    var timer = time.getFullYear() + "-" + (time.getMonth()*1+1) + "-" + time.getDate() + " " +time.getHours()+":"+time.getMinutes();
    // 获取提交的文本
    var text = req.query.text;
    console.log(text);
    
    // 利用正则表达式找Ip地址
    var reg = /((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/g;
    var res1;
    var res2;
    // execute 执行 执行对ip的搜索
    while(res1 = reg.exec(req.ip)){
        res2 = res1[0];
    }
    // 把时间 IP 文本 放在一个对象里
    h1.timer = timer;
    h1.res2 = res2;
    h1.text = text;
    // 把对象添加到数组
    arr.unshift(h1);
    // 对数组进行解析转为为json字符串
    var jsonSty = JSON.stringify(arr);
    // 
    fs.writeFile("./message/mes.json",jsonSty,function(err){

    })
    
    console.log({liuyan:arr});
    
    res.render("liuyan.html",{liuyan:arr});
    // res.send("cdj");
});


app.listen(8080,function(){
    console.log("服务器已开启");
});
