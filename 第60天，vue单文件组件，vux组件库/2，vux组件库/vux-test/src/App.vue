

<template>
  <div id="app">
	
		<keep-alive>
			<router-view class="router-view"></router-view>
		</keep-alive>
		<tabbar>
			<tabbar-item 
				link="/home" 
				:selected="$route.path=='/home'"
			>
				<img slot="icon" src="/img/index1.png">
				<span slot="label">主页</span>
			</tabbar-item>
			<tabbar-item 
				show-dot link="/chat" 
				:selected="$route.path=='/chat'"
			>
				<img slot="icon" src="/img/index2.png">
				<span slot="label">聊天</span>
			</tabbar-item>
			<tabbar-item 
				:selected="$route.path=='/news'" 
				link="news"
			>
				<img slot="icon" src="/img/index3.png">
				<span slot="label">新闻</span>
			</tabbar-item>
			<tabbar-item 
				badge="2" 
				link="/setting" 
				:selected="$route.path=='/setting'"
			>
				<img slot="icon" src="/img/index4.png">
				<span slot="label">设置</span>
			</tabbar-item>
		</tabbar>
  </div>
</template>

<script>


// vux中某些组件支持以vue插件的形式使用
import Vue from "vue"
import { AlertPlugin } from "vux";
Vue.use(AlertPlugin);

import { 
	Tabbar,
	TabbarItem,
	} from 'vux'

export default{
  	components:{
		Tabbar,
		TabbarItem,
  	},
}
</script>

<style>
	*{
		margin:0;
	}
	.router-view{
		height:calc(100vh - 50px);
		overflow-y:scroll;
	}
</style>
