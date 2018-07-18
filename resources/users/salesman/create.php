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

// test
// var_dump($data);
// $i = 0;
// var_dump($data[0]);
// while ($i <= count($data)){
//     echo "test";
//     if($valid->checkField($data[$i])){
        
        
//         echo '{';
//         echo '"error": "Uzupełnij wszystkie pola."';
//         echo '}';
//         die();        
//     }
//     $i++;
    
// }

// tablica z danymi przedstawiciela
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4]);



// test
// var_dump($data_rec);
// ustawienie wartosci dla przestawiciela

//tablica z bledami
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
        
    } else {
        $errors = true;
    }
        
    
}
  
// //test
// // echo $salesman->name . " " . $salesman->surname . " " . $salesman->address;
// // var_dump($data_rec);


// //test
// // echo $salesman->name . " " . $salesman->surname;

// var_dump($_POST);
// // tworzenie i zarejestrowanie przedstawiciela
try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        if ($salesman->create()) {
            
            echo '{';
            echo '"message": "Przedstawiciel został utworzony."';
            echo '}';
            
        } else {
            throw new Exception("blad");
            
        }
        
    }
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}



    




