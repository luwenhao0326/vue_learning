var app = require("./bin/app.js");

var md5 = require("md5");
var User = require("./bin/DAO/userDAO.js");
// 注册接口

app.post("/user/regist", function (req, res) {

    // 先查询这个名字是否被占用
    User.findOne({ username: req.body.username })
        .exec(function (err, data) {
            if (data) {
                res.send("此用户名已经占用");
            } else {
                // 在用户系统的用户表中，密码不要存储明文，进行MD5加密之后存储。
                new User({
                    username: req.body.username,
                    psw: md5(req.body.psw)
                }).save(function () {
                    res.redirect("/");
                });
            }
        })
})

// var userInfo = {};
// 登录接口

app.post("/user/login", function (req, res) {
    User.findOne({
        username: req.body.username,
        psw: md5(req.body.psw)
    })
        .exec(function (err, data) {
            if (data) {
                // res.cookie方法，为本次响应设置cookie，参数可以是两个键值对字符串，也可以是一个对象，最后一个参数是cookie选项。
                // res.cookie("username",req.body.username,{
                //     // 在cookie选项中maxAge表示有效期
                //     // maxAge:24*60*60*1000
                // })

                //---------------------------------

                // 由于前端是可以任意修改cookie的，所以cookie设置为固定的值并不安全。容易伪造。

                // 正确的做法是，当用户登录成功时，随机生成一个字符串（token），将这个字符串作为cookie返回，然后服务端也保存好这个字符串，收到请求时，判断cookie中的字符串是不是以前生成过的字符串，如果是说明是登录过的。
                // var token = makeRandomString();

                // // 先通过cookie将token返给用户
                // res.cookie("token",token);

                // // 服务器存储这个token。使用token作为键，用户对象作为值，存储在一个对象中。
                // userInfo[token] = data;

                //---------------------------------

                // 登录成功时将用户信息存储在session对象中
                req.session.user = data;

                res.send("登录成功");
            } else {
                res.send("用户名或密码错误");
            }
        })
})

// 登陆之后才能使用的接口
app.get("/user/api", function (req, res) {

    // 使用cookie中的token作为属性名(键)，访问userInfo对象的属性，如果有这个属性，则说明这个token是服务器生成的，没有这个属性说明不是正常的token
    if (req.session.user) {
        res.send("登陆成功，欢迎"+req.session.user.username);
    } else {
        res.send("请先登录")
    }
})


// 生成随机字符串的函数

function makeRandomString() {
    
    var source = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var str = "";
    for (var i = 0; i < 10; i++) {
        var ind = Math.floor(Math.random() * source.length);
        var ch = source[ind];
        str+=ch;
    }
    return str;
}