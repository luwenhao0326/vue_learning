var mongoose = require("./connection.js");

var hhhhSchema = new mongoose.Schema({
    ip: String,
    time: String,
    main: String,
    
});

var Hhhh = mongoose.model("hhhh", hhhhSchema);

module.exports = Hhhh;