const Koa = require("koa");

const app = new Koa();

const serve = require("koa-static");
app.use(serve("www"));

const kosBody = require("koa-body");
app.use(kosBody()); 

const Router = require("koa-router");
const indexRouter = new Router();

var mysql = require('promise-mysql');


 var qqq = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_data'
})



indexRouter.post("/regist", ctx=>{
    qqq.then( function(conn){
        
        var w = ctx.request.body.username;
        var e = ctx.request.body.psw;
        var r = ctx.request.body.age;
        var result =   conn.query("INSERT INTO user (username,psw,age) VALUES ('"+w+"','"+e+"','"+r+"');")
        conn.end();
        
        return result;
    }).then(function(rows){
        // console.log(rows);
    })
    ctx.redirect("/login.html")
})




app.use(indexRouter.routes());

app.listen(3000,function(){
    console.log("服务器已启动");
    
})