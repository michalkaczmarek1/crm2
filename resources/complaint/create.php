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

include_once APP_MODEL . 'sale.php';

$client = new Client();

//ustalenie id klienta
$client->readNameLogged($_SESSION['client']);

$sale = new Sale();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// tablica z danymi klienta

$data_rec = array();
array_push($data_rec, $data[0], $data[1]);


// var_dump($data_rec);

// // test
// // var_dump($data_rec);
// // ustawienie wartosci dla przestawiciela
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
    
        if ($row->name == "content") {
            $sale->content_complaint = $row->value;
        }
        
        if ($row->name == "nr_order") {
            $sale->nr_order = $row->value;
        }
    } else {
        $errors = true;
    }
    
        
}
        
    
   
    
    
// }

// //test
// // echo $client->name . " " . $client->surname . " " . $client->address;
// // var_dump($data_rec);



if($errors === true){
    echo '{';
    echo '"error": "Uzupełnij wszystkie pola."';
    echo '}';
} else {
    
    // tworzenie klienta
    if ($sale->createComplaint($client)) {
        echo '{';
        echo '"message": "Reklamacja została utworzona."';
        echo '}';
    }
    // jesli klient nie został utworzony
    else {
        echo '{';
        echo '"message": "Reklamacja nie została utworzona."';
        echo '}';
    }
    
    
}




