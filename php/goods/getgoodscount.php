<?php 
    //���빫����config
    @require_once("../config.php");

    //����sql���
    $sql = "select count(*) as count from goodsinfo where type=1";

    //ִ��sql���
    $result = mysql_query($sql);

    //��ȡ���
    $obj = mysql_fetch_array($result,MYSQL_ASSOC);

    echo json_encode($obj);
?>