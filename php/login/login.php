<?php 
    //调用公共的头部
    @require_once("../config.php");

    //获取传入的参数
    $username = $_GET["username"];
    $userpwd = $_GET["userpwd"];

    //创建sql语句
    $sql = "select * from userinfo where username = '$username' or usertel = '$username' or useremail = '$username'";

    //执行sql语句
    $result = mysql_query($sql);

    //获取数据
    $item = mysql_fetch_array($result,MYSQL_ASSOC);

    $obj = array();

    if($item){
        $exitsPwd = $item["userpwd"];
        if($exitsPwd == $userpwd){
            $obj["code"] =1;
            $obj["msg"] = "登录成功";
            $obj["userid"] = $item["id"];
        }else{
            $obj["code"] = 0;
            $obj["msg"] = "登录失败";
        }
    }else{
        $obj["code"] = 0;
        $obj["msg"] = "该用户名不存在";
    }

    echo json_encode($obj);
?>