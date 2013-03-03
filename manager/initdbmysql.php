<?php
require_once("manager/config.php");
$db = mysql_connect($host, $db_user, $db_password);
mysql_select_db($db_name, $db);
?>