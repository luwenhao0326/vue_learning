<template>
    <div>
        <h1>新闻</h1>

        <input type="text" v-model.number="index">

        <Swiper 
            :list="imgs"
            :auto="true"
            :loop="true"
            v-model="index"
        >
        </Swiper>

        <Swiper>
            <SwiperItem v-for="(page,i) in pagedContent" :key="i" >
                <div class="swiper-page">
                    <div v-for="(item,j) in page" class="swiper-page-item" :key="j">
                        <img src="img/index1.png" alt="">
                        <p>{{item}}</p>
                    </div>
                </div>
            </SwiperItem>
        </Swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'vux'
export default {
    data(){
        return{
            imgs:[
                {url:"",img:"/img/a.jpg",title:"第一张"},
                {url:"",img:"/img/b.jpg",title:"第二张"},
                {url:"",img:"/img/c.jpg",title:"第三张"},
                {url:"",img:"/img/d.jpg",title:"第四张"},
            ],
            index:0,
            content:["美食","商超便利","水果","送药上门","甜品饮品","跑腿代购","大牌惠吃","签到领红包","地方美食","素食简餐"]
        }
    },
    computed:{
        pagedContent(){
            let arr = [];
            let arr2 = [];
            for(let i = 0;i<this.content.length;i++){
                arr2.push(this.content[i])
                if(arr2.length>=6){
                    arr.push(arr2)
                    arr2 = [];
                }
            }
            if(arr2.length!=0){
                arr.push(arr2)
            }
            return arr;
            
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
    .swiper-page{
        display: flex;
        flex-wrap: wrap;
    }
    .swiper-page-item{
        width: 33.33%;
        height: 90px;
        text-align: center;
    }
</style>