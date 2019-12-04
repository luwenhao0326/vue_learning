const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    account:String,
    psw:String,
    avatar:String
});

const User = mongoose.model("user",userSchema);

module.exports = User;