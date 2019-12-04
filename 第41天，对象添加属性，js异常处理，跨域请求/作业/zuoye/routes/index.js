var express = require('express');
var router = express.Router();
var http = require("http")

/* GET home page. */
var total;
router.post('/api/test', function (req, res) {
    console.log(req.body);
    http.get(`http://www.kuaidi100.com/query?postid=${req.body.danhao}&type=${req.body.kuaidi}`, function (resPro) {
        total = new Buffer("");
        resPro.on("data", function (d) {
            total += d;
        })
        resPro.on("end", function () {
            res.set(resPro.headers);
            res.send(total);
        })
    })
});




module.exports = router;
