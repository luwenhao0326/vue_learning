import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about2',
      component: () => import('./views/About.vue')
    },
    {
      path: '/about/:name',
      component: () => import('./views/Room.vue')
    },
    {
      path: '/',
      redirect:"/about2"
    }
  ]
})
