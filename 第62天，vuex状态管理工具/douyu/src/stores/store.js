import Vue from "vue";
import vuex from 'vuex'
Vue.use(vuex);

import axios from "axios";

let store = new vuex.Store({
    state:{
        arr1:[],
        arr2:[],
        isLoading:false
    },
    mutations:{
        arrOne(state,value){
            return state.arr1 = value
        },
        arrTwo(state,value){
            state.isLoading = false;
            return state.arr2 =state.arr2.concat(value) ;
        },
        // 制空数组
        arrNull(state){
            return state.arr2 = []
        },
        // 防止多次发送请求
        isLoad(state){
            return state.isLoading = true;
        }
    },
    actions:{
        queryCateList(context){
            axios.get("/douyu/api/RoomApi/game")
            .then(res=>{
                context.commit("arrOne",res.data.data);
            });
        },
        queryRoomList(context,value){
            if(value.login){
                return;
            }
            context.commit("isLoad");
            axios.get("/douyu/api/RoomApi/live/"+value.id,{
                params:{
                    limit:10,
                    offset:value.num
                }
            })
            .then(res=>{
                context.commit("arrTwo",res.data.data);
            })
            .catch(err=>{
                context.commit("arrTwo");
            })
        },
    }
})

export default store;