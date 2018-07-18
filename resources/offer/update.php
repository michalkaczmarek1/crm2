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
include_once APP_MODEL . 'offer.php';

$offer = new Offer();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id przedstawiciela aby został zaaktualizowany
// $salesman->id_salesman = $data->id;

// test
// var_dump($data);

// // tablica z danymi oferty
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5]);



// // test
// var_dump($data_rec);
// ustawienie wartosci dla oferty
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
    
        if ($row->name == "name") {
            $offer->name = $row->value;
        }
        
        if ($row->name == "date-start") {
            $offer->start_date = $row->value;
        }
        
        if ($row->name == "date-end") {
            $offer->end_date = $row->value;
        }
        
        if ($row->name == "description") {
            $offer->description = $row->value;
        }
        
        if ($row->name == "reduction") {
            $offer->reduction = $row->value;
        }
        
        // ustawienie ID dla edytowanego rekordu
        if ($row->name == "id") {
            $offer->id = $row->value;
        }
    } else {
        $errors = true;
    }
    
    
}

// test
// echo $salesman->id_salesman;

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        // update przedstawiciela
        if($offer->update()){
            echo '{';
            echo '"message": "Oferta została zaaktualizowana."';
            echo '}';
        }
        
        // Jesli nie został zaaktualizowany
        else{
            throw new Exception('error');
        }
        
    }
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}


?>