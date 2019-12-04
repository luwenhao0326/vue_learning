var mongoose = require("./connection.js");

var studentSchema = mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
    banji:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"grade"
    }
})

var Student = mongoose.model("student",studentSchema);

module.exports = Student;