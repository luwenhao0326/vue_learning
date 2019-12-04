var app = require("./bin/app.js");
var User = require("./bin/DAO/useDAO.js");

var util = require("./bin/util.js");

var md5 = require("md5");
// 首页页面接口
app.get("/", function (req, res) {

    Blog.find()
        .populate("author")
        .exec(function (err, data) {
            data = JSON.parse(JSON.stringify(data));
            // console.log(data);

            data.forEach(function (b) {
                b.time = util.timeFormat(b.time);
                b.tag = b.tag.split(" ");
            })

            data = data.reverse();
            // 渲染数据时，将session中的user对象传入，可以判断当前用户是否登录
            res.render("index.html", {
                page: "home",
                user: req.session.user,
                blogs: data
            });
        });
});

// 注册页面接口
app.get("/page/regist", function (req, res) {
    res.render("regist.html", {
        page: "regist",

    });
})

// 登录页面接口
app.get("/page/login", function (req, res) {
    res.render("login.html", {
        // page用于标记这个页面是哪个页面，让header判断应该显示哪个连接为高亮
        page: "login",
        // 用于显示页面中的提示，例如，如果是注册完毕跳转到的登录页，要显示注册成功。
        tip: req.query.tip,
    })
})

// 发帖页面接口

app.get("/page/send-blog", function (req, res) {
    if (req.session.user) {
        res.render("send-blog.html", {
            page: "send",
            user: req.session.user
        })
    } else {
        res.send("请先登录");
    }

})

// 帖子详情页面接口
app.get("/page/blog-detail", function (req, res) {

    Blog.findOne({ _id: req.query._id })
        .populate("author")
        .populate("reply")
        .exec(function (err, data) {
            // 浏览次数加一
            console.log(data);
            
            data.readCount++;
            data.save(function () {
                var d2 = JSON.parse(JSON.stringify(data));
                d2.time = util.timeFormat(d2.time);
                d2.reply.forEach(function (r) {
                    r.time = util.timeFormat(r.time);
                });
                res.render("blog-detail.html", {
                    user: req.session.user,
                    blog: d2
                });
            });
        });
});

// 帖子列表接口

app.get("/page/blog-list",function(req,res){

    var condition = {};
    var title;
    if(req.query.author){
        condition.author = req.query.author;
    }
    if(req.query.tag){
        condition.tag = new RegExp(req.query.tag) ;
        title = req.query.tag;
    }

    Blog.find(condition)
    .exec(function(err,data){
        data = JSON.parse(JSON.stringify(data));
        res.render("blog-list.html",{
            blogs:data,
            title:title
        });
    });
});

// 标签列表页面接口
app.get("/pag/tag-list",function(req,res){

    Blog.find({},{tag:1})
    .exec(function(err,data){
        var str = "";
        data.forEach(function(b){
            str+=b.tag;
            str+=" "
        });
        str = str.substr(0,str.length-1);
        var tags = str.split(" ");
        for(var i = 0;i<tags.length;i++){
            for(var j=i+1;j<tags.length;j++){
                if(tags[i]==tags[j]){
                    tags.splice(j,1);
                    j--;
                }
            }
        }
        res.render("tag-list.html",{
            page:"tag",
            user:req.session.user,
            tags:tags
        })
    });
});

// --------------------------------------------------

// 注册接口
app.post("/user/regist", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, data) {
        if (data) {
            res.send("用户名已被占用");
        } else {
            new User({
                username: req.body.username,
                psw: md5(req.body.psw),
                email: req.body.email
            }).save(function (err) {
                res.redirect("/page/login?tip=注册成功");
            })
        }
    });
});

// 登录接口

app.post("/user/login", function (req, res) {
    User.findOne({
        username: req.body.username,
        psw: md5(req.body.psw)
    }, function (err, data) {
        if (data) {
            req.session.user = data;
            res.redirect("/");
        } else {
            res.send("账号或密码错误");
        }
    })
})

// 退出登录接口

app.get("/user/logout", function (req, res) {
    req.session.user = null;
    res.redirect("/");
})

var Blog = require("./bin/DAO/blogDAO.js");

// 发帖接口
app.post("/blog/send", function (req, res) {
    
    if (req.session.user) {
        var b = new Blog({
            title: req.body.title,
            tag: req.body.tag,
            content: req.body.content,
            reply: [],
            readCount: 0,
            time: new Date().getTime(),
            author: req.session.user._id
        });
        b.save(function () {
            res.redirect("/");
        })
    } else {
        res.send("请先登录");
    }
});


var Reply = require("./bin/DAO/replyDAO.js");
// 回复接口

app.post("/blog/reply", function (req, res) {
    var time = new Date().getTime();
    var nickname = req.body.nickname || req.session.user.username;
    var r = new Reply({
        time: time,
        nickname: nickname,
        content: req.body.content,
        blogID: req.body._id
    });

    r.save(function () {
        Blog.findOne({ _id: req.body._id })
            .exec(function (err, data) {
                data.reply.push(r._id);
                data.save(function () {
                    res.redirect("/page/blog-detail?_id=" + data._id);
                });
            });
    });

});

// 删帖接口
app.get("/blog/delete", function (req, res) {
    // 判断是否登录
    if (!req.session.user) {
        res.send("请先登录");
        return;
    }
    // 先判断请求发起者是否是帖子作者
    Blog.findOne({ _id: req.query._id })
        .exec(function (err, data) {
            if (req.session.user._id == data.author) {
                // 删除帖子前要删除帖子的回复
                Reply.remove({ blogID: req.query._id }, function () {
                    // 再删除帖子
                    Blog.remove({ _id: req.query._id }, function () {
                        res.redirect("/");
                    });
                });
            }else{
                res.send("错误");
            }
        });
});

// 在js中，或运算可以计算任何类型，前者为真时，直接取前者值，前者为假时，直接取后者。
// var a = 3||5;
// console.log(a);

// 与运算，前者为真取后者，前者为假取前者。
// var a = false&&false;

