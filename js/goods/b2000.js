/**
 * Created by 21213 on 2019/3/21.
 */
//获取地址栏信息
var search = window.location.search;
var result = search.substring(1);
var list = result.split("&");
var parlist = [];
for (var i = 0; i < list.length; i++) {
    var item = list[i];
    parlist.push(item.split("="));
}

var price1 = parlist[0][1];
var price2 = parlist[1][1];


var showNum = 12;
var pageIndex = 1;

//引入公共头部和底部
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");

getData(pageIndex, showNum);

//调用ajax获取后台商品数据
function getData(pageIndex, showNum) {
    $.ajax({
        type: "get",
        url: "../../php/goods/selectgoodsb2000.php",
        data: {
            jumpData: (pageIndex - 1) * showNum,
            showData: showNum,
            price1: price1,
            price2: price2
        },
        dataType: "json",
        success: function (obj) {
            showGoods(obj);
        }
    });
}

//封装函数显示商品
function showGoods(obj) {
    $(".handseries_body_content").html("");
    for (var i = 0; i < obj.length; i++) {
        var goods = obj[i];
        $("<li class='goods_click' data_id='" + goods["id"] + "'><img src='../../images/goods/" + goods["goodsimg"] + ".png' /><a href='#'>" + goods["goodsname"] + "￥" + goods["goodsprice"] + "</a></li>").appendTo($(".handseries_body_content"));
    }

}
//调用函数显示总条数
showGoodsCount();

function showGoodsCount() {
    $.ajax({
        type: "get",
        url: "../../php/goods/getgoodsb2000count.php",
        data: {
            price1: price1,
            price2: price2
        },
        dataType: "json",
        success: function (obj) {
            showNumPage(obj);
        }
    });
}

//封装函数显示总商品数和翻页
function showNumPage(obj) {
    $("<p class='p1'>总计" + obj["count"] + "个真爱礼物 <div id='box'></div></p>").appendTo($(".handseries_body .w"));
    update(obj);
}

//封装函数更新页码
function update(obj) {
    var page = new Page("#box", {
        "next": "下一页",
        "prev": "上一页",
        "dataCount": obj["count"],
        "showNum": showNum,
        "showPage": 5,
        "callback": function (pageIndex) {
            getData(pageIndex, showNum);
        }
    });
}

//为所有的li绑定点击事件
$(document).on("click", ".goods_click", function () {
    window.location.href = "./detail.html?id=" + $(this).attr("data_id");
});
