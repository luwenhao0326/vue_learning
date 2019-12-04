var express = require('express');
var router = express.Router();

const smsSender = require("../bin/utils/sms-send.js");

const makeCap = require("../bin/utils/make-cap.js");

// 请求发送验证码接口
router.post("/getcap", function (req, res) {
    console.log(req.body);

    // 生成验证码
    let cap = makeCap();
    
    req.session.cap = cap;
    req.session.tel = req.body.tel;
    setTimeout(() => {
        req.session.cap = null;
    }, 1000*60*5);

    smsSender.sendWithParam(86, req.body.tel, 192492,
    [cap,"5"],"sunhuayu", "", "", function(err,res2,resData){
        if(err){
            res.json({err:1,msg:err})
        }else{
            res.json({ err: 0 ,msg:"ok"});
        }
    });

})

const User = require("../bin/DAO/userDAO.js")

// 登录注册接口
router.post("/login",function(req,res){
    if(req.session.cap==req.body.cap){
        // 查询是否是新用户
        User.findOne({tel:req.session.tel})
        .then(data=>{
            if(data){
                // 如果是老用户，直接标记为登录状态
                req.session.user = data;
            }else{
                // 如果是新用户则先把用户信息存入数据库，然后标记为登录状态
                let u = new User({tel:req.session.tel});
                u.save()
                .then(()=>{
                    req.session.user = u;
                })
            }
            res.json({err:0,msg:"登录成功"});
        });
    }else{
        res.json({err:2,msg:"验证码错误"})
    }
})

module.exports = router;
