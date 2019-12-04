var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

var books = [
	{name:"语文",price:20,sellout:true},
	{name:"数学",price:20,sellout:false},
	{name:"五年高考三年模拟",price:50,sellout:false}
];

router.get("/books", function (req, res) {
	res.render("books.ejs",{books});
})

module.exports = router;
