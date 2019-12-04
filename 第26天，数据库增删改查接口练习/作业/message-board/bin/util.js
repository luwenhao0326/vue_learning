function getTimeStr(time){
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();

    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    hour = hour<10?"0"+hour:hour;
    minute = minute<10?"0"+minute:minute;
    second = second<10?"0"+second:second;

    return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second;
}


module.exports = {
    getTimeStr
};
