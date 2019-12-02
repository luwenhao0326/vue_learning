

<template>
  	<div id="app">
		<button @click="requestClick">发起ajax请求</button>
  	</div>
</template>


<style>
</style>

<script>

// axios是一个ajax请求工具，封装了原生的ajax请求。
// import axios from "axios"

export default{
	methods:{
		requestClick(){

			// 使用axios发起get请求。axios支持promise
			// axios.get("/proxy/apitest",{
			// 	params:{name:"zxc"}
			// })
			// .then(res=>{
			// 	console.log(res.data);
			// })


			// 发起post请求
			// axios.post("/proxy/posttest",{age:23})
			// .then(res=>{
			// 	console.log(res.data);
			// })
			

			this.$http.post("/proxy/posttest",{age:23})
			.then(res=>{
				console.log(res.data);
			})
			
		}
	}
}
</script>