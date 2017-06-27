<?php
session_start();
	$access_username=$_SESSION['username'];
	$access_token=$_SESSION["token"];
	$admin[] = array(
					'status' => 'true',
					'username' => $access_username,
					'access_token' => $access_token
			);
	header("Access-Control-Allow-Origin: *");
	header("content-type:text/javascript;charset=utf-8");
	header("Content-Type: application/json; charset=utf-8", true, 200);
	print json_encode(array("data"=>$admin));

	if(isset($_GET['destroy'])) {
    	session_destroy();	
	}
?>