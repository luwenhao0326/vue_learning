<template>
    <div>
    <h1>主页</h1>
        <button @click="isShow=true">弹出actionsheet</button>
        <Actionsheet
            v-model="isShow"
            :menus="['拍照','从相册选择']"
            :show-cancel="true"
            @on-click-menu = "selectMenu"
        >
		</Actionsheet>
			 <br>
			 <XButton @click.native="alertClick">弹出alert</XButton>
			 <br>
			 <Clocker time="2018-10-13"></Clocker>
			 <br>

		<Qrcode value="zxf"></Qrcode>
        <p :key="j" v-for="(i,j) in 10">{{i}}</p>
			
    </div>
</template>

<script>
import { Actionsheet,XButton,Clocker,Qrcode,} from 'vux'
export default {
   data(){
        return{
        isShow:false
        }
    },
  	components:{
		Actionsheet,
		XButton,
		Clocker,
		Qrcode,
  	},
  	methods:{
	  	selectMenu(mk,mm){
		  	console.log(mk)
	  	},
	  	alertClick(){
			this.$vux.alert.show({title:"这是vux的alert"})
		} 
  	}
}
</script>

<style scoped>
    
</style>