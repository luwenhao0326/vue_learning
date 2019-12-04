// 导入Koa之后得到的是一个构造函数
const Koa = require("koa");

// Koa服务器对象创建需要通过new

const app = new Koa();

// Koa服务器对象不能直接通过.get或.post添加接口。

// Koa服务器也可以通过.use，向请求处理管线中插入一个请求处理函数。
// 和express的区别是，这个请求处理函数可以是async函数，请求处理函数只有两个参数，ctx和next，ctx是req和res的合并


// app.use(async (ctx,next)=>{
//     // ctx.body,设置本次请求响应体数据，相当于express的res.send()
//     ctx.body = "你好，世界";
// })

// ------------------------------------------------

// koa框架不自带任何中间件。

// koa-static,静态文件夹中间件
const serve = require("koa-static");
app.use(serve("www"));

// -------------------------------------------------

// 请求体解析中间件
const kosBody = require("koa-body");
app.use(kosBody()); 

// -------------------------------------------------

// koa-router,路由中间件
const Router = require("koa-router");
// 创建路由对象
const indexRouter = new Router();

// 在路由中添加各种接口
indexRouter.get("/test",async ctx=>{
    // get请求的参数在ctx.query中。
    console.log(ctx.query);
    

    ctx.body = "test接口的数据"
})
indexRouter.post("/commit",async ctx=>{
    // post请求的参数在ctx.request.body中
    console.log(ctx.request.body);
    ctx.body = "commit接口的数据"
})

const User = require("./bin/DAO/userDAO.js");

// 注册接口
indexRouter.post("/regist",async ctx=>{

    const user = await User.findOne({username:ctx.request.body.username});

    if(user){
        ctx.body = "用户名已被注册";
    }else{
        await new User(ctx.request.body).save();
        ctx.body = "注册成功"
    }
});


const api = new Router();
api.use("/api",indexRouter.routes());
// 将路由插入请求处理管线
app.use(api.routes());

// -----------------------------------------

app.on("error",err=>{
    console.log(err);
})

app.listen(3000,function(){
    console.log("服务器已开启");
})