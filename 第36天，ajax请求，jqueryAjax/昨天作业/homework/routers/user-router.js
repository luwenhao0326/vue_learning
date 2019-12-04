const Router = require("koa-router");

const userRouter = new Router();

const userDAO = require("../bin/DAO/userDAO.js");


const mysql = require("promise-mysql");
let connection = null;
mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"user_sys"
}).then((conn)=>{
    console.log("promise-mysql连接成功");
    connection = conn;
});




// 注册请求
userRouter.post("/regist",async ctx=>{
    const data = await userDAO.findUserByAccount(ctx.request.body.account);
    if(data.length>0){
        ctx.body = "用户名已被占用";
    }else{
        await connection.query(`INSERT INTO user (account,psw)VALUES('${ctx.request.body.account}','${ctx.request.body.psw}')`);

        ctx.body = "注册成功";
    }
});

//登录接口
userRouter.post("/login",async ctx=>{
    const result = await connection.query(`SELECT * FROM user WHERE account=? AND psw=?`,[ctx.request.body.account,ctx.request.body.psw]);

    if(result.length>0){
        ctx.session.user = result[0];
        ctx.body = "登录成功";
    }else{
        ctx.body = "账号或密码错误";
    }
});


const temp = new Router();

temp.use("/user",userRouter.routes());

module.exports = temp;

