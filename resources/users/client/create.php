<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu klienta
include_once APP_MODEL . 'client.php';

include_once APP_MODEL . 'salesman.php';

$client = new Client();

$salesman = new Salesman();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// tablica z danymi klienta

if($_SESSION['salesman']){
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5]);
    
    //ustalenie id
   
    $salesman->readNameLogged($_SESSION['salesman']);
    
    $client->id_salesman =  $salesman->id_salesman;
  
    
} else {
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6]);
}

// var_dump($data_rec);

// // test
// // var_dump($data_rec);
// // ustawienie wartosci dla przestawiciela

//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
        if ($row->name == "name") {
            $client->name = $row->value;
        }
        
        if ($row->name == "surname") {
            $client->surname = $row->value;
        }
    
        if ($row->name == "address") {
            $client->address = $row->value;
        }
    
        if ($row->name == "city") {
            $client->city = $row->value;
        }
    
        if ($row->name == "email") {
            $client->email = $row->value;
        }
        
        
        if ($row->name == "status") {
            $client->status = $row->value;
        }
        
         
        if(!(isset($_SESSION['salesman']))){
            
            if ($row->name == "salesmans") {
                $client->id_salesman = $row->value;
            }
            
        }
        
        
    } else {
        $errors = true;
    }
    
   
    
    
}

//test
// echo $client->name . " " . $client->surname . " " . $client->address;
// var_dump($data_rec);

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        // tworzenie klienta
        if ($client->create()) {
            echo '{';
            echo '"Message": "Klient został utworzony."';
            echo '}';
        }
        // jesli klient nie został utworzony
        else {
            throw new Exception("error");
        }
        
        
    }
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}






