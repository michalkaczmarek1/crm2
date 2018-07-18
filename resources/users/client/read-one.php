<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu klienta
include_once APP_MODEL . 'client.php';

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'salesman.php';

$client = new Client();

$salesman = new Salesman();

// ustawienie wartosci ID dla edytowanego rekordu
$client->id_client = isset($_GET['id']) ? $_GET['id'] : "";


if($_GET['id'] == ""){
   
    $client->readNameLogged($_SESSION['client']);
    // odczyt szczegołów klienta, który bedzie edytowany
    $client->readOne();
        
    // utworzenie tablicy z danymi klienta
    $client_arr = array(
        "id" =>  $client->id_client,
        "name" => $client->name,
        "surname" => $client->surname,
        "address" => $client->address,
        "city" => $client->city,
        "email" => $client->email
    );
    
} else {
    
    // odczyt szczegołów klienta, który bedzie edytowany
    $client->readOne();
    
    // odczyt szczegołów przedstawiciela klienta
    $salesman->readName($client->id_salesman);
    
    // utworzenie tablicy z danymi klienta
    $client_arr = array(
        "id" =>  $client->id_client,
        "name" => $client->name,
        "surname" => $client->surname,
        "address" => $client->address,
        "city" => $client->city,
        "email" => $client->email,
        "status" => $client->status,
        "id_salesman" => $client->id_salesman,
        "sal_name" => $salesman->name,
        "sal_surname" => $salesman->surname
    );
    
}



// zrobienie formatu JSON
print_r(json_encode($client_arr));
?>