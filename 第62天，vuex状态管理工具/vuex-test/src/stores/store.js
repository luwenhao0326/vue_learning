// vuex，是专门为vue设计的状态管理工具，它的核心思路是将状态(数据),从组件中剥离出来，放入一个统一的仓库进行处理，所有组件都可以从仓库中提取数据，并使用仓库提供的方法修改数据


// 在vue项目中使用vuex，需要先导入vuex插件，然后创建仓库对象，最后把仓库对象注入根组件


// 由于仓库对象是很复杂的对象，所以一般写在一个js文件中，然后在main.js中导入(和vue-router一样)

import axios from 'axios'

// 1,导入并使用插件
import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);


// 2,创建仓库对象
let store = new vuex.Store({
    // state,状态，相当于仓库中的数据，格式是一个对象，对象中以键值对的形式添加数据(相当于组件中的data)
    state:{
        num:10,
        str:"hello",
        firstname:"雪峰",
        familyname:"张",
        roomList:[]
    },
    // getters,相当于仓库的计算结果，可以根据仓库中的现有数据衍生出新的数据。
    getters:{
        // getters中的函数this不是仓库对象，但是在参数中会把state传入，从而获取仓库中的数据
        fullname(state){
            return state.familyname+state.firstname
        }
    },

    // mutations,组件中数据的修改方法，组件中只应该通过提交mutation来修改数据。
    mutations:{
        numIncrease(state,value){
            state.num = value;
        },
        setRoomList(state,value){
            state.roomList = value;
        }
    },

    // mutation只能执行同步的数据修改，如果是异步修改(例如ajax请求数据),需要使用action
    actions:{
        queryRoomList(context){
            axios.get("/douyu/api/RoomApi/live")
            .then(res=>{
                // 异步获取数据完成后，不要直接修改state，通过提交mutation修改
                context.commit("setRoomList",res.data.data)
            });
        }
    }
});

export default store;

