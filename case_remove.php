<?php
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

	include "../lib/gb.php";
    conndb();

	
$postdata = file_get_contents("php://input");
if (isset($postdata)) {
    $request = json_decode($postdata);
    $token = $request->token;
        
/*    foreach($request as $item => $value){
        echo $item;
        echo $value;
    };*/

    pg_query("DELETE FROM gb_point WHERE token = $token");
    //echo $token;

/*    foreach($request as $item => $value){
        if($item=='c1_name'){
            //echo $value;
            cwr($alrcode, "c1_name", "c1_grow", "active_land_cwr");

        }elseif($item=='c2_name'){
            //echo $value;
            cwr($alrcode, "c2_name", "c2_grow", "active_land_cwr2");

        }elseif($item=='c3_name'){
            //echo $value;        
            cwr($alrcode, "c3_name", "c3_grow", "active_land_cwr3");
        };
    }*/

    echo 'งานที่ '.$token.' ถูกลบแล้ว';
}else {
    echo "Not called properly with username parameter!";
}

closedb();
?>