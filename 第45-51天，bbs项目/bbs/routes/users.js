var express = require('express');
var router = express.Router();

const User = require("../bin/DAO/userDAO.js");
const Blog= require("../bin/DAO/userBlogDAO.js");
const md5 = require("md5");
const fs = require("fs");

// 邮件发送对象。
const mailSender = require("../bin/utils/mail-send.js")

// 用户名判断接口
router.get("/finduser",(req,res)=>{
    User.findOne({username:req.query.username})
    .then(data=>{
        if(data){
            res.json({err:1,msg:"用户名已被占用"})
        }else{
            res.json({err:0,msg:"ok"})
        }
    })
})

// 验证码判断接口
router.get("/findcap",(req,res)=>{
    
    if(req.query.cap.toLowerCase()!=req.session.captcha.toLowerCase()){
        res.json({err:2,msg:"验证码不正确"})
    }else{
        res.json({err:0,msg:"ok"})
    }
   
})

// 注册接口
router.post("/regist", function (req,res) {
    // 生成激活码
    let code = Math.floor(Math.random()*100000);
    new User({
        username:req.body.name,
        psw:md5(req.body.psw),
        email:req.body.email,
        code:code,
        blog:[]
    }).save()
    .then(()=>{
        // 注册成功之后给用户发送激活邮件
        mailSender.sendMail({
            from:"1193529870@qq.com",
            to:req.body.email,
            subject:"账号激活",
            html:`<h1>您好，这是您的验证邮件,点击下方链接进行激活<a href="http://192.168.50.238:3000/users/active?code=${code}">点击激活</a></h1>`
        },function(err){
            if(err){
                res.json({err:3,msg:"邮件发送失败"});
                console.log(err);
            }else{
                res.send({err:0,msg:"ok"})
            }
        })
    });
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
                res.send("激活成功")
            })
        }
    })
})

// 登录接口
router.post("/login",(req,res)=>{
    User.findOne({username:req.body.name,psw:md5(req.body.psw)})
    .then(data=>{
        if(data){
            req.session.user = data;
            req.session.user.touxiang = data.touxiang||"";
            res.json({err:0,msg:"ok"})
        }else{
            res.json({err:4,msg:"用户名或密码错误"})
        }
    })
    
})

// 判断是否登录
router.get("/pddl",(req,res)=>{
    if(req.session.user){
        res.json({err:0,msg:"ok",data:req.session.user})
    }else{
        res.json({err:5,msg:"还未登录"})
    }
})

const multer = require("multer");
let upload = multer({dest:"./public/avatars"});

// 换头像
router.post('/upload',upload.single("avatar"), function(req, res) {
    User.findOne({_id:req.session.user._id})
    .then(data=>{
        if(data.touxiang){
            fs.unlinkSync(`./public/avatars/${data.touxiang}`);
        }
        User.updateOne({_id:req.session.user._id },{$set:{touxiang:req.file.filename}},function(){
            req.session.user.touxiang = req.file.filename;
            res.json({err:0,msg:"ok",filename:req.file.filename})
        }) 
    })
});

// 退出登录
router.get("/exit",(req,res)=>{
    req.session.user = "";
    res.json({err:0,msg:"ok"});
})
  


module.exports = router;
