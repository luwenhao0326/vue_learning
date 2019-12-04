var express = require("express");
var app = express();

app.use(express.static("www"));
var bodyParser = require("body-parser");
var geshui ;
app.use(bodyParser.urlencoded({extended:false}))
app.post("/api",function(req,res){

    // console.log(123);
    
    var salary = req.body.gongzi*1;

    if (salary <= 3500) {
        geshui = 0;
    } else if (salary <= 5000) {
        geshui = (salary - 3500) * 3 / 100;
    } else if (salary <= 8000) {
        geshui = (salary - 3500) * 0.1 - 105;
    } else if (salary <= 13500) {
        geshui = (salary - 3500) * 0.2 - 555;
    } else if (salary <= 38500) {
        geshui = (salary - 3500) * 0.25 - 1005;
    } else if (salary <= 58500) {
        geshui = (salary - 3500) * 0.3 - 2755;
    } else if (salary <= 83500) {
        geshui = (salary - 3500) * 0.35 - 5505;
    } else {
        geshui = (salary - 3500) * 0.45 - 13505;
    }

    res.send("你的个人所的税为"+geshui+"元");
})


app.listen(8080,function(){
    console.log("服务器已开启"); 
})
