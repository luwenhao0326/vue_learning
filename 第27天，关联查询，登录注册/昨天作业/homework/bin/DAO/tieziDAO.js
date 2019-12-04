var mongoose = require("./connection.js");


var tieziSchema = new mongoose.Schema({
    ip:String,
    time:Number,
    content:String,
    replies:Array
});


var Tiezi = mongoose.model("tiezi",tieziSchema);

module.exports = Tiezi;
