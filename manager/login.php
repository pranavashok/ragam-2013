<?php
require_once("initdb.php");
$success=0;

//if($_POST["email"])
//{
    $user = $mysqli->real_escape_string($_POST["email"]);
    $pass = $mysqli->real_escape_string($_POST["password"]);
    $pass = md5($pass);
    $result = $mysqli->query("SELECT ragID, name, college, active FROM participants WHERE email='$user' AND password='$pass'");
    
    if ($row = $result->fetch_assoc()) 
    {
        if($row['active']==1)
        {
	       $_SESSION['ragID'] = $row['ragID'];
	       $_SESSION['uname'] = $row['name'];
           $_SESSION['college'] = $row['college'];
	       $success = 1;
           $results['ragID'] = $_SESSION['ragID'];
            $results['uname'] = $_SESSION['uname'];
           $msg = "Login successfull!";
        }else
        {
            $success = 2;
            $msg = "Verify your account before logging in.";
        }
    }else
    {
        $success = 2;
        $msg = "Invalid username or password.";
    }
//}else
//{
    //redirect
//}
    

$results['success'] = $success;
$results['msg'] = $msg;
echo json_encode($results);
?>