// mongodb官方为nodejs提供的模块是mongodb，但是这个工具使用非常麻烦，项目中使用mongodb一般都会用高度封装之后的mongoose工具
//下载 npm install mongoose --save


var mongoose = require("mongoose");

// mongoose.connect，连接数据库，第一个参数是连接地址的url，mongodb默认使用27017端口，第二个参数是连接的回调函数，连接失败时会有err参数。

mongoose.connect("mongodb://127.0.0.1:27017/h5-37",function(err){
    if(!err){
        console.log("数据库连接成功");
    }else{
        console.log("数据库连接失败");
        console.log(err);
    }
});



// 使用mongoose操作数据库，需要为每张表设置一个表描述对象。

//mongoose.Schema构造函数，用于创建表描述对象，第一个参数是对象，其中以键值对的形式描述表的所有列。
// 创建了表的描述对象之后，如果数据库中存在这张表，则使用这张表，如果不存在则会自动创建这张表。

var studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    married:Boolean,
    sex:String  
});


// 创建这个表的操作对象，对于这张表的增删改查都需要通过这个对象进行。（这个对象的本质是一个构造函数）
// mongoose.model创建某个表的操作对象，第一个参数是表名，第二个参数是表的描述对象。
var Students = mongoose.model("students",studentSchema);

//-------------------------------------------------------

// 查询

// mongoose中所有的数据库都是异步的。

// 表操作对象.find方法，用于查询这张表，第一个参数是查询条件，第二个参数是查询哪几列，第三个参数是查询的回调函数

Students.find({sex:"nan"},function(err,data){
    if(!err){
        console.log(data);
    }else{
        console.log("查询错误");
    }
});


//----------------------------------------------

// 增加

// 插入数据，需要先用表操作对象（构造函数）创建一个新的数据对象，然后调用这个对象的save方法。

// 表操作对象的构造函数，参数是一个对象，在这个对象中通过键值对设置这条数据的值
// var s = new Students({
//     name:"张三",
//     age:24,
//     married:true,
//     sex:"nan"
// });

// s.save(function(err){
//     if(!err){
//         console.log("插入成功");
//     }else{
//         console.log("插入失败");
//     }
// });

//----------------------------------------------------

// 删除
// Students.remove({_id:"5b712ffae67c044936567adb"},function(err){
//     if(!err){
//         console.log("删除成功");
//     }else{
//         console.log("删除失败");
//     }
// })

//-----------------------------------------------------

// 修改
// Students.update,修改表，第一个参数是匹配条件（一般都要以主键为条件），第二个参数是修改内容,第三个参数是修改操作的回调函数
Students.update({_id:"5b712cd0e67c044936567ad4"},{$set:{sex:"nan",age:20}},function(err){
    if(!err){
        console.log("修改成功");
    }else{
        console.log("修改失败");
    }
})



