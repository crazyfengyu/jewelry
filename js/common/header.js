//为导航栏礼物设置鼠标移动显示或隐藏下拉框
$("#gift").mouseenter(function () {
    $(".header_li_gift_show").stop(true, true).toggle(300);
    $("#gift_list02 dd").mouseenter(function () {
        var index = $(this).index();
        $("#gift_show_img li").eq(index - 1).addClass("selected").siblings().removeClass("selected");
    });
}).mouseleave(function () {
    $(".header_li_gift_show").stop(true, true).toggle(300);
});

//为导航栏婚戒设置鼠标移动显示或隐藏下拉框
$("#ring").mouseenter(function () {
    $(".header_li_gift_show1").stop(true, true).toggle(300);
    $("#gift_list01 dd").mouseenter(function () {
        var index = $(this).index();
        $("#ring_img li").eq(index - 1).addClass("selected").siblings().removeClass("selected");
    });
}).mouseleave(function () {
    $(".header_li_gift_show1").stop(true, true).toggle(300);
});

//为导航栏真爱定制设置鼠标移动显示和隐藏
$("#custom_li").mouseenter(function () {
    $(".header_li_gift_show2").stop(true, true).toggle(300);
}).mouseleave(function () {
    $(".header_li_gift_show2").stop(true, true).toggle(300);
});