<template>
  <div id="app">
    <div>
      <router-link to="/home">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<style>

</style>


<script>
  export default {
  
  }
</script>