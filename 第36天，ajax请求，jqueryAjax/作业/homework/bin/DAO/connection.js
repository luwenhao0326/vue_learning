var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/xxxx",{
    useNewUrlParser:true
},function(){
    console.log("数据库已连接");
})

module.exports = mongoose;