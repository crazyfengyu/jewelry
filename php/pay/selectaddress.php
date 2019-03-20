<?php 
    @require_once("../config.php");

    $userid = $_GET["userid"];

    $sql = "select * from useraddress where userid = $userid";

    $result = mysql_query($sql);

    $item = mysql_fetch_array($result,MYSQL_ASSOC);

    echo json_encode($item);
?>