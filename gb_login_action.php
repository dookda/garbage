<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $email = $request->email;
    $password = $request->password;
    //token
    $charmap="1234ABCDEFGHIJKLMNOPQRSTUYWXYZabcdefghijklmnopqrstuvwxyz";
    $codRandom = str_shuffle($charmap);
    //conect
    require('../lib/conn.php');
    $dbconn = pg_connect($conn_gb) or die('Could not connect'); 
    $sql = "select user_email, user_password from users where user_email='$email' and user_password='$password'";
    
	$objQuery = pg_query($sql);
	$objResult = pg_fetch_array($objQuery);
    
    header("Access-Control-Allow-Origin: *");
    header("content-type:text/javascript;charset=utf-8");
    header("Content-Type: application/json; charset=utf-8", true, 200);

	if(!$objResult){		
		$admin[] = array('status' => 'no');
        print json_encode(array("data"=>$admin));
	}else{
		session_start();
		$_SESSION["token"] = $codRandom;
		$_SESSION["username"] = $username;
		$admin[] = array('status' => 'true');
        print json_encode(array("data"=>$admin));
	}
        
    pg_close($dbconn);
?>