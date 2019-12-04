const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    username:String,
    psw:String
});

const User = mongoose.model("user",userSchema);

module.exports = User;