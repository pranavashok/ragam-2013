<?php

//Database connection
require_once("initdb.php");

$username=$_POST['username'];
$password=$_POST['password'];
$mobile=$_POST['mobile'];
$email=$_POST['email'];

//if value inserted successyully disply success message
if(TRUE === $mysqli->query("INSERT INTO `participants` (`username`, `email`, `password`, `mobile`, `ip`) VALUES ('$username', '$email', '$password', '$mobile', '".$_SERVER['REMOTE_ADDR']."')");)
{
    echo '<div style="color:#008000; font-weight:bold;">Registred successfully..!!</div>';
}else
{
//error message
    echo '<div style="color:#c24f00; font-weight:bold;">unable to registred !!</div>';
}
?>