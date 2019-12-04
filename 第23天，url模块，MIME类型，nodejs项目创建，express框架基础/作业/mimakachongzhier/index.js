var express = require("express");
var app = express();
app.use(express.static("www"));
var bodyParser = require("body-parser");

var arr = ["1","12","123","1234","12345","123456","1234567"];
var arr2 = ["q","qw","qwe","qwer","qwert","qwerty","qwertyu"]
app.use(bodyParser.urlencoded({extended:false}))
app.post("/api",function(req,res){
    console.log(req.body);
    if(arr.indexOf(req.body.name)!=-1&&arr2.indexOf(req.body.psw)!=-1){
        res.send("充值成功");
        arr.splice(arr.indexOf(req.body.name),1);
        arr2.splice(arr.indexOf(req.body.name),1);
    }else{
        res.send("充值失败");
    }
        
        
    
   

})

app.listen(8080,function(){
    console.log("服务器已开启");
})