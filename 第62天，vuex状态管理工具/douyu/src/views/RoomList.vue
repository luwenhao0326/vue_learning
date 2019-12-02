<template>
    <div class="page-root" @scroll="pageScroll">
        <MyHeader :back="true">房间列表</MyHeader>
        <div class="room-list">
            <RoomListItem
                v-for="(r,i) in arr2"
                :room="r"
                :key="i"
            ></RoomListItem>

            <div 
                class="placeholder" 
            ></div>
            <div 
                class="placeholder" 
            ></div>

            
        </div>
    </div>
</template>

<script>
import MyHeader from "../components/MyHeader.vue";
import RoomListItem from "../components/RoomListItem.vue"
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
    data(){
        return {
            num :0,
        }
    },
    components:{
        MyHeader,
        RoomListItem
    },
    activated() {
        this.arrNull();
        let obj = {
            id:this.$route.params.cateid,
            num:this.num,
            login:this.isLoading
        }
        this.queryRoomList(obj);
    },
    computed:{
		...mapState(["arr2","isLoading"])
    },
    methods:{
        ...mapActions(["queryRoomList"]),
        ...mapMutations(["arrNull"]),
        pageScroll(e){
            this.num = this.arr2.length;
            if(e.target.scrollHeight-e.target.offsetHeight-100<=e.target.scrollTop){
                let obj = {
                    id:this.$route.params.cateid,
                    num:this.num,
                    login:this.isLoading
                }
                this.queryRoomList(obj);
            }
        }
    },
}
</script>

<style scoped>
    .room-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .placeholder{
        width: 160px;
        height: 1px;
        padding: 10px;
    }
</style>