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

function cwr($apt_name, $gbmonth, $gbyear)
{   
    $chkExist = chkActivelandcwr($apt_name, $gbmonth, $gbyear);
    //print $chkExist."</br>";

    //$pacelSql = pg_query("SELECT alrcode, active_type, date_part('week'::text, active_date) AS wk FROM active_land where alrcode='$alrCode'");

    
    if($chkExist==0){

        // while ($pacelRow = pg_fetch_assoc($pacelSql)) {           
            
        //     pg_query("INSERT INTO active_land_cwr (alrcode, crop_type, active_wk) VALUES ('".$pacelRow['alrcode']."','".$pacelRow['active_type']."','".$pacelRow['wk']."')");

        //     $wkNum = $pacelRow['wk'];
        //     $cropType = $pacelRow['active_type'];
        // }
        print "noooooo not exist </br>";

    }else{
        // while ($pacelRow = pg_fetch_assoc($pacelSql)) {

        //     pg_query("UPDATE active_land_cwr SET crop_type='".$pacelRow['active_type']."',active_wk='".$pacelRow['wk']."' WHERE alrcode='$alrCode'");

        //     $wkNum = $pacelRow['wk'];
        //     $cropType = $pacelRow['active_type'];
        // }
        print "yess exist </br>";
    }
    
    insertCwr($alrCode, $wkNum, $cropType);
      
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