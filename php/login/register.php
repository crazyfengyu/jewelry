<?php
    //引入公共的配置文件
    @require_once("../config.php");

    //获取传入的参数
    $username = $_GET["username"];
    $userlovename = $_GET["userlovename"];
    $usertel = $_GET["usertel"];
    $useremail = $_GET["useremail"];
    $userpwd = $_GET["userpwd"];

    $sql = "select * from userinfo  where username = '$username' or usertel = '$usertel' or useremail ='$useremail'";

    $result = mysql_query($sql);

    $obj = array();

    if(mysql_fetch_array($result)){
        $obj["code"] =0;
        $obj["msg"] = "该手机号或用户名邮箱已被使用";
    }else{
        //创建sql语句
        $sql1 = "insert into userinfo(username,userlovename,usertel,useremail,userpwd) values ('$username','$userlovename','$usertel','$useremail','$userpwd')";

            //执行sql语句
            mysql_query($sql1);

            //获取上条sql语句受影响的行数
            $count = mysql_affected_rows();

            //判断是否插入成功


            if($count>0){
                //插入成功
                $obj["code"] = 1;
                $obj["msg"] = "注册成功";
            }else{
                //插入失败
                $obj["code"] = 0;
                $obj["msg"] = "注册失败";
            }

    }


    echo json_encode($obj);

?>