var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

app.use(express.static("www"))
app.use(bodyParser.urlencoded({extended:false}))

// 准备一个数组存放用户信息
var userArray;

fs.readFile("./user/userinfo.json",function(err,data){
    if(!err){
        userArray = JSON.parse(data);
    }else{
        userArray = [];
    }
})

// 注册接口
app.post("/user/regist",function(req,res){
    
    // 表单提交的数据，服务端在使用之前需要先进行格式判断，因为前端的数据格式要求是不可靠的
    var nameReg = /^[a-zA-Z0-9_]{3,12}$/;
    if(!nameReg.test(req.body.username)){
        res.send("用户名格式不对");
        return;
    }

    if(userArray.some(function(u){
        return u.username == req.body.username;
    })){
        res.send("此用户名已被占用");
    }else{
        userArray.push(req.body);
        var jsonStr = JSON.stringify(userArray);
        fs.writeFile("./user/userinfo.json",jsonStr,function(err){
            if(!err){
                res.send("注册成功");
            }
        })
    }
    
})

// 登录接口
app.post("/user/login",function(req,res){
    
    for(var i = 0;i<userArray.length;i++){
        var u = userArray[i];
        if(u.username==req.body.username){
            if(u.psw == req.body.psw){
                res.send("登陆成功");
            }else{
                res.send("密码错误");
            }
            return;
        }
    }

    res.send("无此用户");
    
})


app.listen(8080,function(){
    console.log("服务器已开启");
    
})



//---------------------------------------------------

var arr = ["red","blue","yellow","green"];

// 数组.forEach方法用于遍历数组，参数是一个遍历函数，数组会针对每一个元素都调用一次这个函数。
// 遍历函数的第一个参数是当前遍历到的元素，第二个参数是当前索引，第三个参数是数组本身。
// arr.forEach(function(el,i){
//     // console.log(123);
//     console.log(el+","+i);

// })

//------------------------------------------------------

var arr2 = [1,3,5,7,9];

// 数组.some方法，判断数组中是否至少有一个元素满足条件。参数是遍历函数，这个遍历函数需要返回一个布尔值，如果当前元素满足条件则返回true，不满足条件返回false
var flag = arr2.some(function(el){
    return el%2==0;
    
});

// console.log(flag);

//--------------------------------------------------------

// 数组的.every方法，用于判断数组中的元素是否都满足某个条件
arr2.every(function(){
    
})

//--------------------------------------------------------

// 过滤 返回也是数组
arr.filter(function(){

})
