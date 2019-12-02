<template>
    <div class="q2">
        <img :src="data2.room_src" alt="">
        <span class="z1">{{data2.room_name}}</span>
        <span class="z2">{{data2.nickname}}</span>
        <span class="z3">{{num}}</span>
    </div>
      
</template>

<script>
    export default {
        props: ["data2"],
        data(){
            return{
                num1:0
            }
        },
        mounted() {
            console.log(this.data2.hn*1);
            
        },
        computed:{
            num(){
                if(this.data2.hn*1>10000){
                    this.num1 = (this.data2.hn*1/10000).toFixed(2)
                    return this.num1+"万"
                }else{
                    this.num1 = this.data2.hn
                    return this.num1
                }

            }
        }
    }
</script>

<style scoped>
    .q2 {
        position: relative;
        width: 50vw;
		height: 50vw;
		border: solid 1px red;
		box-sizing: border-box;
		border-collapse: collapse;
    }
    img {
        width: 40vw;
        height: 30vw;
        text-align: center;
        border-radius: 10px;
        position: absolute;
        left: 5vw;
        top: 3vw;
    }
    .z1{
        width: 40vw;
        height: 13vw;
        position: absolute;
        left: 5vw;
        top: 35vw;
        font-size: 15px;
        overflow: hidden;
    }
    .z2{
        position: absolute;
        left: 5vw;
        top: 25vw;
        width: 20vw;
        overflow: hidden;
        color: white;
        font-size: 15px;
    }
    .z3{
        position: absolute;
        top: 25vw;
        right: 5vw;
        color: white;
        font-size: 15px;
    }
</style>