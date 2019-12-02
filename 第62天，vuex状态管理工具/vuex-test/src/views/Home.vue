<template>
  	<div>
    	<h1>这是首页</h1>
		<p>{{num}}</p>
		<p>{{str}}</p>
		<p>{{fullname}}</p>
		<ul>
			<li :key="i" v-for="(r,i) in roomList">{{r.room_name}}</li>
		</ul>
  	</div>
</template>

<script>

// mapState辅助函数，用于将仓库中的状态(数据),映射到组件的computed中
import {mapState,mapGetters,mapActions} from 'vuex';


export default {
	// 使用了vuex之后，组件内部还可以使用data定义组件自己的数据。
	data(){
		return{

		}
	},
  	mounted() {
		// 使用了vuex插件之后，所有组件都会多一个$store属性，就是仓库对象。
		// 仓库对象中的数据在组件中不要直接使用。需要在某个组件中使用的数据，需要从组件中通过computed映射到组件中。
		console.log(this.$store);
		
		this.$store.dispatch("queryRoomList")
	},

	// 如果需要在mapState生成的computed对象中添加新的计算结果,可以使用es7的对象展开运算符
	computed:{
		// 组件自己的计算结果
		abc(){
			return 123;
		},
		// 从仓库state中映射的数据
		...mapState(["num","str","roomList"]),
		// 从仓库getters中映射的数据
		...mapGetters(["fullname"]),
	}

	// 也可以使用对象合并。
	// computed:Object.assign(mapState(["num","str"]),{
	// 	abc(){
	// 		return 123;
	// 	}
	// })
};
</script>

<style scoped>
</style>
