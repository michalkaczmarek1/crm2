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

// instancja obiektu przedstawiciela i klienta
include_once APP_MODEL . 'salesman.php';
include_once APP_MODEL . 'client.php';

$salesman = new Salesman();
$client = new Client();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// tablica z danymi przedstawiciela
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3]);

// test
// var_dump($data_rec);
// ustawienie wartosci dla przestawiciela
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
    
        if ($row->name == "date") {
            $salesman->date_meeting = $row->value;
        }
        
        if ($row->name == "client") {
            $client->id_client = $row->value;
        }
        
        if ($row->name == "comments") {
            $salesman->comments = $row->value;
        }
        
        if ($row->name == "id_salesman") {
            $salesman->id_salesman = $row->value;
        }
    } else {
        $errors = true;
    }
}


    
    
// }

// // //test
// // // echo $salesman->name . " " . $salesman->surname . " " . $salesman->address;
// // // var_dump($data_rec);


// // //test
// // // echo $salesman->name . " " . $salesman->surname;

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola lub nie masz jeszcze klientów."';
        echo '}';
    } else {
        
        // // zapisanie spotkanie w bazie
        if ($salesman->createMeeting($client)) {
            echo '{';
            echo '"message": "Spotkanie zostało zapisane."';
            echo '}';
        }
        //  // jesli spotkanie nie zostało zapisane
        else {
            echo '{';
            echo '"message": "Spotkanie nie zostało zapisane."';
            echo '}';
        }
        
    }
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}



