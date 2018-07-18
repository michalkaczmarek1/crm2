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
include_once APP_MODEL . 'salesman.php';

$salesman = new Salesman();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id przedstawiciela aby został zaaktualizowany
// $salesman->id_salesman = $data->id;

// test
// var_dump($data);

// tablica z danymi przedstawiciela
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5]);

// test
// var_dump($data_rec);
// ustawienie wartosci dla przestawiciela
$errors = false;
foreach ($data_rec as $row) {
    
    if($row->value != ""){
   
        if ($row->name == "name") {
            $salesman->name = $row->value;
        }
        
        if ($row->name == "surname") {
            $salesman->surname = $row->value;
        }
        
        if ($row->name == "address") {
            $salesman->address = $row->value;
        }
        
        if ($row->name == "city") {
            $salesman->city = $row->value;
        }
        
        if ($row->name == "email") {
            $salesman->email = $row->value;
        }
        
        // ustawienie ID dla edytowanego rekordu
        if ($row->name == "id") {
            $salesman->id_salesman = $row->value;
        }
    } else {
        $errors = true;
    }
      
}

// test
// echo $salesman->id_salesman;


// update przedstawiciela

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        if($salesman->update()){
            echo '{';
            echo '"message": "Dane zostały zaaktualizowane."';
            echo '}';
        } else{
            throw new Exception("error");
        }
        
    }
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}



 
?>