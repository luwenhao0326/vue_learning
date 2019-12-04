var app = require("./bin/app.js");

var Hhhh = require("./bin/DAO/hhhh.js");



app.get("/", function (req, res) {
    Hhhh.find( function (err, data) {
        data = JSON.parse(JSON.stringify(data));
        if (!err) {
            messages = data;
            res.render("msg.html", { messages });
        } else {
            console.log("查询错误");
        }
    }).sort({ _id: -1 });

    
});

var util = require("./bin/util.js");

var messages;

app.post("/msg/commit", function (req, res) {


    Hhhh.find({}, function (err, data) {
        data = JSON.parse(JSON.stringify(data));
        if (!err) {
            messages = data;
        } else {
            console.log("查询错误");
        }
    }).sort({ _id: -1 });

    var s = new Hhhh({
        ip: req.ip.substr(req.ip.lastIndexOf(":") + 1),
        time: util.getTimeStr(new Date()),
        main: req.body.msg,
        reply:[]

    });

    s.save(function (err) {
        if (!err) {
            console.log("插入成功");
            Hhhh.find({}, function (err, data) {
                data = JSON.parse(JSON.stringify(data));
                if (!err) {
                    messages = data;
                } else {
                    console.log("查询错误");
                }
            }).sort({ _id: -1 });
            res.redirect("/");
        } else {
            console.log("插入失败");
        }
    });
});


app.get("/huifu", function (req, res) {
   var rep = {
        ip: req.ip.substr(req.ip.lastIndexOf(":") + 1),
        time: util.getTimeStr(new Date()),
        content: req.query.huida
    }
    Hhhh.findOne({
        _id:req.query._id
    },function(err,data){
        data.reply.push(rep);
        data.save(function(err){
            if(!err){
                res.redirect("/")  
            }
        })
        console.log(data);
    });
})

