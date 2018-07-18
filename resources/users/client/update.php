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
include_once APP_MODEL . 'client.php';
include_once APP_MODEL . 'salesman.php';

$client = new Client();

$salesman = new Salesman();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id przedstawiciela aby został zaaktualizowany
// $salesman->id_salesman = $data->id;

// test
// var_dump($data);
// przygotowanie danych klienta

if(isset($_SESSION['salesman'])){
    
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6]);
    
    //ustalenie id
    
    $salesman->readNameLogged($_SESSION['salesman']);
    
    $client->id_salesman =  $salesman->id_salesman;
   
    
} else if(isset($_SESSION['client'])){
    
    // tablica z danymi klienta
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5]);
    
} else {
    
    // tablica z danymi klienta
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6], $data[7]);
    
}

// var_dump($data_rec);


// // // test
// // var_dump($data_rec);
// // // ustawienie wartosci dla przestawiciela

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
        
        if ($row->name == "id") {
            $client->id_client = $row->value;
        }
        
    } else {
        $errors = true;
    }
}

// //test
// echo $client->name;
// echo $client->surname; 
// echo $client->address;
// echo $client->city;
// echo $client->email; 
// // echo $client->status;
// // echo $client->id_salesman;
// echo $client->id_client;;
// // test
// // echo $salesman->id_salesman;


// update klienta

try {
    
    if($errors === true){
        echo '{';
        echo '"error": "Uzupełnij wszystkie pola."';
        echo '}';
    } else {
        
        if(isset($_SESSION['client'])){
            
            if($client->updateData()){
                echo '{';
                echo '"message": "Dane zostały zaaktualizowane."';
                echo '}';
            }
            
            // Jesli nie został zaaktualizowany
            else{
                throw new Exception("error");
            }
            
        } else {
            
            if($client->update()){
                echo '{';
                echo '"message": "Klient został zaaktualizowany."';
                echo '}';
            }
            
            // Jesli nie został zaaktualizowany
            else{
               throw new Exception("error");
            }
            
        }
        
    }
    
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}

 
?>