<template>
    <div class="box">
        <div class="exit" @click="exit">后退</div>
        <Roombox 
            v-for="(b,i) in data3" 
            :data3="b"
            :key="i"
        ></Roombox>
    </div>
</template>

<script>
import Roombox from '../components/Roombox.vue'
export default {
    data(){
        return{
        data3:null
        }
        
    },
    methods:{
        exit(){
            history.back()
        }
    },
    mounted() {
        let q = this.$route.params.name;
        this.$http.get(`tea/test/management/student/list/`)
         .then(res=>{
             console.log(res)
            // this.data3 = res.data.data    
        })
    },
    components:{
        Roombox
    }
}
</script>

<style scoped>
     .box{
        display:flex;
		flex-wrap:wrap;
    }
    .exit{
        width:100%;
        height:35px;
        background-color:aqua;
        padding-left:15px;
        padding-top:15px;
        cursor: pointer;
    }
</style>