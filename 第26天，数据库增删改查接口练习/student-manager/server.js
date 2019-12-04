var app = require("./bin/app.js");


var Student = require("./bin/DAO/studentsDAO.js");

// 学生信息添加接口
app.post("/stu/add",function(req,res){
    var s = new Student(req.body);

    s.save(function(err){
        if(!err){
            res.render("temp.html",{data:"添加成功"});
        }else{
            res.send("服务器错误");   
        }
    })
})

// 查询接口
app.get("/page/stu-list",function(req,res){
    Student.find(function(err,data){
        if(!err){
            data = JSON.parse(JSON.stringify(data));
            res.render("stu-list.html",{students:data});
        }else{
            res.send("服务器错误");
        }
    })  
})


// 删除学生接口
app.get("/stu/delete",function(req,res){

    Student.remove({_id:req.query._id},function(err){
        if(!err){
            res.render("temp.html",{data:"删除成功"});
        }else{
            res.send("删除失败");
        }
    })
})

// 编辑页面接口
app.get("/page/edit",function(req,res){
    // mongoose的表操作对象还有一个查询方法，findOne查询表中第一条符合条件的数据。
    // 回调函数中的data不再是数组，而是这条数据的对象。如果没有符合条件的数据，则data为null
    Student.findOne({
        _id:req.query._id
    },function(err,data){
        data = JSON.parse(JSON.stringify(data));
        res.render("edit.html",data);
    });
})

// 学生信息修改接口
app.post("/stu/edit",function(req,res){
    if(!req.body.course){
        req.body.course = [];
    }
    
    Student.update({_id:req.body._id},{
        $set:{
            name:req.body.name,
            age:req.body.age,
            course:req.body.course
        }
    },function(err){
        res.render("temp.html",{data:"修改成功"});
    })
});