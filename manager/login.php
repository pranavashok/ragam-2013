<?php
require_once("initdb.php");
$success=0;
session_start();
//if($_POST["email"])
//{
    $user = $mysqli->real_escape_string($_POST["email"]);
    $pass = $mysqli->real_escape_string($_POST["password"]);
    $pass = md5($pass);
    $result = $mysqli->query("SELECT ragID, name FROM participants WHERE email='$user' AND password='$pass'");
    
    if ($row = $result->fetch_assoc()) 
    {
	   $_SESSION['ragID'] = $row['ragID'];
	   $_SESSION['uname'] = $row['name'];
	   $success = 1;
       $msg = "Login successfull!";
    }else
    {
        $msg = "Invalid username / password.";
    }
//}else
//{
    //redirect
//}
    
$results['ragID'] = $_SESSION['ragID'];
$results['uname'] = $_SESSION['uname'];
$results['success'] = $success;
$results['msg'] = $msg;
echo json_encode($results);
?>