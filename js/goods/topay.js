/**
 * Created by 21213 on 2019/3/21.
 */
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");

var price = window.location.search.split("=")[1];

$("#price").html(price + ".00元");