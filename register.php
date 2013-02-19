<?php
//=============Configuring Server and Database=======
$host        =    'localhost';
$user        =    'root';
$password    =    '';
//=============Data Base Information=================
$database    =    'ragam_reg';
 
$conn        =    mysql_connect($host,$user,$password)  or die('Server Information is not Correct'); //Establish Connection with Server
if($conn)
{
    
    echo '<div style="color:#008000; font-weight:bold;">Connection success..!!</div>';
}else
{
//error message
    echo '<div style="color:#c24f00; font-weight:bold;">connection fail !!</div>';
}
$b=mysql_select_db($database,$conn) 
or die('Database Information is not correct');

if($b)
{
    
    echo '<div style="color:#008000; font-weight:bold;">database ok!</div>';
}else
{
//error message
    echo '<div style="color:#c24f00; font-weight:bold;">thepp !!</div>';
}


 
//===============End Server Configuration============
 
//=============Starting Registration Script==========
 
$fullname=$_POST['fullname'];
 
$email=$_POST['email'];

$password=$_POST['password'];
 
$college=$_POST['college'];

$phone=$_POST['phone'];



 
//=============To Encrypt Password===================
$password    =    md5($password);
//============New Variable of Password is Now with an Encrypted Value========
 
 $query = mysql_query("SELECT ragID from participants ORDER BY ragID DESC LIMIT 1");

 $row = mysql_fetch_assoc($query);
$maxragid = $row['ragID'];
$maxragid++;
 $query = mysql_query("INSERT INTO participants (`ragID`, `name`, `email`, `password`, `fb_tocken`, `college`, `phone`, `accommodation`, `timestamp`, `ip`) VALUES ( '$maxragid', '$fullname', '$email', '$password', '', '$college', '$phone', '', '".date('d-m-Y')."', '".$_SERVER['REMOTE_ADDR']."')");
//$query = mysql_query ("INSERT INTO participants (name, email, password, college, phone) VALUES( '$fullname', '$email', '$password', '$college', '$phone')"); 

//mysql_query("query");

if($query)
{
    
    echo '<div style="color:#008000; font-weight:bold;">Registred successfully..!!</div>';
}else
{
//error message
    echo '<div style="color:#c24f00; font-weight:bold;">unable to register !!</div>';
}


echo  'Hi' .$fullname. 'welcome to the ragam website'; 
echo  $_POST["email"];

print("Registration Succeful");
 
?>