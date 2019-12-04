var mongoose = require("./connection.js");


var studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    grade:{
        // mongoose.Schema.Types.ObjectId 表示这一列是一个id值，通常用于创建外键列
        type:mongoose.Schema.Types.ObjectId,
        // 当某列的类型是外键的id时，需要通过ref设置它所关联的是哪张表
        ref:"grade"
    }
})

var Student = mongoose.model("student",studentSchema);

module.exports = Student;