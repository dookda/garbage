<?php
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


// check exist value
function chkActivelandcwr($apt_name, $gbmonth, $gbyear){

    // Connect database
    require('../lib/conn.php');
    $dbconn = pg_connect($conn_gb) or die('Could not connect'); 

    //$check = "SELECT alrcode FROM active_land WHERE alrcode = '$code'";
    $rs = pg_query("select * from gb_data where optname = '$apt_name' and gbmonth = '$gbmonth' and gbyear = '$gbyear'");
    $data = pg_fetch_array($rs);

    if ($data[0] == $alrcode)
    {    
        return 1;
        echo '1';
    }  else    {
        return 0;
        echo '0';
    }

    // Closing connection
    pg_close($dbconn);
}

// Connect database
require('../lib/conn.php');
$dbconn = pg_connect($conn_gb) or die('Could not connect'); 

$postdata = file_get_contents("php://input");
if (isset($postdata)) {   

    $request = json_decode($postdata);
    $apt_name = $request->apt_name;
    $gbsum = $request->gbsum;
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

    cwr($apt_name, $gbmonth, $gbyear);

    if($gbremark==null){
        $sql = "INSERT INTO gb_data (gbmonth, gbyear, gbsum, gbgeneral, gborganic, gbrecycle, gbhazard,  gbelect, gbdispose, gbcost, gbinfect, gbinfectclr, gbindust, gbindustclr, gbcollect, token) VALUES ('$gbmonth',$gbyear,$gbsum,$gbgeneral,$gborganic,$gbrecycle,$gbhazard,$gbelect,$gbdispose,$gbcost,$gbinfect,$gbinfectclr,$gbindust,$gbindustclr,$gbcollect,$token)";
    }else{
        $sql = "INSERT INTO gb_data (gbmonth, gbyear, gbsum, gbgeneral, gborganic, gbrecycle, gbhazard,  gbelect, gbdispose, gbcost, gbinfect, gbinfectclr, gbindust, gbindustclr, gbcollect, gbremark, token) VALUES ('$gbmonth',$gbyear,$gbsum,$gbgeneral,$gborganic,$gbrecycle,$gbhazard,$gbelect,$gbdispose,$gbcost,$gbinfect,$gbinfectclr,$gbindust,$gbindustclr,$gbcollect,'$gbremark',$token)";
    }

    pg_query($sql);      

    echo 'ส่งข้อมูลสำเร็จ';
    
}else {
    echo "Not called properly with username parameter!";
}

// Closing connection
    pg_close($dbconn);

?>