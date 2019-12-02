import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


// 导入仓库对象并在根组件中注入
import store from "./stores/store.js"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
