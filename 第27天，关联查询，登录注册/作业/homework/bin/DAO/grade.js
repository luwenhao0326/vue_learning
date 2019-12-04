var mongoose = require("./connection.js");

var gradeSchema = mongoose.Schema({
    name:String,
    teacher:String,
    major:String
})

var Grade = mongoose.model("grade",gradeSchema);

module.exports = Grade;