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

// instancja obiektu 
include_once APP_MODEL . 'car.php';
include_once APP_MODEL . 'offer.php';

$car = new Car();

$offer = new Offer();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// test
// var_dump($data);

// tablica z danymi 
$data_rec = array();
array_push($data_rec, $data[0], $data[1]);

// // test
// var_dump($data_rec);
// // ustawienie wartosci 
foreach ($data_rec as $row) {
      
    if ($row->name == "id_car") {
        $car->id_car = $row->value;
    }
    
    if ($row->name == "offer") {
        $offer->id = $row->value;
    }
        
}



try {
    
    if ($car->createContentOffer($offer)) {
        echo '{';
        echo '"message": "Samochód został dodany do oferty."';
        echo '}';
    }
    //  // jesli oferta nie została utworzony
    else {
        throw new Exception("error");
    }
    
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}




