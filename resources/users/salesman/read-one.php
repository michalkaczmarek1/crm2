<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'salesman.php';

$salesman = new Salesman();

// ustawienie wartosci ID dla edytowanego rekordu
$salesman->id_salesman = isset($_GET['id']) ? $_GET['id'] : "";

if($_GET['id'] == ""){
    $salesman->readNameLogged($_SESSION['salesman']);
}

// odczyt szczegołów przedstawiciela, który bedzie edytowany
$salesman->readOne();

// utworzenie tablicy
$salesman_arr = array(
    "id" =>  $salesman->id_salesman,
    "name" => $salesman->name,
    "surname" => $salesman->surname,
    "address" => $salesman->address,
    "city" => $salesman->city,
    "email" => $salesman->email
    
);

// zrobienie formatu JSON
print_r(json_encode($salesman_arr));
?>