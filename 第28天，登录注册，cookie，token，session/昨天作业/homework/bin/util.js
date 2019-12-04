function formatTimeArray(arr){
    var now = new Date().getTime();
    var des;
    arr.forEach(function(t){
        var mistiming = now - t.time;
        mistiming/=1000;
        if(mistiming<60){
            des = "刚刚";
        }else if(mistiming<3600){
            des = Math.floor(mistiming/60)+"分钟之前";
        }else if(mistiming<24*60*60){
            des = Math.floor(mistiming/3600)+"小时之前";
        }else{
            var createDate = new Date(t.time);
            var year = createDate.getFullYear();
            var month = createDate.getMonth()+1;
            var date = createDate.getDate();
            des = year+"年"+month+"月"+date+"日";
        }
        t.time = des;
    });
}

module.exports = {formatTimeArray};