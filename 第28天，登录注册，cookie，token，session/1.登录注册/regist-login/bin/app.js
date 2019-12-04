var express= require("express");

var app = express();

app.use(express.static("www"));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));

// cookie解析模块，能够自动将本次请求头中的cookie字段的字符串解析为一个对象，然后放入本次请求的req.cookies中
// var cookieParser = require("cookie-parser");
// app.use(cookieParser());

// session模块，对于新用户的请求，都会返回一个cookie，值是一个sessionID，然后在session库中为这个sessionID创建一个session对象
// 对于已经有sessionID的请求，根据这个sessionID从session库中找出这个用户对应的session对象，并赋值给req.session
var session = require("express-session");
app.use(session({
    secret:"123",
    resave:false,
    saveUninitialized:true,
    cookie:{                           
    }
}))

app.listen(3000,function(){   
    console.log("服务器已开启");
})

module.exports = app;