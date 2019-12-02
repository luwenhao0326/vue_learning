function makeRndStr() {
    let src = "qwertyuiopasdfghjklzxcvbnm";
    let str = "";
    for(let i = 0;i<4;i++){
        let ind = Math.floor(Math.random()*src.length);
        str+=src[ind];
    }
    return str;
}

// es6模块化，使用export default xxxxx 导出一个内容。

export default makeRndStr;