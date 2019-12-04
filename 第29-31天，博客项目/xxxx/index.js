var app = require("./bin/app.js");
var User = require("./bin/DAO/userDAO.js");
var Fatie = require("./bin/DAO/fatieDAO.js");
var Huifu = require("./bin/DAO/huifuDAO.js");
var md5 = require("md5");

app.get("/",function(req,res){

    Fatie.find()
    .populate("author")
    .exec(function(err,data){
        var arr;
        data = JSON.parse(JSON.stringify(data));
        // console.log(data);
        data.forEach(function(el){
            el.biaoqian = el.biaoqian.split(" ");  
        })
        res.render("shouye.html",{
            gaoliang:"shouye",
            user:req.session.user,
            data
        });
    })

    
})

// 注册页面接口
app.get("/page/regist",function(req,res){
    res.render("regist.html",{
        gaoliang:"zhuce"
    });
    // console.log(req.session);
});

// 登录页面接口
app.get("/page/login",function(req,res){

    res.render("login.html",{
        gaoliang:"login",
        login:req.session.user
    });
    
})

// 退出登录接口
app.get("/remove/login",function(req,res){
    req.session.user = null;
    res.redirect("/");
}) 

// 发帖页面接口
app.get("/page/blogs",function(req,res){
    res.render("send-blogs.html",{
        gaoliang:"send-blog",
        user:req.session.user
    });
});
// 帖子详情页接口
app.get("/page/xiangqing",function(req,res){
   
    Fatie.findOne({_id:req.query._id},function(err,data){
        // data = JSON.parse(JSON.stringify(data))
        data.count++;
        data.save(function(){
            res.render("blog-xiangqing.html",{
                user:req.session.user,
                blog:data
            })
        })
    })
    .populate("author")
})

// 字符串分割中转接口
app.get("/qiegezifu",function(req,res){
    req.query._id = req.query._id.substr(1,req.query._id.length-2);
    res.redirect("/page/xiangqing?_id="+req.query._id)
    
})

// 用户发帖统计接口

app.get("/user/count",function(req,res){
    User.find({name:req.query._id})
    .exec(function(err,data){
        data = JSON.parse(JSON.stringify(data));
        // console.log(data);
        var ID 
        data.forEach(function(el){
            ID = el._id;
            // console.log(ID);
            // res.send("q")
        })
        
            Fatie.find({author:ID})
            .exec(function(err,data){
                res.render("blog-list.html",{data});
                
                
            })
        
    })
})

// 标签统计接口
var str  ="";
app.get("/biaoqian/list",function(req,res){
    Fatie.find({},{biaoqian:1})
    .exec(function(err,data){
        data.forEach(function(el){
            str+=el.biaoqian;
            str+=" ";
        })
        var  str1 = str.split(" ");
        str1.pop();
        for(var i = 0;i<str1.length;i++){
            for(var j = i+1;j<str1.length;j++){
                if(str1[i]==str1[j]){
                    str1.splice(j,1);
                    j--
                }
            }
        }
        console.log(str1);
        res.render("biaoqian-list.html",{str1})
        
        // res.send("a")
    })
})

// // 标签详情接口
// app.get("/page/biaoqian",function(){

// })



// ---------------------------------------------


// 登录接口
app.post("/user/login",function(req,res){
    User.findOne({name:req.body.username,psw:md5(req.body.psw)},function(err,data){
        if(data){
            req.session.user = data;
            
            res.redirect("/");
            
        }else{
            res.send("密码错误");
        }
    });
});

// 注册接口

app.post("/user/regist",function(req,res){
    User.findOne({name:req.body.username})
    .exec(function(err,data){
        if(!data){
            new User({
                name:req.body.username,
                psw:md5(req.body.psw),
                email:req.body.email
            }).save(function(err,data){
                res.redirect("/page/login");
            })
        }else{
            res.send("此用户名已被注册");
        }
    });
});

// 发帖接口

app.post("/send/blogs",function(req,res){
    new Fatie({
        title:req.body.title,
        biaoqian:req.body.biaoqian,
        main:req.body.main,
        user:req.session.user.username,
        time:new Date().getTime(),
        count:0,
        author:req.session.user._id,
        // huitie:{}
    }).save(function(err,data){
        res.redirect("/");
    })
});





// 回复接口
// app.post("/huifu/blogs",function(req,res){
//     var arr = req.body._id;
//     arr = arr.substr(1,arr.length-2);
    
//     if(req.session.user){
//         req.body.name = req.session.user.username
//     }
//     var r =  new Huifu({
//         name:req.body.username,
//         time: new Date().getTime(),
//         main:req.body.main,
//         yuantie:arr
//     })

//     r.save(function(err){
//         Fatie.findOne({_id:arr})
//         .exec(function(err,data){
//             // res.render("blog-xiangqing.html")
//             data.huitie.push(r._id)
//             console.log(data);
            
//             data.save(function(){
//                 res.send("xxxxx")
//             })
//         })
//     })
// })