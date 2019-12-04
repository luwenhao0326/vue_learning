const mongoose = require("./connection.js");

const huifudehuifuSchema = new mongoose.Schema({
    author:String,
    touxiang:String,
    content:String
    
});

const Huifu2 = mongoose.model("huifudehuifu",huifudehuifuSchema);

module.exports = Huifu2;