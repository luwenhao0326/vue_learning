var express = require('express');
var router = express.Router();

// ccap模块，用于生成验证码图片
const ccap = require("ccap");

// 创建图片生成对象
const captcha = ccap({
    width:190,
    generate:function(){
        let source = "1234567890qwertyuiopasdfghjklzxcvbnm";
        let str = "";
        for(let i = 0;i<4;i++){
            let ind = Math.floor(Math.random()*source.length) ;
            str+=source[ind];
        }
        return str;
    }
});


// 用于生成验证码图片的接口
router.get("/captcha", (req, res) => {
    let arr = captcha.get();
    req.session.captcha = arr[0];
    res.set("Content-Type","image/jpg")
    res.send(arr[1])
});

module.exports = router;
