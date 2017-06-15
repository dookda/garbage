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

    $lat = $request->lat;
    $lng = $request->lng;
    $pat_desc = $request->desc;
    $vill_code = $request->vill; 
    $tam_code = $request->tam;  
    $amp_code = $request->amp;
    $prov_code = $request->prov; 
    $date_sick = $request->date_sick;
    $token = mt_rand(100000, 999999);



    $sql = "INSERT INTO gb_point (geom, lat, lng, pat_desc, vill_code, tam_code, amp_code, prov_code, date_sick, token) 
			VALUES ( ST_GeomFromText('POINT($lng $lat)', 4326), $lat, $lng, '$pat_desc', '$vill_code', '$tam_code', '$amp_code','$prov_code', '$date_sick', $token)";
			pg_query($sql);
        
/*    foreach($request as $item => $value){
        echo $item;
        echo $value;
    }*/

    echo 'ส่งข้อมูลสำเร็จ';
}else {
    echo "Not called properly with username parameter!";
}

closedb();

?>