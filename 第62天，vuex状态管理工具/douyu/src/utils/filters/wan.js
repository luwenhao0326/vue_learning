function toWan(value){
    if(!value){
        return 0;
    }

    if(value<10000){
        return value;
    }else{
        return (value/10000).toFixed(2)+"万";
    }
}


export default toWan;