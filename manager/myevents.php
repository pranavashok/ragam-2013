<?php
require_once("initdb.php");

$ragamid = $mysqli->real_escape_string($_GET['id']);

//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
$query = $mysqli->query("SELECT `eventinfo`.`event_name`, `eventinfo`.`event_id`, `team`.`team_id`, `team`.`teamleader_id`,  `participants`.`ragID`, `participants`.`name` FROM `team`, `eventinfo`,`participants` WHERE `team`.`teammember_id`='$ragamid' AND `team`.`event_id`=`eventinfo`.`event_id` AND `team`.`teamleader_id`=`participants`.`ragID`");
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