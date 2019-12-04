const mongoose = require("./connection.js");

const huifuSchema = new mongoose.Schema({
    author:String,
    touxiang:String,
    content:String,
    huifudehuifu:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"huifudehuifu"
    }]
    
});

const Huifu = mongoose.model("huifu",huifuSchema);

module.exports = Huifu;