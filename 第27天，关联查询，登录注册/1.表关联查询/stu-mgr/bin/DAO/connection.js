var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/stu-mgr",{
    useNewUrlParser:true
},function(err){
    if(!err){
        console.log("数据库连接成功");
        
    }else{
        console.log("数据库连接失败");
        
    }
});

module.exports = mongoose;