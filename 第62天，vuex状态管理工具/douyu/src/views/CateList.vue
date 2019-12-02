<template>
    <div class="page-root">
        <MyHeader>分类</MyHeader>

        <div class="cate-list">
            <CateListItem
                v-for="(c,i) in arr1"
                :cate="c"
                :key="i"
            >
            </CateListItem>
        </div>

    </div>
</template>

<script>

import MyHeader from "../components/MyHeader.vue";
import CateListItem from "../components/CateListItem.vue";
import {mapState,mapActions} from 'vuex';
export default {
   
    components:{
        MyHeader,
        CateListItem
    },
    mounted() {
        this.queryCateList();
    },
    computed:{
		...mapState(["arr1"])
	},
    methods:{
        ...mapActions(["queryCateList"])
    }
}

</script>

<style scoped>
    .cate-list{
        display: flex;
        flex-wrap: wrap;
    }
</style>