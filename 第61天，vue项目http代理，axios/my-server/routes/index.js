var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get("/apitest", function (req, res) {
	console.log(req.query);
	
	res.json({
		err:0,
		msg:"ok"
	});
})

router.post("/posttest",function (req,res) {
	console.log(req.body);
	res.json({
		err:0,
		msg:"postok"
	});
})

module.exports = router;
