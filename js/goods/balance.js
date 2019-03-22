/**
 * Created by 21213 on 2019/3/21.
 */
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");

var price = 0;
var list = [];

//调用ajax获取该用户的商品列表
$.ajax({
    type: "get",
    url: "../../php/goods/getusershoppingcar.php",
    data: {
        type: 2,
        userid: getCookie("userid")
    },
    dataType: "json",
    success: function (obj) {
        showGoods(obj);
    }
});

function showGoods(obj) {
    $(".balance_body").html("");
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        $("<ul><li class='second_li'><img src='../../images/goods/" + item["goodsimg"] + ".png' alt='' class='goodsimg fl'/><p class='fl'>" + item["goodsname"] + "</p></li><li class='three_li'><p>" + item["goodssize"] + item["goodsstyle"] + "</p></li><li class='four_li'><span>" + item["num"] + "</span></li><li class='five_li'><p>" + item["goodsprice"] + ".00</p></li><li class='six_li'><p>" + item["goodsprice"] * item["num"] + ".00</p></li></ul>").appendTo($(".balance_body"));
        price += item["goodsprice"] * item["num"];
        list.push(item["id"]);
    }
    $(".balance_bottom_p").html("购物金额小计:￥：" + price + ".00");
    $(".sumpay p").html("应付款金额：￥:" + price + ".00");
}

//获取收货人信息
$.ajax({
    type: "get",
    url: "../../php/pay/selectaddress.php",
    data: {
        userid: getCookie("userid")
    },
    dataType: "json",
    success: function (obj) {
        showAddress(obj);
    }
});

function showAddress(obj) {
    $("#address_name").html(obj["username"]);
    $("#address_code").html(obj["userzipcode"]);
    $("#address_phone").html(obj["userphone"]);
    $("#address_msg").html(obj["useraddress"]);
}


$("#submit_buy").click(function () {
    if ($(".balance_bottom_body .pay input").prop("checked") == true) {
        $.ajax({
            type: "get",
            url: "../../php/pay/updateusergoods.php",
            data: {
                id: list.join(","),
                type: 3
            },
            dataType: "json",
            success: function (obj) {
                if (obj["code"] == 1) {
                    window.location.href = "./topay.html?price=" + price;
                } else {
                    setCookie("backUrl", window.location.href, 7);
                    window.location.href = "../login/retry.html";
                }
            }
        });
    }
});
