<?php
require_once("initdb.php");

$event_id = $mysqli->real_escape_string($_POST['event']);
$teamleader_id = $mysqli->real_escape_string($_POST['teamleader']);
$teammemberlist = $mysqli->real_escape_string($_POST['teammembers']);
$teammembers = $teammemberlist.split(",");

$query = $mysqli->query("SELECT max(team_id) FROM team WHERE event_id='$event_id'");
$row = $query->fetch_assoc();
if($row)
	$maxteamid = $row['max(team_id)'];
else
	$maxteamid = 100;
$maxteamid++;

/* Creating query to insert into table */
$string = "INSERT INTO `team` VALUES ('$event_id', '$maxteamid', '$teamleader_id', '$teammembers[0]')";
for($i = 1; $i < count($teammembers); $i++) {
	$string .= ", ('$event_id', '$maxteamid', '$teamleader_id', '$teammembers[$i]')";
}
$string .= ";"
if($mysqli->query($string)) {
	$success = 1;
	$msg = "Your team has been registered. Your Team ID is $event_id$maxteamid";
}
else {
	$success = 0;
	$msg = "Your team couldn't be created. Please ensure that none of the team members have been registered for the same event under a different team.";
}
$result['success'] = $success;
$result['msg'] = $msg;
echo json_encode($result);
?>