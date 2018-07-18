<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// get database connection
include_once APP_MODEL . 'model.php';

// instantiate admin object
include_once APP_MODEL . 'admin.php';


$admin = new Admin();

// get posted data
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// set value of admin
foreach($data[0] as $row){
    
    $admin->username = $row;
}

foreach($data[1] as $row){
    
    $admin->pass = $row;
}


//test
// echo $admin->username . " " . $admin->pass;


// create the admin
if ($admin->create()) {
    echo '{';
    echo '"Wiadomosc": "Admin został utworzony."';
    echo '}';
}
// if unable to create the admin, tell the user
else {
    echo '{';
    echo '"Wiadomosc": "Admin nie został utworzony."';
    echo '}';
}


