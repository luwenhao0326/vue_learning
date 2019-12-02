<template>
    <div :style="colorStyle" class="star-root" :title="'评分:'+value">
            <div class="star-box">
                <span 
                    class="star-span" 
                    v-for="b in total"
                    @click="starClick(b)"
                    :style="starStyle"
                >☆</span>
            </div>
            <div class="star-box" :style="boxSytle">
                <span 
                    class="star-span" 
                    v-for="b in total"
                    @click="starClick(b)"
                    :style="starStyle"
                >★</span>
            </div>
        </div>
</template>

<script>
    export default{
        props:{
            value:Number,
            color:String,
            total:{
                default:5
            },
            size:{
                type:String,
                default:"50px"
            },
            editable:{
                type:Boolean,
                default:true
            }

        },
        computed:{
            boxSytle(){
                return {
                    width:this.value*parseFloat(this.size)*0.8+"px"
                }
            },
            colorStyle(){
                return{
                    color:this.color?this.color:"gold"
                }
            },
            starStyle(){
                return{
                    width:this.size,
                    height:this.size,
                    "line-height":this.size,
                    "font-size":parseFloat(this.size)+10+this.size.replace(/\d/g,""),
                    margin:"0 -"+parseFloat(this.size)/10+this.size.replace(/\d/g,""),
                }
            }
        },
        methods:{
            starClick(i){
                if(this.editable){
                this.$emit("input",i);
                }
            }
        }
    }
</script>

<style scoped>
        .star-span{
            display: inline-block;
            
            text-align: center;
            overflow: hidden;
            cursor: default;
        }
        .star-root{
            position: relative;
            -moz-user-select: none;
            user-select: none;
        }
        .star-box{
            position: absolute;
            left: 29%;
            top: 0;
            white-space: nowrap;
            overflow: hidden;
        }
    </style>