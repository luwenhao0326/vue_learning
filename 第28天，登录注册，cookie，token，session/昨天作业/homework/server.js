var app = require("./bin/app.js");

var Tiezi = require("./bin/DAO/tieziDAO.js");
var Reply = require("./bin/DAO/replyDAO.js");
var util = require("./bin/util.js");

// 首页页面接口
app.get("/",function(req,res){

    Tiezi.find().populate("replies").exec(function(err,data){
        data = JSON.parse(JSON.stringify(data));

        data = data.reverse();
        
        // 转换时间格式
        util.formatTimeArray(data);

        data.forEach(function(t){
            util.formatTimeArray(t.replies);
        });

        res.render("home.html",{data});
    });

    
});



// 发帖接口
app.post("/tiezi/commit",function(req,res){
    var ip = req.ip.substr(req.ip.lastIndexOf(":")+1);
    var time = new Date().getTime();

    var t = new Tiezi({
        ip:ip,
        time:time,
        content:req.body.content,
        replies:[]
    });

    t.save(function(){
        res.redirect("/");
    });

});


//回帖接口

app.post("/tiezi/reply",function(req,res){

    var ip = req.ip.substr(req.ip.lastIndexOf(":")+1);
    var time = new Date().getTime();

    // 先把这条回复存入回复表
    var r = new Reply({
        ip:ip,
        time:time,
        content:req.body.content
    })

    r.save(function(){
        // 回复存入表中之后，需要把它的id加入所回复的帖子的replies数组中。

        // 查询要回复的帖子对象
        Tiezi.findOne({_id:req.body._id},function(err,data){
            // 把回复的id存入帖子的replies数组中
            data.replies.push(r._id);
            data.save(function(err){
                res.redirect("/");
            })
        });
    })

    // 先查询出要回复的帖子
    

});