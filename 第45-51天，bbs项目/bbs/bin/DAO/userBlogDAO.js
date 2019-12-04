const mongoose = require("./connection.js");

const userSchema = new mongoose.Schema({
    title:String,
    content:String,
    bankuai:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    count:Number,
    huifu:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"huifu"
    }]
    
});

const Blog = mongoose.model("userBlog",userSchema);

module.exports = Blog;