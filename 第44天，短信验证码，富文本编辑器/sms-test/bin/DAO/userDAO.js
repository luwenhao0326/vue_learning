const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    tel:String
});

const User = mongoose.model("user",userSchema);

module.exports = User;