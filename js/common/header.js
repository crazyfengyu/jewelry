//为导航栏礼物设置鼠标移动显示或隐藏下拉框
$("#gift").mouseenter(function () {
    $(".header_li_gift_show").stop(true, false).toggle(300);
    $("#gift_list02 dd").mouseenter(function () {
        var index = $(this).index();
        $("#gift_show_img li").eq(index - 1).addClass("selected").siblings().removeClass("selected");
    });
}).mouseleave(function () {
    $(".header_li_gift_show").stop(true, false).toggle(300);
});

//为导航栏婚戒设置鼠标移动显示或隐藏下拉框
$("#ring").mouseenter(function () {
    $(".header_li_gift_show1").stop(true, false).toggle(300);
    $("#gift_list01 dd").mouseenter(function () {
        var index = $(this).index();
        $("#ring_img li").eq(index - 1).addClass("selected").siblings().removeClass("selected");
    });
}).mouseleave(function () {
    $(".header_li_gift_show1").stop(true, false).toggle(300);
});

//为导航栏真爱定制设置鼠标移动显示和隐藏
$("#custom_li").mouseenter(function () {
    $(".header_li_gift_show2").stop(true, false).toggle(300);
}).mouseleave(function () {
    $(".header_li_gift_show2").stop(true, false).toggle(300);
});

//登录成功到达这个页面显示用户名
if (window.location.href.indexOf("index.html") == -1) {
    if (getCookie("userid")) {
        $.ajax({
            type: "get",
            url: "../../php/index/selectuser.php",
            data: {
                userid: getCookie("userid")
            },
            dataType: "json",
            success: function (obj) {
                showUser(obj);
            }
        });
    }
}

//封装函数显示用户信息
function showUser(obj) {
    $(".header_one").html("<a href='../login/information.html'>" + obj["username"] + "</a><a href='#' class='exit'> /注销 </a>")
}

//为注销按钮绑定事件
$(document).on("click", ".exit", function () {
    setCookie("userid", "", -7);
    window.location.reload();
});

