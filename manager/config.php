<?php

$url = getenv('JAWSDB_URL');
$dbparts = parse_url($url);

$host = $dbparts['host'];
$db_name = ltrim($dbparts['path'],'/');
$db_user = $dbparts['user'];
$db_password = $dbparts['pass'];
$start_page = 'signup.php';
$mn_page = 'manager.php';
$pr_page = 'proofreader.php';
$ad_page = 'terminal.php';
$ml_page = 'mail.php';

?>
