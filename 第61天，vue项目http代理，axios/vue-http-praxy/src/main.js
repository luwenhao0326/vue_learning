
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
Vue.config.productionTip = false;

// axios几乎在每个页面级组件都要使用，所以可以直接把他放到组件的构造函数的原型对象中，这样所有组件都可以直接访问
import axios from "axios";
Vue.prototype.$http = axios;

new Vue({
  router,
  // render: h => h(App),  和下边的功能一样
  // 在根组件的挂载点中渲染App组件
  render(h){
    return h(App)
  }
}).$mount('#app')
