import Vue from 'vue'
import Router from 'vue-router'

// 在单文件项目中使用路由插件(任何插件)，必须使用Vue.use进行注册
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/about', 
      component: () => import('./views/About.vue')
    },
  ]
})
