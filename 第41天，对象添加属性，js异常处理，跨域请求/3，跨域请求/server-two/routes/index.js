var express = require('express');
var router = express.Router();


// 在服务器允许的情况下，可以实现跨域请求。服务器可以将某个接口设计为允许被跨域请求的接口。


// 实现跨域请求的第一种方式：使用CORS响应头：
// 浏览器在处理跨域请求时，不会直接禁止，而是先发送这个请求，得到响应之后，查看响应头中是否有 Access-Control-Allow-Origin，如果没有(说明这个接口服务器不想被跨域请求)，浏览器则直接终止请求，如果有，且值是*或者值中包含本页面的域名，则接收响应体数据并把数据交给页面的js的回调函数，如果有，但是值不是*且不包含本页面的域名，也会终止请求

// 所以，服务器的某个接口需要被跨域访问时，只需要添加CORS响应头

// 这种跨域请求机制是新技术，部分老浏览器不支持。
router.get('/api/test',(req, res)=>{
	
	res.set("Access-Control-Allow-Origin","*")

	res.json({err:0,msg:"ok"});
});



// --------------------------------------------

// 实现跨域请求的第二种方式：JSONP：json padding

// 浏览器只禁止跨域的ajax请求，不禁止非ajax跨域请求，所以前端可以先准备一个全局函数，将函数名字作为参数，创建一个script标签，把script标签的src设置为请求的接口地址，然后把script标签加入DOM，让浏览器发送这个请求，服务器收到这个请求后，使用收到的函数名和要返回的数据结合生成一段代码，将代码返回，前端收到响应之后会立刻执行这段代码。

// jsonp接口返回的是js代码只有支持jsonp的接口才能使用jsonp调用。

router.get("/api/jsonp",(req,res)=>{
	let obj = {err:0,msg:"ok"}
	// let jsonStr = JSON.stringify(obj);
	// res.send(`${req.query.callback}(${jsonStr})`)

	res.jsonp(obj);
})


// ---------------------------------------

// 第三种实现跨域请求的方式:服务器代理。

// 禁止ajax跨域请求是浏览器的特点，其他网络程序并没有禁止跨域的限制，所以网站A的页面如果想要访问网站B的接口，可以先将请求发送给网站A的服务器，网站A的服务器将请求转发给服务器B，服务器B把数据返回给服务器A，服务器A再将数据转交给网站A的页面。

router.get("/api/third",function(req,res){
	res.json({err:0,msg:"ok"});
})

0
module.exports = router;