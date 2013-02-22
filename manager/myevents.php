<?php
require_once("initdb.php");

$ragamid = $mysqli->real_escape_string($_GET['id']);

//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
$query = $mysqli->query("SELECT `eventinfo`.`event_name`, `team`.`team_id`, `team`.`teamleader_id`  FROM `team`, `eventinfo` WHERE `team`.`teammember_id`='$ragamid' AND `team`.`event_id`=`eventinfo`.`event_id`");
if($query) {
	$list = array();
	while($l = $query->fetch_assoc()) {
		$list[] = $l;
	}
	echo json_encode($list);
}
else {
	//Couldn't run query	
}
?>