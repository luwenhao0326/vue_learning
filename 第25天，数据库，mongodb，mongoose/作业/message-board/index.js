var express = require("express");
var fs = require("fs");

var app = express();


var art = require("express-art-template");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.engine("html", art);
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", function (req, res) {
    Hhhh.find({}, function (err, data) {
        if (!err) {
            messages = data;
        } else {
            console.log("查询错误");
        }
    }).sort({_id:-1});

    res.render("msg.html", { messages });
});

var util = require("./bin/util.js");

mongoose.connect("mongodb://127.0.0.1:27017/hhhh", function (err) {
    if (!err) {
        console.log("数据库连接成功");
    } else {
        console.log("数据库连接失败");
        console.log(err);
    }
});

var hhhhSchema = new mongoose.Schema({
    ip: String,
    time: String,
    main: String
});

var Hhhh = mongoose.model("hhhh", hhhhSchema);

var messages;

app.post("/msg/commit", function (req, res) {
    
    Hhhh.find({}, function (err, data) {
        if (!err) {
            messages = data;
        } else {
            console.log("查询错误");
        }
    }).sort({_id:-1});

    var s = new Hhhh({
        ip:req.ip.substr(req.ip.lastIndexOf(":") + 1),
        time: util.getTimeStr(new Date()),
        main: req.body.msg
    });

    s.save(function (err) {
        if (!err) {
            console.log("插入成功");
            Hhhh.find({}, function (err, data) {
                if (!err) {
                    messages = data;
                } else {
                    console.log("查询错误");
                }
            }).sort({_id:-1});
            res.redirect("/");
            
        } else {
            console.log("插入失败");
        }
        
    });
    
});


app.listen(8080, function () {
    console.log("服务器已开启");
});