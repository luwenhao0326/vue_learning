var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/array-test",{
    useNewUrlParser:true
},function(err){
    if(!err){
        console.log("数据库已连接");
        
    }else{
        
        console.log("数据库连接失败");
        
    }
})

var msgSchema = new mongoose.Schema({
    ip:String,
    time:String,
    content:String,
    reply:Array
});

var Msg = mongoose.model("msg",msgSchema);

// --------------------------------------

// var m = new Msg({
//     ip:"192.168.1.1",
//     time:"2018年8月14日",
//     content:"这是第一条留言",
//     reply:[]
// });

// m.save(function(){
//     console.log("存储成功");
// });

//-------------------------------------------

var _id = "5b729350bd639223146c9c3a";
var rep = {
    ip:"192.168.100.100",
    time:"刚刚",
    content:"这是回复内容"
}


// 首先，根据留言的id查找到这条路帖子对象

Msg.findOne({_id:_id},function(err,data){
    // 然后把留言添加到帖子对象的留言数组reply中
    data.reply.push(rep);
    // 最后保存一次帖子对象
    data.save(function(err){
        if(!err){
            console.log("添加回复成功");
            
        }
    })
})