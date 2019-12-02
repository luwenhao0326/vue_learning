<template>
    <div class="root">
        <button @click="goback" class="backbtn" v-if="back">《返回</button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:["back"],
    methods:{
        goback(){
            history.back();
        }
    }
}
</script>

<style scoped>
    .root{
        height: 44px;
        background-color: aqua;
        text-align: center;
        line-height: 44px;
        font-size: 24px;
        color: white;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 10;
    }
    .backbtn{
        position: absolute;
        top: 7px;
        left: 0;
        height: 30px;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 18px;
    }
</style>