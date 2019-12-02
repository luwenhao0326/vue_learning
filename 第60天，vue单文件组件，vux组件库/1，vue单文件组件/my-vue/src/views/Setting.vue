<template>
    <div>
        <h1>设置页面</h1>

        <input type="text" v-model.number="score">
        
        <!-- 组件标签上的属性在组件渲染时会被移动到组件模板的根元素上 -->
        <!-- 所以组件的模板只能有一个根元素 -->
        <star 
            v-model="score"
            color="red"
            :total="10"
            size="100px"
            :editable="true"
        ></star>
    </div>
</template>

<script>
    import Star from '@/components/Star.vue'
    export default {
        components: {
            Star
        },
        data(){
            return{
                 score:2
            }
        }
    }
</script>

<style scoped>
    
</style>