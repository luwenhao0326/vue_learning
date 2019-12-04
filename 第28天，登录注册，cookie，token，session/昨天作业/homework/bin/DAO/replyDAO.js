var mongoose = require("./connection.js");


var replySchema = new mongoose.Schema({
    ip:String,
    time:Number,
    content:String,
});


var Reply = mongoose.model("reply",replySchema);

module.exports = Reply;