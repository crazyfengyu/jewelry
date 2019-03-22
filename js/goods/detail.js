/**
 * Created by 21213 on 2019/3/21.
 */
    //引入公共的部分
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});
$(".common_footer").load("../common/footer.html");

//获取地址框的id值
var id = window.location.search.split("=")[1];

//调用ajax获取商品详情信息
$.ajax({
    type: "get",
    url: "../../php/goods/detail.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function (obj) {
        showData(obj);
    }
});

function showData(obj) {
    var obj = obj[0];
    if (obj["code"] == 0) {
        setCookie(tip, obj["msg"], 7);
        window.location.href = "../login.retry.html";
    } else {
        $(".goodsname").html(obj["goodsname"]);
        $(".tip_detail_body p").html("商品名称:" + obj["goodsname"]);
        $(".detail_body_centent_left img").attr("src", "../../images/goods/" + obj["goodsimg"] + ".png");
        $(".tip_detail_body img").attr("src", "../../images/goods/" + obj["goodsimg"] + ".png");
        $(".detail_body_centent_left #big_shadow img").attr("src", "../../images/goods/" + obj["goodsimg"] + ".png");
        $(".detail_body_centent_right h3").html(obj["goodsname"]);
        $(".detail_body_centent_right .xl").html("购买指数:" + obj["buynum"]);
        $(".detail_body_centent_right .weight").html(obj["goodsstyle"] + "约:" + obj["goodsweight"]);
        $(".detail_body_centent_right .price").html("￥" + obj["goodsprice"] + ".00");

        var style = obj["goodsstyle"].split(",");
        var size = obj["goodssize"].split(",");
        var html1 = "";
        var html2 = "";
        $("#goodsstyle").html("");
        $("#goodssize").html("");
        for (var i = 0; i < style.length; i++) {
            html1 += "<option value=" + style[i] + ">" + style[i] + "</option>";
        }
        for (var j = 0; j < size.length; j++) {
            html2 += "<option value=" + size[j] + ">" + size[j] + "</option>";
        }
        $(html1).appendTo($("#goodsstyle"));
        $(html2).appendTo($("#goodssize"));

    }
}


//获取遮罩层最大x和y值
var maxX = $(".detail_body_centent_left").width() - $("#small_shadow").width();
var maxY = $(".detail_body_centent_left").height() - $("#small_shadow").height();
//鼠标进入显示遮罩层,鼠标离开隐藏遮罩层
$(".detail_body_centent_left").mouseenter(function (e) {
    $("#small_shadow").show();
    $("#big_shadow").show();
    //获取鼠标进入的位置
    var evt = window.event || e;
    var startX = evt.clientX * 1 + getScrollLeft();
    var startY = evt.clientY * 1 + getScrollTop();

    //获取盒子距离上面和左边的距离
    $(document).mousemove(function (e) {
        //获取鼠标移动的位置
        var evt = window.event || e;
        var endX = evt.clientX * 1 + getScrollLeft();
        var endY = evt.clientY * 1 + getScrollTop();

        $("#small_shadow").css({
            left: startX - $(".detail_body_centent_left")[0].offsetLeft,
            top: startY - $(".detail_body_centent_left")[0].offsetTop
        });

        //计算鼠标移动的距离
        var moveX = endX - startX;
        var moveY = endY - startY;


        //设置遮罩层的临界值
        //获取遮罩层的x和y
        var shadowX = $("#small_shadow").css("left");
        var shadowY = $("#small_shadow").css("top");


        x = parseInt(shadowX) * 1 + moveX - $("#small_shadow").width() / 2;
        y = parseInt(shadowY) * 1 + moveY - $("#small_shadow").height() / 2;
        if (x >= maxX) {
            x = maxX;
        }
        if (x <= 0) {
            x = 0;
        }
        if (y >= maxY) {
            y = maxY;
        }
        if (y <= 0) {
            y = 0;
        }

        $("#small_shadow").css({
            left: x,
            top: y
        });

        $("#big_shadow img").css({
            left: -x * 2,
            top: -y * 2
        });
    });
}).mouseleave(function () {
    $("#small_shadow").hide();
    $("#big_shadow").hide();
    $(document).unbind("mousemove");
});

//点击加入购物车按钮加入购物车
//判断 用户是否登录

//登录加入购物车
$("#add_car").click(function () {
    //调用ajax存入数据
    if (getCookie("userid")) {
        $.ajax({
            type: "get",
            url: "../../php/goods/buygoods.php",
            data: {
                userid: getCookie("userid"),
                goodsid: id,
                goodssize: $("#goodssize").val(),
                goodsstyle: $("#goodsstyle").val()
            },
            dataType: "json",
            success: function (obj) {
                successAdd(obj);
            }
        });
    } else {
        //没有登录跳转到登录界面
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/login.html";
    }
});

$("#add_buy").click(function () {
    if (getCookie("userid")) {
        $.ajax({
            type: "get",
            url: "../../php/goods/buygoods.php",
            data: {
                userid: getCookie("userid"),
                goodsid: id,
                goodssize: $("#goodssize").val(),
                goodsstyle: $("#goodsstyle").val()
            },
            dataType: "json",
            success: function (obj) {
                successBuy(obj);
            }
        });
    } else {
        //没有登录跳转到登录界面
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/login.html";
    }
});


function successAdd(obj) {
    if (obj["code"] == 0) {
        setCookie("tip", obj["msg"], 7);
        window.location.href = "../login/retry.html";
    } else {
        $(".tip_box").show();
        $("#result").click(function () {
            window.location.href = "./shoppingcar.html";
        });
    }
}

function successBuy(obj) {
    if (obj["code"] == 0) {
        setCookie("tip", obj["msg"], 7);
        window.location.href = "../login/retry.html";
    } else {
        window.location.href = "./shoppingcar.html";
    }
}

$(".detial_tip h3 span").click(function () {
    $(".tip_box").hide();
});

$("#close").click(function () {
    $(".tip_box").hide();
});
