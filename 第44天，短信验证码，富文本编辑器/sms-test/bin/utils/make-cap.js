function makeCap(){
    let str = ""
    for(let i =0;i<4;i++){
        let n = Math.floor(Math.random()*10);
        str+=n;
    }
    return str;
}

module.exports = makeCap;