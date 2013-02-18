$username=$_POST['username'];
$password=$_POST['password'];
$mobile=$_POST['mobile'];
$email=$_POST['email'];

//Database connection
require_once("config.php");

//mysql query to insert value to database
$query=mysql_query("INSERT INTO registration (`id`, `username`, `date`, `email`, `password`, `mobile`, `ip`) VALUES ('', '$username', '".date('d-m-Y')."', '$email', '$password', '$mobile', '".$_SERVER['REMOTE_ADDR']."')");

//if value inserted successyully disply success message
if($query)
{
    
    echo '<div style="color:#008000; font-weight:bold;">Registred successfully..!!</div>';
}else
{
//error message
    echo '<div style="color:#c24f00; font-weight:bold;">unable to registred !!</div>';
}