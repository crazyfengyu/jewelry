<?php 
    //引入公共的文件
    @require_once("../config.php");
    
    //获取传入的数据
    $jumpData = $_GET["jumpData"];
    $showData = $_GET["showData"];

    //创建sql语句
    $sql = "select * from goodsinfo where type= 5  limit $jumpData,$showData";

    //执行sql语句
    $result = mysql_query($sql);

    //循环拿到数据
    $obj = array();

    while($item = mysql_fetch_array($result,MYSQL_ASSOC)){
        $obj[] = $item;
    }

    echo json_encode($obj);
?>