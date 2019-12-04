var app = require("./bin/app.js");
var User = require("./bin/DAO/userDAO.js");

app.get("/page/regist",function(req,res){
    res.redirect("/regist.html");
})



// ----------------------------
var num;
var multer = require("multer");
var storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./www/images");
    },
    // filename，设置文件名
    filename:function(req,file,cb){
        var arr = file.originalname.split(".");
        num = Date.now()+"."+arr[arr.length-1];
        cb(null,Date.now()+"."+arr[arr.length-1]);
        
    }
})
var upload = multer({storage:storage});
// ----------------------------------
// 注册界面
app.post("/user/regist",function(req,res){
    // console.log(req.body);
    new User({
        user:req.body.username,
        psw:req.body.psw,
        tuxiang:num
    }).save(function(){
        req.session.user = req.body;
        res.redirect("/login.html",);
    })
})

// 登录界面
app.post("/user/login",function(req,res){
    // console.log(req.body);
    User.findOne({user:req.body.username,psw:req.body.psw})
    .exec(function(err,data){
        if(data){
            // console.log(data);
            req.session.user = data;
            res.redirect("/user.html");
        }else{
            res.send("用户名或密码错误")
        }
    })
})


function qqq(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.send("请先登录");
    }
}

// 把图片名称保存到数据库中
app.post("/user/tupian",qqq,upload.single("tupian") ,function(req,res){
    // console.log(req.session);
    new User({
        user:req.session.user.user,
        psw:req.session.user.psw,
        tuxiang:num
    }).save(function(){
        res.redirect("/index.html",);
    })
})

// 读取数据库，渲染页面
app.get("/user/xiangqing",qqq,function(req,res){
    User.findOne({tuxiang:num})
    .exec(function(err,data){
        if(data){
            data = JSON.parse(JSON.stringify(data));
            console.log(data);
            res.render("userxiangqing.html",data)
        }else{
            res.send("xxxxx");
        }
    })
    
})