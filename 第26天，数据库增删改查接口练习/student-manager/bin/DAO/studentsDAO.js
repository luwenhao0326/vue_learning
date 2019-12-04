// DAO,data access object：数据访问对象

// 为了方便操作数据库，可以为数据库中每一张表都创建一个数据访问对象。（表操作对象）


var mongoose = require("./connection.js");

var studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    course:Array
});

 var Student = mongoose.model("students",studentSchema);

 module.exports = Student;