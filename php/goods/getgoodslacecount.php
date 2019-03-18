<?php 
    //引入公共的config
    @require_once("../config.php");

    //创建sql语句
    $sql = "select count(*) as count from goodsinfo where type=2";

    //执行sql语句
    $result = mysql_query($sql);

    //获取结果
    $obj = mysql_fetch_array($result,MYSQL_ASSOC);

    echo json_encode($obj);
?>