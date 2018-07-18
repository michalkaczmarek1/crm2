<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

$dt = new DateTime();
// create DateTime object with current time

$i = 0;
$date_arr["dates"] = [];
$date_arr["dates"][] = $dt->format("Y-m-d");
$date_item = [];

//pobranie dat do formularza dodawania ofert
if(isset($_GET["offer"])){
    
    $date_arr["offer"] = [];
    $date_item_offer = [];
    
    
    while($i <= 30){
        
        $date_item_offer[] = $dt->add(new DateInterval("P1D"));
        
        $date_arr["offer"][] = $date_item_offer[$i]->format("Y-m-d");
        
        $i++;
    }
    
    echo json_encode($date_arr);
    
    
} else {
    
    while($i < 6){
        
        $date_item[] = $dt->add(new DateInterval("P1D"));
        
        $date_arr["dates"][] = $date_item[$i]->format("Y-m-d");
        
        $i++;
    }
    
    echo json_encode($date_arr);
}

