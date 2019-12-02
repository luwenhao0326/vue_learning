
// 导入vue
import Vue from 'vue'

// 导入app组件， .vue文件是组件文件，用一个文件描述一个组件
import App from './App.vue'

// 导入路由配置对象。
import router from './router.js'

// 开发环境用false，开发完后改成true让错误日志消失
Vue.config.productionTip = false

new Vue({
  router,
  // render: h => h(App),  和下边的功能一样
  // 在根组件的挂载点中渲染App组件
  render(h){
    return h(App)
  }
}).$mount('#app')
