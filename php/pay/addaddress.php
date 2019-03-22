<?php 
    //调用公共的config.php文件
    @require_once("../config.php");

    //获取用户传入的数据
    $userid = $_GET["userid"];
    $username = $_GET["username"];
    $userphone = $_GET["userphone"];
    $useraddress = $_GET["useraddress"];
    $userzipcode = $_GET["userzipcode"];
    $usertel = $_GET["usertel"];

    $sql = "select * from useraddress where userid = $userid";

    //执行sql语句
    $result = mysql_query($sql);

    $item = mysql_fetch_array($result);

    $obj = array();
    if(!$item){
        //创建sql插入数据
        $sql1 = "insert into useraddress (userid,username,userphone,useraddress,userzipcode,usertel) values ($userid,'$username',$userphone,'$useraddress',$userzipcode,$usertel)";

            mysql_query($sql1);

            //获取上一条sql语句影响的行数
            $count = mysql_affected_rows();

            //判断结果
            if($count>0){
                $obj["code"] =1;
                $obj["msg"]="创建成功!";
            }else{
                $obj["code"] =0;
                $obj["msg"]="网络繁忙，请稍后重试!";
            }
    }



    echo json_encode($obj);

?>