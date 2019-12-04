var express = require('express');
var router = express.Router();

const User = require("../bin/DAO/userDAO.js")


// 注册接口
router.post('/regist', function (req, res) {
    User.findOne({account:req.body.account})
    .then(data=>{
        if(data){
            res.json({err:1,msg:"用户名已被占用"});
        }else{
            new User(req.body).save()
            .then(()=>{
                res.json({err:0,msg:"ok"});
            })
        }
    })
});

// 登录接口
router.post("/login",function(req,res){
    User.findOne(req.body,{psw:0})
    .then(data=>{
        if(data){
            req.session.user = data;
            res.json(({err:0,msg:"ok"}))
        }else{
            res.json({err:2,msg:"账号或密码错误"});
        }
    })
})


// 判断是否已登录的接口。
router.get("/isLogin",function(req,res){
    if(req.session.user){
        res.json({err:0,msg:"ok",user:req.session.user})
    }else{
        res.json({err:3,msg:"还未登录"})
    }
});

let multer = require("multer");
let upload = multer({dest:"./public/avatars"})

router.post("/upload",function(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.json({err:3,msg:"请先登录"})
    }
})


// 头像上传接口
router.post("/upload",upload.single("avatar"),function(req,res){

    // if(req.session.user.avatar){
        // 删除旧头像
    // }
    console.log(req.file)
    User.updateOne({_id:req.session.user._id},{$set:{avatar:req.file.filename}})
    .then(()=>{
        req.session.user.avatar = req.file.filename;
        res.json({err:0,msg:"ok"})
    });
});

module.exports = router;
