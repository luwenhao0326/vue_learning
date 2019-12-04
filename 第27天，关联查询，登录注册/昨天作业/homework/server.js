var app = require("./bin/app.js");

var Tiezi = require("./bin/DAO/tieziDAO.js");

var util = require("./bin/util.js");

// 首页页面接口
app.get("/",function(req,res){

    Tiezi.find(function(err,data){
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

    Tiezi.findOne({_id:req.body._id},function(err,data){
        var rep = {
            ip:ip,
            time:time,
            content:req.body.content
        }
        data.replies.push(rep);
        data.save(function(){
            res.redirect("/");
        });
    });

});