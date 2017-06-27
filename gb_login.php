<?php
require('../lib/conn.php');
$dbconn = pg_connect($conn_gb) or die('Could not connect'); 

$postdata = file_get_contents("php://input");
if (isset($postdata)) {   

    $request = json_decode($postdata);
    $email = $request->email;
    $password = $request->password;

    $sql = "select user_email, user_password from users where user_email='$email' and user_password='$password'";
    echo $sql;
    
    $rs = pg_query($sql);
    
    $row = pg_num_rows($rs);


    if ($row > 0){
        echo "correct".$row;
    } else{
        echo 'wrong';
    }
        
    echo 'ส่งข้อมูลสำเร็จ';
}else {
    echo "Not called properly with username parameter!";
}


// Closing connection
pg_close($dbconn);

?>
