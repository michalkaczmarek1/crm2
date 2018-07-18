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

// test
// var_dump($data[0]);

// tablica z danymi oferty
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4]);

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
        
    } else {
        $errors = true;
    }
}



// //test
// // echo $salesman->name . " " . $salesman->surname . " " . $salesman->address;
// // var_dump($data_rec);


// //test
// // echo $salesman->name . " " . $salesman->surname;

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        // // // tworzenie oferty
        if ($offer->create()) {
            echo '{';
            echo '"message": "Oferta została utworzona."';
            echo '}';
        }
        //  // jesli oferta nie została utworzony
        else {
            throw new Exception('error');
        }
        
    }
    
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}
    
    



