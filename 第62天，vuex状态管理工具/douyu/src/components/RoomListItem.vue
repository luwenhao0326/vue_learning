<template>
    <div class="root">
        <div 
            :style="{'background-image':'url('+room.room_src+')'}"
            class="room-img"
        >
            <span class="nick-name">{{room.nickname}}</span>
            <span class="online">{{room.online|toWan}}</span>
        </div>
        <p>{{room.room_name}}</p>
    </div>
</template>

<script>
export default {
    props:["room"]
}
</script>

<style scoped>
    .root{
        width: 160px;
        height: 150px;
        padding: 10px;
    }
    .room-img{
        height: 90px;
        position: relative;
        background-size: 100% 100%;
    }

    span{
        color: white;
        font-size: 10px;
        position: absolute;
        bottom: 4px;
        text-shadow: 0 0 4px black;
    }
    .nick-name{
        left: 4px;
    }
    .online{
        right: 4px;
    }
    p{
        margin: 10px 0;
        font-size: 14px;
        color: grey;
    }
</style>