var express = require('express');
var router = express.Router();


const User = require("../bin/DAO/studentDAO.js");

router.use((req,res,next)=>{
    setTimeout(() => {
        next();
    }, 500);
});

//添加学生接口
router.post("/add",(req,res)=>{
    if(!req.body.name){
        res.json({err:2,msg:"数据格式错误"});
        return;
    }

    new User(req.body).save()
    .then(()=>{
        res.json({err:0,msg:"ok"});
    })
    .catch(err=>{
        res.json({err:1,msg:err});
    })

});

const countPerPage = 5;

//学生列表接口
router.get("/list",(req,res)=>{
    // console.log(req.query);

    // 根据参数，封装条件对象。
    let condition = {};
    if(req.query.name){
        condition.name = new RegExp(req.query.name);
    }
    if(req.query.age){
        condition.age = req.query.age;
    }
    if(req.query.tel){
        condition.tel = new RegExp(req.query.tel)
    }
    if(req.query.gender){
        condition.gender = req.query.gender
    }

    // console.log(condition);


    // 先查询总页数
    User.find(condition).count()
    .then(c=>{
        let totalPage = Math.ceil(c/countPerPage);
        // 在查询某一页的数据
        let sortCondition = {};
        if(req.query.sort){
            sortCondition.age = req.query.sort*1;
        }
        User.find(condition).skip(req.query.page*countPerPage).limit(countPerPage)
        .sort(sortCondition)
        .then(data=>{
            res.json({
                err:0,
                data:data,
                totalPage
            });
        });
    })
});


//删除接口
router.get("/delete",(req,res)=>{
    User.deleteOne({_id:req.query._id})
    .then(()=>{
        res.json({err:0,msg:"ok"});
    });
});

// 修改接口
router.post("/edit",(req,res)=>{
    // console.log(req.body);
    User.updateOne({_id:req.body._id},{$set:{tel:req.body.tel,age:req.body.age*1}})
    .then(()=>{
        res.json({err:0,msg:"ok"});
    });
});



module.exports = router;
