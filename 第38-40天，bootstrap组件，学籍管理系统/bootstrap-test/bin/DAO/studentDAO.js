const mongoose = require("./connection.js");

const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    tel:String,
    gender:String
});

const User = mongoose.model("student",studentSchema);

module.exports = User;