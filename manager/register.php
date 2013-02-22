<?php
require_once("initdb.php");
$fullname = $mysqli->real_escape_string($_POST['fullname']);
$email = $mysqli->real_escape_string($_POST['email']);
$password = $mysqli->real_escape_string($_POST['password']);
$college = $mysqli->real_escape_string($_POST['college']);
$phone = $mysqli->real_escape_string($_POST['phone']);

$success = 0;
$msg = "";
if(strlen($fullname)<3)
	$msg="Full name must be atleast 3 characters long.";
else if(!filter_var($email, FILTER_VALIDATE_EMAIL))
	$msg="Enter a valid email id.";
else if(strlen($password)<4)
	$msg="Password must be atleast 4 characters long.";
else if(strlen($college)<2)
	$msg="Invalid college name";
else if(strlen($phone)<9)
	$msg="Invalid phone number.";
else
{
	$password = md5($password);
 	$query = $mysqli->query("SELECT ragID from participants ORDER BY ragID DESC LIMIT 1");
	$row = $query->fetch_assoc();
 	if($row)
		$maxragid = $row['ragID'];
 	else
 		$maxragid = 1000;
	$maxragid++;
 	$query = $mysqli->query("INSERT INTO participants (`ragID`, `name`, `email`, `password`, `fb_token`, `college`, `phone`, `accommodation`, `timestamp`, `ip`) VALUES ( '$maxragid', '$fullname', '$email', '$password', '', '$college', '$phone', '', '".date('d-m-Y')."', '".$_SERVER['REMOTE_ADDR']."')");
	if($query)
	{
		$msg = "Thank you for registering! Your ragam id is RAG".$maxragid.".";
		$success = 1;
		

		/* Mail */
		$headers = 'From:no-reply@ragam.org.in' . "\r\n"; // Set from headers
		$to      = $email; // Send email to our user
		$subject = 'Ragam \'13 Signup Confirmation'; // Give the email a subject
		$message = '
		
Thank You for signing up on Ragam \'13!
Your account has been created! Please note down your Ragam ID for future reference.
	------------------------
	Your Name: '.$fullname.'
	Ragam ID: RAG'.$maxragid.'
	------------------------

Regards,
Ragam \'13 Registration Team
';
		if(mail($to, $subject, $message, $headers)){ // Send our email
			$msg = $fullname.", you have been registered. <br/>";
			$msg .= "Your Ragam ID is RAG".$maxragid."<br/>Please check your mail for confirmation";
		}else{
			$msg = 'Sorry, the register feature is not working now. Try again later.'; 
			$query = $mysqli->query("DELETE FROM participants WHERE ragID = '$maxragid';");
		}		
	}
	else
		$msg = 'Sorry, the registration feature is unavailable as of now.'; //"Error. Please try again later.";
}
$result['success']=$success;
$result['msg']=$msg;
echo json_encode($result);
?>