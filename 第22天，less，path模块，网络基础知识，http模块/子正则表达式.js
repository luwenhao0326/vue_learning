var str = "adad111adaw<b>123</b>sfuasfaf<b>999</b>fasfafw<b>343</b>asfaf<b>232</b>dsf";

var reg = /<b>(\d{3})<\/b>/g;

var result ;
while(result = reg.exec(str)){
    console.log(result);
    
}


