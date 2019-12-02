<template>
	<div class="about">
		<h1>This is an about page</h1>

		<button @click="increase">增加</button>

		<input 
			type="text"
			:value="num"
			@input="numIncrease(arguments[0].target.value*1)"	
		>

		<p>{{num}}</p>
	</div>
</template>


<script>
import {mapState,mapMutations} from 'vuex';

export default {
	computed:{
		...mapState(["num"])
	},
	methods:{
		increase(){
			// 通过仓库对象的commit方法可以提交mutetion，用于修改仓库中的数据，第一个参数是mutation类型，第二个参数是附带的值。
			// this.$store.commit("numIncrease",this.num+1);
			this.numIncrease(this.num+1)
		},
		// 可以通过mapMutations直接将仓库中的mutation映射到methods中
		...mapMutations(["numIncrease"])
	}
}
</script>

<style scoped>
</style>
