const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    title:String,
    content:String,
    avatar:Array
});

const User = mongoose.model("user",userSchema);

module.exports = User;