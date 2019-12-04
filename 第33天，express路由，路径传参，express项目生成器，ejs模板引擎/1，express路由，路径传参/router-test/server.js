var express = require("express");
var app = express();
app.use(express.static("www"));


// express.Router() 方法，用于创建一个路由对象。
var myRouter = express.Router();


// 路由对象可以像app对象添加一个get或post接口
myRouter.get("/api1",function(req,res){
    res.send("api1接口的返回数据");
})
// 一个路由对象中可以添加多个接口
myRouter.get("/api2",function(req,res){
    res.send("api2接口的返回数据");
})

// 路由对象中的接口不能直接生效，需要作为请求处理函数，通过use插入服务器的请求处理管线
app.use(myRouter);


// --------------------------------------

// 对于服务器中的所有接口，可以按照功能分为几类，每一类接口写在同一个路由中。
var userRouter = express.Router();

userRouter.get("/regist",function(req,res){
    res.send("注册成功");
});
userRouter.get("/login",function(req,res){
    res.send("登陆成功");
});

// 如果一个路由对象中存放的是同一类型的接口，在use的时候，可以为接口地址添加相同的前缀地址
app.use("/user",userRouter);

// ------------------------------------------

// 前端向服务器发送请求参数时，还可以通过路径传参。
// 服务端将接口设计为:开头的通配路径，前端请求时可以通过通配的路径传递参数。
// req.params表示本次请求中的路径参数
app.get("/test/:name/:age",function(req,res){
    console.log(req.params);
    
    res.send("qweqwe");
})


app.listen(3000,function(){
    console.log("服务器已开启"); 
})