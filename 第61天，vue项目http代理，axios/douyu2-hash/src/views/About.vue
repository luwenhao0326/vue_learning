<template>
    <div class="box">
        <Home :key="i" v-for="(b,i) in data1" :qwe="b" ></Home>
    </div>
</template>

<script>
import Home from './Home.vue'
export default {
    data(){
        return{
            data1:null
        }
    },
    mounted() {
       this.$http.get("/proxy/api/RoomApi/game")
         .then(res=>{
           console.log(res)
           this.data1 = res.data.data       
        })
     },
    components:{
        Home
    }
}
</script>

<style scoped>
   
	#app{
		width:100%;
		
	}
    .box{
        display:flex;
		flex-wrap:wrap;
    }
    
</style>