
import Vue from 'vue'

import App from './App.vue'

import router from './router.js'

Vue.config.productionTip = false;



import store from "./stores/store.js"
// let mixObj = {
//   mounted() {
//     console.log("组件渲染完毕了");
//   },
// }

// Vue.mixin(mixObj);

import toWan from "./utils/filters/wan.js";

Vue.filter("toWan",toWan);

new Vue({
  el:"#app",
  router,
  store,
  render: h => h(App),

});
