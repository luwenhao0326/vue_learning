const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    username:String,
    psw:String,
    email:String,
    isActive:Boolean,
    code:String,
    touxiang:String,
    
    
});

const User = mongoose.model("user",userSchema);

module.exports = User;