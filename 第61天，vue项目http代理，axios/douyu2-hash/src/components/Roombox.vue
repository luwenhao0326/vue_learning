<template>
    <div class="box">
    
        <img :src="data3.room_src"> 
        <span class="q1">{{data3.room_name}}</span>
        <span class="q2">{{data3.nickname}}</span>
        <span class="q3">{{num}}</span>
        
    </div>
</template>

<script>
export default {
    props:["data3"],
    data(){
        return{
            num1:null
        }
    },
    computed:{
        num(){
            if(this.data3.online*1>10000){
                this.num1 = (this.data3.online*1/10000).toFixed(2)+"万"
                return this.num1
            }else{
                return this.num1=this.data3.online*1
            }
        }
    }
}
</script>

<style scoped>
    .box{
        width:50vw;
        height:45vw;
        /* border:solid 1px black; */
        box-sizing:border-box;
        position:relative;
    }
    img{
        width:40vw;
        height:30vw;
        position:absolute;
        left:6.15vw;
        top:3vw;
        border-radius:10px;
    } 
    .q1{
        position:absolute;
        left:6.15vw;
        top:35vw;
        font-size:10px;
    }
    .q2{
       position:absolute;
        left:8vw;
        top:27vw;
        font-size:10px; 
        color:white;
    }
    .q3{
       position:absolute;
        right:4vw;
        
        top:27vw;
        font-size:10px; 
        color:white;
    }
</style>