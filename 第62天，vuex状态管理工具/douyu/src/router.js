import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CateList from "./views/CateList.vue";
import RoomList from "./views/RoomList.vue";

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/main',
            component: CateList
        },
        {
            path: '/roomlist/:cateid',
            component: RoomList
        },
        {
            path: "/",
            redirect: "/main"
        }
    ]
})
