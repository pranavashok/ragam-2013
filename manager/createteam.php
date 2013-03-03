<?php
require_once("initdb.php");
$success = 0;
$event_id = $mysqli->real_escape_string($_POST['event']);
$teamleader_id = $mysqli->real_escape_string($_POST['teamleader']);
$teammemberlist = $mysqli->real_escape_string($_POST['teammembers']);
$teammembers = explode(",", $teammemberlist);
$numpart = count($teammembers);

$q1 = $mysqli->query("SELECT min_part, max_part FROM eventinfo WHERE event_id='$event_id'");
$r1 = $q1->fetch_assoc();


if($numpart <= $r1['max_part'] && $numpart >= $r1['min_part'] || ($numpart >= $r1['min_part'] && $r1['max_part'] == -1))
{
	$query = $mysqli->query("SELECT max(team_id) AS maxteamid FROM team WHERE event_id='$event_id'");
	$row = $query->fetch_assoc();
	if($row['maxteamid']!=NULL)
		$maxteamid = $row['maxteamid'];
	else
		$maxteamid = 100;
	$maxteamid++;

	/* Creating query to insert into table */
	$string = "INSERT INTO `team` (`event_id`, `team_id`, `teamleader_id`, `teammember_id`) VALUES ('$event_id', '$maxteamid', '$teamleader_id', '$teamleader_id')";

	for($i = 0; $i < $numpart-1; $i++) {
		$string .= ", ('$event_id', '$maxteamid', '$teamleader_id', '$teammembers[$i]')";
	}
	$string .= ";";

	if($mysqli->query($string) === TRUE) {
		$success = 1;
		$msg = "Your team has been registered. Your Team ID is $event_id$maxteamid";
	}
	else 
		$msg = "Your team couldn't be created. Please ensure that none of the team members have been registered for the same event under a different team.";
}else
{
	if($r1['min_part'] == NULL)
		$msg = "Please select an event from above before pressing enter";
	else if($r1['min_part'] == $r1['max_part'])
		$msg = "Number of team members should be ".$r1['min_part'];
	else if($r1['max_part']==-1)
		$msg = "Number of team members should be greater than ".$r1['min_part'];
	else
		$msg = "Number of team members should be between ".$r1['min_part']." and ".$r1['max_part'];
}
$result['success'] = $success;
$result['msg'] = $msg;
echo json_encode($result);
?>