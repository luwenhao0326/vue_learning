const mongoose = require("./connection.js");

var fatieSchema = mongoose.Schema({
    title:String,
    biaoqian:String,
    main:String,
    user:String,
    time:Number,
    count:Number,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    // huitie:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"huifu"
    // }

})

var Fatie = mongoose.model("fatie",fatieSchema);

module.exports = Fatie;

