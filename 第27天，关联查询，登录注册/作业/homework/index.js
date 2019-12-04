var app = require("./bin/app.js");

var Grade = require("./bin/DAO/grade.js");
var Student = require("./bin/DAO/student.js");
// 添加班级
app.post("/grade/add",function(req,res){

    var s = new Grade(req.body);
    s.save(function(){
        res.redirect("/");
    })
})

// 添加学生课程
app.get("/stu/qqq",function(req,res){
    Grade.find(function(err,data){
        data = JSON.parse(JSON.stringify(data)); 
        res.render("stu-add.html",{data});
    })
})

// 添加学生
app.post("/stu/add",function(req,res){
    console.log(req.body);
        var s = new Student(req.body);
        s.save(function(){
            res.redirect("/")
        })
        
})
// 查看班级

app.get("/grade/list",function(req,res){
    Grade.find(function(err,data){
        data = JSON.parse(JSON.stringify(data));

        res.render("grade-list.html",{data});
    })
})

// 查看学生

app.get("/stu/list",function(req,res){
    var xx= req.query.grade
    if(!xx){
        xx = {};
    }else{
        xx = {
            banji:req.query.grade
        }
    }
    
    Student.find(xx).populate("banji").exec(function(err,data){
        data = JSON.parse(JSON.stringify(data)); 
        // console.log(data);
        console.log(req.query);
        
        res.render("stu-list.html",{data});
    })

})


