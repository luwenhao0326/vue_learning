var mongoose = require("./connection.js");

var huifuSchema = mongoose.Schema({
    name:String,
    time:Number,
    main:String,
    yuantie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fatie"
    }

})

var Huifu = mongoose.model("huifu",huifuSchema);

module.exports = Huifu;