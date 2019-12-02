<template>
    <div class="box">
        <router-link :to='"/about/"+qwe.cate_id'>
        <img :src="qwe.game_src"> 
        <span>{{qwe.game_name}}</span>
        </router-link>
        
    </div>
</template>

<script>
export default {
    props:["qwe"]
}
</script>

<style scoped>
    .box{
        width:33.33vw;
        height:33.33vw;
        border:dashed 1px black;
        border-left: none;
        border-top: none;
        box-sizing:border-box;
        position:relative;
        cursor: pointer;
    }
    img{
        width:20vw;
        height:20vw;
        position:absolute;
        left:6.15vw;
        top:3vw;
        border-radius:50%;
    } 
    span{
        position:absolute;
        left:6.15vw;
        top:25vw;
    }
</style>