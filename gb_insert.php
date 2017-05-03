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
    $gbmonth = $request->month;
    $gbyear = $request->year;
    $gbgeneral = $request->general; 
    $gborganic = $request->organic;    
    $gbrecycle = $request->recycle;
    $gbhazard = $request->hazard; 
    $gbelect = $request->electronic;
    $gbdispose = $request->dispose;
    $gbcost = $request->cost; 
    $gbinfect = $request->infect;
    $gbinfectclr = $request->infectClear;
    $gbindust = $request->indust; 
    $gbindustclr = $request->industClear;
    $gbcollect = $request->collectPoint;
    $gbremark = $request->remark;
    $token = mt_rand(100000, 999999);

    if($gbremark==null){
        $sql = "INSERT INTO gb_data (gbmonth, gbyear, gbgeneral, gborganic, gbrecycle, gbhazard,  gbelect, gbdispose, gbcost, gbinfect, gbinfectclr, gbindust, gbindustclr, gbcollect, token) VALUES ('$gbmonth',$gbyear,$gbgeneral,$gborganic,$gbrecycle,$gbhazard,$gbelect,$gbdispose,$gbcost,$gbinfect,$gbinfectclr,$gbindust,$gbindustclr,$gbcollect,$token)";
    }else{
        $sql = "INSERT INTO gb_data (gbmonth, gbyear, gbgeneral, gborganic, gbrecycle, gbhazard,  gbelect, gbdispose, gbcost, gbinfect, gbinfectclr, gbindust, gbindustclr, gbcollect, gbremark, token) VALUES ('$gbmonth',$gbyear,$gbgeneral,$gborganic,$gbrecycle,$gbhazard,$gbelect,$gbdispose,$gbcost,$gbinfect,$gbinfectclr,$gbindust,$gbindustclr,$gbcollect,'$gbremark',$token)";
    }

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