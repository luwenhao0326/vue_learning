var express = require('express');
var router = express.Router();

// http模块除了可以创建服务器对象，用于处理请求，也可以作为客户端发起请求
const http = require("http");

router.get("/api/proxy",function(req,res){
    http.get("http://127.0.0.1:4000/api/third",function(resPro){
        let total = new Buffer("");
        resPro.on("data",function(d){
            total+=d;
        })
        resPro.on("end",function(){
            res.set(resPro.headers);
            res.send(total);
        })
    })
})


module.exports = router;
