var express = require('express');
var router = express.Router();

const User = require("../bin/DAO/userDAO.js");

// 邮件发送对象。
const mailSender = require("../bin/utils/mail-send.js")


// 注册接口
router.post("/regist", function (req,res) {
    if(req.body.cap.toLowerCase()!=req.session.captcha.toLowerCase()){
        res.send("验证码错误");
        return;
    }

    User.findOne({account:req.body.account})
    .then(data=>{
        if(data){
            res.send("用户名已被占用");
        }else{
            // 生成激活码
            let code = Math.floor(Math.random()*100000);
            req.body.code = code;
            new User(req.body).save()
            .then(()=>{
                // 注册成功之后给用户发送激活邮件
                mailSender.sendMail({
                    from:"1193529870@qq.com",
                    to:req.body.email,
                    subject:"账号激活",
                    html:`<h1>您好，这是您的验证邮件,点击下方链接进行激活<a href="http://192.168.50.238:3000/users/active?code=${code}">点击激活</a></h1>`
                },function(err){
                    if(err){
                        res.send("验证邮件发送失败");
                        console.log(err);
                    }else{
                        res.send("注册成功，请前往您的邮箱进行账号激活")
                    }
                })
            });
        }
    })
})

// 激活接口
router.get("/active",function(req,res){
    User.findOne({code:req.query.code})
    .then(data=>{
        if(!data){
            res.send("激活码错误");
        }else{
            data.isActive = true;
            data.save()
            .then(()=>{
                res.send("账号激活成功，请返回首页");
            })
        }
    })
})

router.get("/aaa",function(req,res){
    res.send("qwe")
})
module.exports = router;
