var mongoose = require("./connection.js");

var userSchema = new mongoose.Schema({
    user:String,
    psw:String,
    tuxiang:String
})

var User = mongoose.model("user",userSchema);

module.exports = User;