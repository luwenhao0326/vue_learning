

// 准备一个全局数组，用于存放请求回的学生列表
let studentArray;

// 使用一个全局变量，记录当前显示第几页
let currentPage = 0;

// 请求列表数据
function queryStudent(){
    // 请求学生列表
    // $.get("/stu/list")
    // .then(res=>{
    //     // 请求模板
    //     $.get("/templates/stu-list.html")
    //     .then(temp=>{
    //         let htmlStr = ejs.render(temp,res);
    //         $("#table-box").html(htmlStr);
    //     });
    // });

    let index = layer.load(1,{
        shade:[0.3,"#000"]
    });
    queryCondition.page = currentPage;
    let p1 = $.get("/stu/list",queryCondition);
    let p2 = $.get("/templates/stu-list.html");
    let p3 = $.get("/templates/pagination.html");
    let p4 = Promise.all([p1,p2,p3]);
    p4.then(data=>{
        studentArray = data[0].data;
        let htmlStr = ejs.render(data[1],data[0]);
        $("#table-box").html(htmlStr);
        data[0].currentPage = currentPage;
        let pageStr = ejs.render(data[2],data[0]);
        $("#page-box").html(pageStr);

        layer.close(index);

        $("#queryModal").modal("hide");
        
    });
}



// 添加学生模态框的保存按钮
$("#save-btn").on("click",function(){

    let nameReg = /^[\u4e00-\u9fa5]{2,10}$/;
    if(!nameReg.test($("#name").val())){
        layer.alert("姓名格式错误");
        return;
    }

    // 使用ajax请求发送表单数据时，需要手动从表单中取出数据，这个过程很麻烦，但是jquery提供了方法。
    // $("表单").serialize()方法，用于将表单中的数据解析为一个urlencode格式的字符串。
    let param = $("#add-form").serialize();

    // let param = $("#add-form").serializeArray();
    
    $.post("/stu/add",param)
    .then(res=>{
        
        if(!res.err){
            // 让模态框消失
            $("#addModal").modal("hide");
            // 原生表单元素的reset方法，用于重置表单，让表单中所有input会员为初始值。
            $("#add-form")[0].reset();
            // 添加学生成功之后，立刻再请求一次学生列表
            queryStudent();
        }else{
            alert("服务器异常");
        }
    })
});

// 删除按钮
$("body").delegate(".delete-btn","click",function(e){
    const index = $(this).attr("index")*1;
    // console.log(studentArray[index]._id);

    const lay = layer.confirm("确定要删除吗？",function(){
        layer.close(lay);

        $.get("/stu/delete",{_id:studentArray[index]._id})
        .then(res=>{
            layer.msg("删除成功");
            queryStudent();
        })
    });
;});

// 准备一个全局变量，记录当前需要编辑的人的索引
let stuIndex;

// 编辑按钮
$("body").delegate(".edit-icon","click",function(){
    stuIndex = $(this).attr("index")*1;
    let s = studentArray[stuIndex];
    $("#editname").val(s.name);
    $("#editage").val(s.age);
    $("#edittel").val(s.tel);
    if(s.gender=="男"){
        $("#editmale").parent().addClass("active");
        $("#editfemale").parent().removeClass("active");
    }else{
        $("#editmale").parent().removeClass("active");
        $("#editfemale").parent().addClass("active");
    }
    $("#editModal").modal("show");
});

// 编辑按钮
$("#edit-btn").on("click",function(){
    let s = studentArray[stuIndex];
    $.post("/stu/edit",{
        _id:s._id,
        age:$("#editage").val(),
        tel:$("#edittel").val()
    })
    .then(res=>{
        if(!res.err){
            layer.msg("修改成功");
            $("#editModal").modal("hide");
            queryStudent();
        }
    })
})


// 页码按钮函数
function pageBtnClick(e,i){
    e.preventDefault();
    // console.log(i);
    currentPage = i;
    queryStudent();
}

// 向右翻页
function rightBtnClick(e){
    e.preventDefault();
    currentPage++;
    queryStudent();
}

// 向左翻页
function leftBtnClick(e){
    e.preventDefault();
    currentPage--;
    queryStudent();
}


// 使用一个全局变量，记录当前页面的查询条件。
let queryCondition = {
    name:"",
    age:"",
    tel:"",
    gender:"",
    sort:""
};

// 查询按钮
$("#query-btn").on("click",function(){
    let param = $("#query-form").serialize();
    param = decodeURIComponent(param,true);
    let tem = parseUrlencode(param);
    Object.assign(queryCondition,tem);
    currentPage = 0;
    queryStudent();
    renderCondition();
});

// 页面启动之后立刻请求学生列表
queryStudent();
// 渲染条件
renderCondition();

// 页面启动后重置条件表单
$("#query-form")[0].reset();

// 条件框渲染函数
function renderCondition(){
    let temp = $("#condition-temp").html();
    // console.log(queryCondition);
    let htmlStr = ejs.render(temp,queryCondition);
    $("#condition-box").html(htmlStr);
}

// 条件删除按钮函数
function deleteCondition(k){
    queryCondition[k] = "";
    renderCondition();
    queryStudent();
}

// 年龄排序按钮函数
function sortByAge(){
    if(queryCondition.sort==1){
        queryCondition.sort = -1;
    }else{
        queryCondition.sort = 1;
    }
    
    renderCondition();
    queryStudent();
}

// urlencode解析
function parseUrlencode(str){
    let arr = str.split("&");
    let obj = {};
    arr.forEach(el => {
        let temArr = el.split("=");
        obj[temArr[0]] = temArr[1];
    });
    return obj;
}