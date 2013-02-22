<?php
    require_once("root.php");
    require_once("manager/initdb.php");
    $user = $mysqli->real_escape_string($_GET["email"]);
    $hash = $mysqli->real_escape_string($_GET["hash"]);
    $result = $mysqli->query("SELECT hash FROM participants WHERE email='$user'");
    
    if ($row = $result->fetch_assoc()) 
	   if($row['hash']===$hash)
            $res = $mysqli->query("UPDATE participants SET active=1 WHERE email='$user'");
    header("Location:/$subdir");
?>