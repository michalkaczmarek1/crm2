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

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'admin.php';

$admin = new Admin();
$salesman = new Salesman();


// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// tablica z danymi przedstawiciela
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2]);

// test
// var_dump($data_rec);
// ustawienie wartosci dla przestawiciela
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
        
        if ($row->name == "username") {
            $salesman->username = $row->value;
        }
        
        if ($row->name == "pass") {
            $salesman->pass = $row->value;
        }
        
        if ($row->name == "id_salesman") {
            $salesman->id_salesman = $row->value;
        }
    } else {
        $errors = true;
    }
    
}

// //test
// // echo $salesman->name . " " . $salesman->surname . " " . $salesman->address;
// // var_dump($data_rec);


// //test
// // echo $salesman->name . " " . $salesman->surname;


// // tworzenie i zarejestrowanie przedstawiciela

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        if ($admin->registerSalesman($salesman)) {
            echo '{';
            echo '"Message": "Przedstawiciel został zarejestrowany."';
            echo '}';
        }
        //  // jesli przedstawiciel nie został utworzony
        else {
            throw new Exception("error");
        }
        
    }
    
    
} catch (Exception $e) {
    
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
    
}


