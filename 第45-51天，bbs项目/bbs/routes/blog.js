var express = require('express');
var router = express.Router();

const Blog= require("../bin/DAO/userBlogDAO.js");
const Huifu = require("../bin/DAO/huifuDAO.js");
const Huifu2 = require("../bin/DAO/huifudehuifuDAO.js")

// 板块
router.post("/bankuai",(req,res)=>{
    if(req.body.str*1==1){
        res.json({err:0,msg:"ok",bankuai:"灌水专区"})
    }
    if(req.body.str*1==2){
        res.json({err:0,msg:"ok",bankuai:"学术交流"})
    }
    if(req.body.str*1==3){
        res.json({err:0,msg:"ok",bankuai:"web前端"})
    }
    if(req.body.str*1==4){
        res.json({err:0,msg:"ok",bankuai:"UI设计"})
    }
})

// 发表博客
router.post("/send-blog",(req,res)=>{
    new Blog({
        title:req.body.title,
        content:req.body.content,
        bankuai:req.body.bankuai,
        author:req.session.user._id,
        count:0,
        huifu:[]
    }).save(()=>{
        res.json({err:0,msg:"ok"})
    })
    
})

// 查询博客
router.get("/findBlog",(req,res)=>{
    Blog.find({bankuai:req.query.bankuai}).populate("author",{psw:0})
    .then(data=>{
        res.json({err:0,msg:"ok",data})
    })
})

// 博客详情
router.get("/xiangqing",(req,res)=>{
    
    // 查询博客并回去渲染
    Blog.findOne({_id:req.query.str})
    .populate("author",{psw:0})
    .populate({
        path:"huifu",
        options:{
            populate:("huifudehuifu")
        },
    })
    .then(data=>{
        console.log(data);
        
        res.json({err:0,msg:"ok",data})
    })
})

// 回复博客接口
router.post("/huifu-blog",(req,res)=>{
    // console.log(req.body);
    // console.log(req.session);
    
    new Huifu({
        author:req.session.user.username,
        touxiang:req.session.user.touxiang,
        content:req.body.content,
        huifudehuifu:[]
    }).save()
    .then(r=>{
        Huifu.findOne({_id:r._id})
        .then(data=>{
            // 把新的回复的id放进原博客中
            Blog.findOne({_id:req.body.yuanTieId})
            .then(data2=>{
                data2.huifu.push(data._id);
                data2.save(function(){
                    res.json({err:0,msg:"ok"})
                })
            })
        })
    })
})

// 回帖的回帖
router.get("/hfdhf",(req,res)=>{
    new Huifu2({
        author:req.session.user.username,
        touxiang:req.session.user.touxiang,
        content:req.query.content
    }).save()
    .then(r=>{
        Huifu.findOne({_id:req.query.blog_id})
        .then(data=>{
            data.huifudehuifu.push(r._id)
            data.save();
            res.json({err:0,msg:"ok"})
        })
    })
    
    
    
    
})



module.exports = router;