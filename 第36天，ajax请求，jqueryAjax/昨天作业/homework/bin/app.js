const Koa = require("koa");

const app = new Koa();

const serve = require("koa-static");
app.use(serve("www"));

const koaBody = require("koa-body");
app.use(koaBody());


const session = require("koa-session2");
app.use(session({
    key:"sessionID",
    
}));

app.listen(3000,function(){
    console.log("服务器已开启");
});


module.exports = app;