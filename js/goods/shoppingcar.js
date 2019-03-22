/**
 * Created by 21213 on 2019/3/21.
 */
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");

//获取所有的商品id
var list = [];


function getData() {
    $.ajax({
        type: "get",
        url: "../../php/goods/getusershoppingcar.php",
        data: {
            type: 1,
            userid: getCookie("userid")
        },
        dataType: "json",
        success: function (obj) {
            successGet(obj);
        }
    });
}

//判断用户是否登录
if (getCookie("userid")) {
    //登录显示用户购物车
    //调用ajax获取用户数据
    getData();
} else {
    //没有登录
    setCookie("backUrl", window.location.href, 7);
    window.location.href = "../login/login.html";
}

function successGet(obj) {
    $(".shoppingcar_body_body").html("");
    var price = 0;
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        $("<ul data_id=" + item["id"] + "><li class='first_li'><input type='checkbox' class='check_one'><img src='../../images/shoppingcar_del.png' alt=''/></li><li class='second_li'  goods_id=" + item["goodsid"] + "> <img src='../../images/goods/" + item["goodsimg"] + ".png' alt='' class='goodsimg fl'/> <p class='fl'>" + item["goodsname"] + "</p></li><li class='three_li'><p>" + item["goodsstyle"] + ":" + item["goodssize"] + "</p></li><li class='four_li'><button class='del'>-</button><span>" + item["num"] + "</span><button class='add'>+</button></li><li class='five_li'><p>" + item["goodsprice"] + ".00</p></li><li class='six_li'><p>" + item["goodsprice"] * item["num"] + ".00</p></li></ul>").appendTo($(".shoppingcar_body_body"));
        //price += item["goodsprice"] * item["num"];
    }
}
$(document).on("click", ".shoppingcar_body_body .second_li", function () {
    window.location.href = "./detail.html?id=" + $(this).attr("goods_id");
});
//删除按钮

$(document).on("click", ".shoppingcar_body_body .first_li img", function () {
    //点击删除按钮找到父元素
    var ul = $(this).parent().parent();
    //删除这个列表
    ul.remove();
    //调用ajax更新数据库信息
    $.ajax({
        type: "get",
        url: "../../php/goods/delusergoods.php",
        data: {
            goodid: ul.attr("data_id")
        },
        dataType: "json",
        success: function (obj) {
            successDel(obj);
        }
    });
});

function successDel(obj) {
    if (obj["code"] == 0) {
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/retry.html";
    }
}

//增加数量按钮
$(document).on("click", ".shoppingcar_body_body .four_li .del", function () {
    //获取单价
    var price = $(this).parent().next().children().html();
    //定义总价
    var sum = 0;
    //获取父元素
    var ul = $(this).parent().parent();
    //获取下一个元素
    var span = $(this).next();
    //设置span的value值减1,判断如果value值为1即点击无效
    if (span.html() <= 1) {
        span.html("1");
    } else {
        span.html(span.html() - 1);
        $(this).parent().next().next().children().html(span.html() * price + ".00   ");
        //循环计算总价
        showSumPrice();
        reviseNum(-1, ul.attr("data_id"));
    }
});

$(document).on("click", ".shoppingcar_body_body .four_li .add", function () {
    //获取单价
    var price = $(this).parent().next().children().html();
    //定义总价
    var sum = 0;
    //获取父元素
    var ul = $(this).parent().parent();
    //获取下一个元素
    var span = $(this).prev();
    //设置span的value值减1,判断如果value值为1即点击无效
    span.html(span.html() * 1 + 1);
    $(this).parent().next().next().children().html(span.html() * price + ".00");
    showSumPrice();
    reviseNum(1, ul.attr("data_id"));
});


function reviseNum(num, id) {
    //调用ajax更新数据
    $.ajax({
        type: "get",
        url: "../../php/goods/reviseusergoodsnum.php",
        data: {
            num: num,
            carId: id
        },
        dataType: "json",
        success: function (obj) {
            successRevise(obj);
        }
    });
}


function successRevise(obj, del) {
    if (obj["code"] == 0) {
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/retry.html";
    } else {
        if (del == "del") {
            $(".shoppingcar_body_body").html("");
            $(".shoppingcar_body_bottom .second_li p").html("商品应付金额：￥: 0.00");
        }
    }
}

//清空购物车
$("#clearAll").click(function () {
    $(".shoppingcar_body_body ul").each(function (i) {
        list.push($(this).attr("data_id"));
    });
    //调用ajax删除购物车数据
    $.ajax({
        type: "get",
        url: "../../php/goods/delusergoods.php",
        data: {
            goodid: list.join(",")
        },
        dataType: "json",
        success: function (obj) {
            successRevise(obj, "del");
        }
    });
});

$("#topay").click(function (e) {
    setStopPropagation(e);
    $(".car_certificate").show();
    //获取用户注册的信息
    $.ajax({
        type: "get",
        url: "../../php/index/selectuser.php",
        data: {
            userid: getCookie("userid")
        },
        dataType: "json",
        success: function (obj) {
            showName(obj);
        }
    });
    $(".car_certificate").click(function () {
        $(".car_certificate").hide();
    });
    $(".car_certificate .car_certificate_box").click(function (e) {
        setStopPropagation(e)
    });
});

function showName(obj) {
    $("#sir_name").html(obj["username"]);
    $("#man_name").val(obj["username"]);
    $("#gril_name").val(obj["userlovename"]);
    $("#woman_name").html(obj["userlovename"]);
}


$("#man_name").keydown(function () {
    if ($(this).val().length <= 8) {
        $("#sir_name").html($(this).val());
    } else {
        $(this).val($(this).val().substring(0, 8));
    }
}).keyup(function () {
    if ($(this).val().length <= 8) {
        $("#sir_name").html($(this).val());
    } else {
        $(this).val($(this).val().substring(0, 8));
    }
});

$("#gril_name").keydown(function () {
    if ($(this).val().length <= 8) {
        $("#woman_name").html($(this).val());
    } else {
        $(this).val($(this).val().substring(0, 8));
    }
}).keyup(function () {
    if ($(this).val().length <= 8) {
        $("#woman_name").html($(this).val());
    } else {
        $(this).val($(this).val().substring(0, 8));
    }
});

function showSumPrice() {
    var price = 0;
    $(".check_one").each(function () {
        if ($(this).prop("checked")) {
            price += $(this).parent().next().next().next().next().next().children("p").html() * 1;
        }
    });
    $(".shoppingcar_body_bottom .second_li p").html("商品应付金额：￥:" + price + ".00");
}

$(document).on("click", ".check_one", function () {
    var count = 0;
    $(".check_one").each(function () {
        if ($(this).prop("checked")) {
            count++;
        }
        if (count == $(".check_one").length) {
            $("#check_All").prop("checked", true);
        } else {
            $("#check_All").prop("checked", false);
        }
    });
    showSumPrice();
});


$("#submit_msg").click(function () {
    var list = [];
    $(".check_one").each(function () {
        if ($(this).prop("checked")) {
            var id = $(this).parent().parent().attr("data_id");
            list.push(id);
        }
    });

    if (list.length > 0) {
        $.ajax({
            type: "get",
            url: "../../php/pay/updateusergoods.php",
            data: {
                id: list.join(","),
                type: 2
            },
            dataType: "json",
            success: function (obj) {
                if (obj["code"] == 1) {
                    window.location.href = "./pay.html";
                } else {
                    setCookie("backUrl", window.location.href, 7);
                    window.location.href = "../login/retry.html";
                }
            }
        });
    } else {
        setCookie("tip", "请选择商品", 7);
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/retry.html";
    }
});


$("#check_All").click(function () {
    var flag = $(this).prop("checked");
    $(".check_one").each(function () {
        $(this).prop("checked", flag);
    });
    showSumPrice();
});

$("#some_del").click(function () {
    var goodidList = [];
    $(".check_one").each(function () {
        if ($(this).prop("checked")) {
            goodidList.push($(this).parent().parent().attr("data_id"));
            $(this).parent().parent().remove();
        }
    });
    showSumPrice();
    $.ajax({
        type: "get",
        url: "../../php/goods/delusergoods.php",
        data: {
            goodid: goodidList.join(",")
        },
        dataType: "json",
        success: function (obj) {
            successRevise(obj);
        }
    });
});



