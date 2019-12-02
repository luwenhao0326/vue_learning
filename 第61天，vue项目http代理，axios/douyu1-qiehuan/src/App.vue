<template>
  <div id="app">
	<div v-show="bool" class="www">
		<div @click="qqq(i)" :key="i"   class="box"  v-for="(b,i) in arr">
			<Zhuye  :data1="b"></Zhuye>
		</div>
	</div>
	<div v-show="!bool" class="www" >
		<div class="exit" @click="exit1">后退</div>
		<div v-for="(a,i) in arr2" :key="i">
			
			<Fangjian :data2="a"></Fangjian>
		</div>
		
	</div>    
  </div>
</template>

<script>
	import Zhuye from "./views/Zhuye.vue"
	import Fangjian from "./views/fangjian.vue"
	export default{
	methods:{
		qqq(i) {
        	this.$http.get(`/proxy/api/RoomApi/live/${this.arr[i].cate_id}`)
			.then(res => {
				this.bool = false;
				console.log(res.data);
				this.arr2 = res.data.data;
			});
		},
		exit1(){
			this.bool = true;
		}
		
	},
	data(){
		return {
			arr : null,
			bool:true,
			arr2:null
		}
	},
	mounted() {
		this.$http.get("/proxy/api/RoomApi/game")
		.then(res=>{
			this.arr = res.data.data;
			
		})
	},
	components:{
		Zhuye,
		Fangjian
	}
}

</script>

<style>
	body{
		margin: 0;
	}
	.box{
		cursor: pointer;
	}
	.www{
		display: flex;
		flex-wrap: wrap;
	}
	.exit{
		width: 100%;
		height: 35px;
		background-color: aqua;
		padding-left: 15px;
		padding-top: 15px;
		cursor: pointer;
	}
	
</style>

