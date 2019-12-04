$("body").delegate("#bgc-img","click",function(){
    shangchuan =  layer.open({
    title: "上传头像",
    type: 1,
    area: ['600px', '400px'],
    content: `
    <h3>上传头像</h3>
    <label for="shangchuan" id="div1"></label>
    <input type="file" id="shangchuan" accept="image/*">
    <br>
    <button id="cap-btn">上传</button>
    `
    })
})
let file;
$("body").delegate("#shangchuan","change",function(e){
    file = e.target.files[0];
    let url = URL.createObjectURL(file);
    $("#div1").css("background-image",`url(${url})`);
})
$("body").delegate("#cap-btn","click",function(e){
    e.preventDefault();
    
    let data = new FormData();
    data.append("avatar",file);
    $.ajax({
        url:"/users/upload",
        method:"POST",
        data:data,
        processData: false,
        cache:false,
        contentType:false
    })
    .then(data=>{
        mainHtml();
        panduanLogin();
        layer.close(shangchuan)
    })
})

// 退出按钮
$("body").delegate(".exit","click",function(){
    $.get("/users/exit")
    .then(res=>{
        panduanLogin();
        xianshiLogin();
    })
    
})