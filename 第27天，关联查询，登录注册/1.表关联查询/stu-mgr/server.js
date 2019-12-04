var app = require("./bin/app.js");

var Grade = require("./bin/DAO/gradeDAO.js");
var Student = require("./bin/DAO/studentDAO.js");
// 添加班级接口

app.post("/grade/add",function(req,res){
    var g = new Grade(req.body);
    g.save(function(){
        res.redirect("/");
    })
})

// 班级列表页面接口
app.get("/page/grade-list",function(req,res){
    Grade.find(function(err,data){
        data = JSON.parse(JSON.stringify(data));
        res.render("grade-list.html",{data});
    })
})

// 学生添加页面接口

app.get("/page/stu-add",function(req,res){
    Grade.find(function(err,data){
        data = JSON.parse(JSON.stringify(data));
        res.render("stu-add.html",{data});
    })
})


// 学生添加接口
app.post("/stu/add",function(req,res){
    var s = new Student(req.body);
    s.save(function(){
        res.redirect("/");
    }) 
})

// 学生列表
app.get("/page/stu-list",function(req,res){

    // Student.find(function(err,data){
    //     data = JSON.parse(JSON.stringify(data)); 
    //     console.log(data);
    //     res.render("stu-list.html",{data});
    // }).populate("grade");

    // 表操作对象.find查询完毕之后可以再调用.populate方法，将查询到的数据中的某一列的id值替换为它关联的表中的数据对象
    // populate方法的参数是一个字符串，表示要替换哪些列，前提是这一列必须是ObjectID，并且设置过ref关联表

    // 查询的回调函数也可以不写在find中，可以写在所有操作之后的.exec中
    
    Student.find(req.query).populate("grade").exec(function(err,data){
        data = JSON.parse(JSON.stringify(data)); 
        // console.log(data);
        
        res.render("stu-list.html",{data});
    })
    
})
