<?php 
    //引入公共的config
    @require_once("../config.php");
    $price1 = $_GET["price1"];
    $price2 = $_GET["price2"];

    //创建sql语句
    $sql = "SELECT count(*) as count from goodsinfo WHERE goodsprice BETWEEN $price1 and $price2";


    //执行sql语句
    $result = mysql_query($sql);

    //获取结果
    $obj = mysql_fetch_array($result,MYSQL_ASSOC);

    echo json_encode($obj);
?>