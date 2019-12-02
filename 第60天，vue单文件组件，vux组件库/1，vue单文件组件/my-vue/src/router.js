import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Setting from './views/Setting.vue'

// 在单文件项目中使用路由插件(任何插件)，必须使用Vue.use进行注册
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 异步组件加载 
      component: () => import('./views/About.vue')
    },
    {
      path: '/setting',
      component: Setting
    },
  ]
})
