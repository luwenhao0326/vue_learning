var mongoose = require("./connection.js");

var userSchema = mongoose.Schema({
    name:String,
    psw:String,
    email:String

})

var User = mongoose.model("user",userSchema);

module.exports = User;
