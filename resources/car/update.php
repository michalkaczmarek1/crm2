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
include_once APP_MODEL . 'car.php';

$car = new Car();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));



// // tablica z danymi 
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6]);



// // test
// var_dump($data_rec);
// ustawienie wartosci dla samochodu
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
    
        if ($row->name == "mark") {
            $car->mark = $row->value;
        }
        
        if ($row->name == "model") {
            $car->model = $row->value;
        }
        
        if ($row->name == "engine") {
            $car->engine = $row->value;
        }
        
        if ($row->name == "horsepower") {
            $car->horsepower = $row->value;
        }
        
        if ($row->name == "price") {
            $car->price = $row->value;
        }
        
        if ($row->name == "truck_or_delivery") {
            $car->truck_or_delivery = $row->value;
        }
        
        
        // ustawienie ID dla edytowanego rekordu
        if ($row->name == "id") {
            $car->id_car = $row->value;
        }
    } else {
        $errors = true;
    }
    
    
}




try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        // update przedstawiciela
        if($car->update()){
            echo '{';
            echo '"message": "Samochód został zaaktualizowany."';
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