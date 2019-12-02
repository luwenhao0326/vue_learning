
<!-- 
  一个.vue文件就是一个组件，vue文件内容分为3部分：

  template标签，
  style标签，
  script标签

  分别表示 组件的模板，样式，配置对象

  -->

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/setting">设置</router-link>
    </div>
    <router-view/>
  </div>
</template>

<!-- .vue文件中的style标签用于设置组件样式，style标签中可以添加scoped 属性进行组件样式隔离，让style中的样式仅对本组件模板生效。 -->

<!-- 通常App组件中的style不添加scoped，用于写通用样式，而其他组件中的style需要添加scoped -->

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
