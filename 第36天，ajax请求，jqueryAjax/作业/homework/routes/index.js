var express = require('express');
var router = express.Router();
var Fatie = require("../bin/DAO/blogDAO.js");


router.get("/user", (req, res) => {
	
	Fatie.find(function (err, data) {
		
			res.json({err:0,data:data})
		
		
	}).skip(req.query.yeshu*1).limit(10);
	
});

module.exports = router;
