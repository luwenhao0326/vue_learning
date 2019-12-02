<template>
    
    <div class="q2">
        <img :src="data1.game_src" alt="">
        <span>{{data1.game_name}}</span>
    </div>
      
    
</template>

<script>

export default {
    props: ["data1"],
   
};
</script>

<style scoped>
    .q2 {
    position: relative;
    width: 33.33vw;
            height: 33.33vw;
            border: solid 1px red;
            box-sizing: border-box;
            border-collapse: collapse;
    }
    img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    left: 6vw;
    top: 3vw;
    }
    span {
    width: 100%;
    position: absolute;
    left: 0;
    top: 25vw;
    font-size: 15px;
    text-align: center;
    
    }
</style>