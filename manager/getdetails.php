<?php
require_once("initdb.php");

if(isset($_GET['e'])) {
	$event_id = $mysqli->real_escape_string($_GET['e']);
	$query = $mysqli->query("SELECT team_id, teamleader_id, teammember_id, college FROM team, participants WHERE team.teamleader_id = participants.ragID AND event_id = '$event_id';");
	if($query) {
		$list = array();
		while($l = $query->fetch_assoc()) {
			$list[] = $l;
		}
		echo "<table class='datasheet'>";
		$j = 0;
		foreach($list as $a) {
		    echo "<tr>";
		    $i = 0;
	        foreach($a as $v) {
	        	if($i==0) {
	        		echo "<td>$event_id$v</td>";
	        	}
	        	else if($i==1) {
	        		echo "<td>RAG$v</td>";
	        	}
	        	else if($i==2)
	        		echo "<td><a href='getdetails.php?id=$v'>RAG$v</a></td>";	
	        	else
	        		echo "<td>$v</td>";
	        	$i++;
	        }
	    	echo "</tr>";
	    	$j++;
		}
		echo "</table>";
		echo "Total $j";
	}
	else {
		//Couldn't run query	
	}
}
else if(isset($_GET['id'])) {
	$ragam_id = $mysqli->real_escape_string($_GET['id']);
	$query = $mysqli->query("SELECT `ragID`, `name`, `email`, `college`, `phone`, `accommodation`, `timestamp` FROM `participants` WHERE `ragID` = $ragam_id;");
	if($query) {
		$p = $query->fetch_assoc();
		echo "<table>";
		echo "<tr><th>ID</th><th>Name</th><th>E-Mail</th><th>College</th><th>Phone</th><th>Accommodation</th><th>Timestamp</th></tr>";
		echo "<tr>";
		foreach($p as $v) {
	        echo "<td>$v</td>";
	    }
	    echo "</tr></table>";
	}
	else {

	}

}
else {
	//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
	$query = $mysqli->query("SELECT DISTINCT `team`.`event_id`,  `eventinfo`.`event_name` , COUNT( teamleader_id ) FROM  `team` ,  `eventinfo` WHERE  `team`.`event_id` =  `eventinfo`.`event_id` GROUP BY `teamleader_id`, `event_id`, `team_id`;");
	if($query) {
		$list = array();
		while($l = $query->fetch_assoc()) {
			$list[] = $l;
		}
		echo "<table class='datasheet'>";
		$j = 0;
		foreach($list as $a) {
		    echo "<tr>";
	        foreach($a as $v) {
	        	if(strlen($v)==3 || strlen($v)==4)
	        		echo "<td><a href='getdetails.php?e=$v'>$v</a></td>";	
	        	else
	        		echo "<td>$v</td>";
	        }
	    	echo "</tr>";
	    	$j++;
		}
		echo "</table>";
		echo "Total $j";
	}
	else {
		//Couldn't run query	
	}
}
?>