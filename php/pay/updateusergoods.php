<?php 
    //引入公共的config.php文件
    @require_once("../config.php");

    //获取数据id
    $id = $_GET["id"];
    $type = $_GET["type"];

    //创建sql语句
    $sql = "update usergoods set type = $type where id in ($id)";

    //执行sql语句
    mysql_query($sql);

    //获取上一条sql语句影响的条数
    $count = mysql_affected_rows();

    $obj = array();

    if($count>0){
        $obj["code"] =1;
        $obj["msg"]="提交订单成功";
    }else{
        $obj["code"] =0;
        $obj["msg"] = "网络繁忙，请稍后重试!";
    }

    echo json_encode($obj);

?>