<?php
require_once("config.php");
$uname = ""; 
$success=0;
session_start();

    $user = trim(mysqli->real_escape_string($_POST["user"]));
    $pass = mysqli->real_escape_string($_POST["pass"]);
    $pass = md5($pass);
    $result=mysqli->query("select ragID, name from participants where email='$user' and password='$pass'");
    if ($row = $result->fetch_assoc()) 
    {
	   $_SESSION['ragID'] = $row['ragID'];
	   $_SESSION['uname'] = $row['name'];
	   $success = 1;
       $msg = "Login successfull.";
    }else
    {
        $msg = "Invalid username/password.";
    }
}
$result['ragID'] = $_SESSION['ragID'];
$result['uname'] = $_SESSION['uname'];
$result['success'] = $success;
$result['msg'] = $msg;
echo json_encode($result);
?>