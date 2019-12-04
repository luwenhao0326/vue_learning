var express = require("express");

var app = express();

app.use(express.static("www"));

// multer中间件，用于处理格式为multipart/form-data类型的post请求，可以自动存储请求体中的文件，把存储的文件信息存入req.file中，并把其他的字段解析为对象放入req.body中
var multer = require("multer");

// multer函数，用于生成中间件，参数可以配置文件存储路径
// 使用dest只能设置文件存储在哪个目录下，不能设置文件名字，multer会使用一个随机字符串作为文件名
// var upload = multer({dest:"./upload"});

// 使用storage可以设置文件存储位置，还可以设置文件名
var storage = multer.diskStorage({
    // destination函数，设置文件存储位置
    destination:function(req,res,cb){
        cb(null,"./upload");
    },
    // filename，设置文件名
    filename:function(req,file,cb){
        // console.log(file.originalname);
        
        var arr = file.originalname.split(".");
        console.log(arr);
        cb(null,Date.now()+"."+arr[arr.length-1]);
    }
})
var upload = multer({storage:storage})

app.post("/file/upload",upload.single("myfile"),function(req,res){
    // console.log(req.body);
    // console.log(req.file);
    
    res.send("文件上传接口的响应");
})

app.listen(3000,function(){
    console.log("服务器已开启");
})
