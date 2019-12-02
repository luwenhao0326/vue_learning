
// 导入vue(不加./是导入模块)
import Vue from 'vue'

// 导入App组件, .vue组件是组件文件,用一个文件描述一个组件。
import App from './App.vue'

// 导入路由配置对象。
import router from './router.js'

Vue.config.productionTip = false

import axios from "axios";
Vue.prototype.$http = axios;


new Vue({
  el:"#app",
  router,
  render: h => h(App)
})
