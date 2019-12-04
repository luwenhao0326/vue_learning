var express = require('express');
var router = express.Router();
const User = require("../bin/DAO/userDAO.js")

let multer = require("multer");
let upload = multer({dest:"./public/avatars"})
/* GET users listing. */
router.post("/blog",upload.array('avatar', 12), function (req, res) {
    
    var arr = [];
    req.files.forEach(function(el,i){
        arr[i] = el.filename;
    })
    new User({
        title:req.body.avatar[0],
        content:req.body.avatar[1],
        avatar:arr
    }).save(()=>{
        User.find().sort({_id:-1})
        .then(data=>{
            res.json({err:0,msg:"ok",data:data})
        })
    })
})

router.get("/find",function(req,res){
    User.find().sort({_id:-1})
    .then(data=>{
        res.json({err:0,msg:"ok",data:data})
    })
})








module.exports = router;
