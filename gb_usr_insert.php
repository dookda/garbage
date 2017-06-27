<?php
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Connect database
require('../lib/conn.php');
$dbconn = pg_connect($conn_gb) or die('Could not connect'); 

$postdata = file_get_contents("php://input");
if (isset($postdata)) {
    $request = json_decode($postdata);

    $email = $request->email;
    $fname = $request->fname;
    $lname = $request->lname;
    $pass = $request->pw1;
    $aptname = $request->apt_name->name;
    
    $sql = "insert into users(user_email, user_fname, user_lname, user_password, user_apt, date_register)values('$email','$fname','$lname','$pass','$aptname', now())";
    pg_query($sql);

    echo  "successful :)";
}else {
    echo "Not called properly with username parameter!";
}

// Closing connection
pg_close($dbconn);

?>