<template>
    <div class="root">
        <router-link :to="'/roomlist/'+cate.cate_id">
            <img :src="cate.game_icon">
            <p>{{cate.game_name}}</p>
        </router-link>
    </div>
</template>

<script>
export default {
    props:["cate"]
}
</script>

<style scoped>
    img{
        width: 70%;
        border-radius: 50%;
    }
    .root{
        border: dotted 1px black;
        /* height: 160px; */
        width: 33.33%;
        box-sizing: border-box;
        text-align: center;
        
    }
    p{
        margin: 6px 0 10px 0;
        font-size: 5vw;
        color: grey;
    }
    a{
        padding-top: 10px;
        display: inline-block;
        width: 100%;
        text-decoration: none;
    }
</style>