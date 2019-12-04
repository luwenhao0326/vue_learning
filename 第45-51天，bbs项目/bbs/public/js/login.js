



panduanLogin();

// 登录弹出框
$("body").delegate("#login","click",(e)=>{
    e.preventDefault();
    loginTanchu();
});


// 登录点击按钮
$("body").delegate("#login-btn","click",function(e){
    e.preventDefault();
    var obj2 = $("#login-form").serialize();
    $.post("/users/login",obj2)
    .then(res=>{
        if(res.err){
            layer.alert("用户名或密码错误")
        }else{
            layer.close(login);
            panduanLogin();
            xianshiLogin();
        }
    })
});