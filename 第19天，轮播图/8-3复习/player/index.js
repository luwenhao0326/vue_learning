
var musicList = ["江南","夜空中最亮的星","半壶纱","你在终点等我"];


var currentIndex = 0;


var player = document.getElementById("player");
player.src = "music/江南.mp3";

var progressBar = document.getElementById("progress-bar");
var playBtn = document.getElementById("play");
var timeLabel = document.getElementById("time-label");

playBtn.onclick = function(){

    // audio元素对象的paused属性，表示是否暂停了
    if(player.paused){
        // audio元素对象的play方法，用于开始播放
        player.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    }else{
        // audio元素对象的pause方法，用于暂停播放
        player.pause();
        playBtn.classList.add("fa-play");
        playBtn.classList.remove("fa-pause");
    }
}

// audio的ontimeupdate事件，表示播放进度更新的事件
player.ontimeupdate = function(){
    //console.log("进度更新了");

    // audio的currentTime属性表示当前播放的事件，duration属性表示这首歌的总时间。
    progressBar.value = player.currentTime/player.duration;


    var currentMinute = Math.floor(player.currentTime/60);
    currentMinute = currentMinute<10?"0"+currentMinute:currentMinute;
    var currentSecond = Math.round(player.currentTime%60);
    currentSecond = currentSecond<10?"0"+currentSecond:currentSecond;

    timeLabel.textContent = currentMinute+":"+currentSecond+"/"+player.totalTime;
    
}

// audio对象的onloadeddata事件表示数加载完毕。
player.onloadeddata = function(){
    // console.log("加载完毕");
    var totalMinute = Math.floor(player.duration/60);
    totalMinute = totalMinute<10?"0"+totalMinute:totalMinute;
    var totalSecond = Math.round(player.duration%60);
    totalSecond = totalSecond<10?"0"+totalSecond:totalSecond;

    player.totalTime = totalMinute+":"+totalSecond;
}


var prevBtn = document.getElementById("prev");

var nextBtn = document.getElementById("next");

function nextMusic(){
    currentIndex++;
    if(currentIndex>=musicList.length){
        currentIndex = 0;
    }
    player.src = "music/"+musicList[currentIndex]+".mp3";
    player.play();
}

nextBtn.onclick = nextMusic;

prevBtn.onclick = function(){
    currentIndex--;
    if(currentIndex<0){
        currentIndex = musicList.length-1;
    }
    player.src = "music/"+musicList[currentIndex]+".mp3";
    player.play();
}

player.onended = nextMusic;
