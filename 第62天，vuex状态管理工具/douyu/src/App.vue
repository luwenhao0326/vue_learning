<template>
    <div id="app">
        
        <keep-alive>
            <router-view/>
        </keep-alive>
        

    </div>
</template>

<style>
    body{
        margin: 0;
    }

    .page-root{
        height: calc(100vh - 44px);
        overflow-y: scroll;
        padding-top: 44px;
    }
</style>

<script>
    export default {

    }
</script>