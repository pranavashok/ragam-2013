<?php
require_once("initdb.php");

$ragamid = $mysqli->real_escape_string($_POST['ragamid']);
$event_id = $mysqli->real_escape_string($_POST['event']);

//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
$query = $mysqli->query("SELECT `team`.`team_id` AS team_id FROM `team` WHERE `team`.`teammember_id`='$ragamid' AND `team`.`event_id`='$event_id'");
if($query) {
	$row = $query->fetch_assoc();
	if($row!=NULL) {
		$success = 1;
		$msg = "You have already registered for this event and your Team ID is $event_id$row[team_id]";
	}
	else
		$success = 0;
}
else {
	$success = 0;
}
$result['success'] = $success;
$result['msg'] = $msg;
echo json_encode($result);
?>