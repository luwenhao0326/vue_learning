var express = require('express');
var router = express.Router();

// 不返回页面，而直接返回数据的接口一般都是ajax接口，前端使用ajax请求调用。
router.post("/test", (req, res) => {
	console.log(req.body);

	const arr = [
		{name:"三国演义",price:23},
		{name:"水浒传",price:11}
	];
	// 服务端从数据库查询到的数据（数组，对象），不能直接返回给前端，必须先进行对象序列化。

	// ajax接口返回的JSON数据，约定俗称都以对象开头。而且一般要包含一个err状态码，0表示成功
    // const jsonStr = JSON.stringify({err:0,data:arr});
	// res.send(jsonStr);

	// res.json，将参数对象解析为json字符串并返回，而且设置本次响应的Content-Type为application/json
	res.json({err:0,data:arr});

})

router.get("/get-test",(req,res)=>{
	res.json({err:0,data:"这是get接口的数据"});
});

module.exports = router;
