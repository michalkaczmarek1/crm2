<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header('Cache-Control: no-cache');

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'salesman.php';





// instancja obiektu bazy danych i samochodu
$salesman = new Salesman();
$username = $_SESSION['salesman'];

// odczyt numerów faktur
$salesman->readNameLogged($username);
$dateCurr = date("Y-m-d");
$data = [
    "name" => $salesman->name,
    "surname" => $salesman->surname,
    "date" => $dateCurr
];

print_r (json_encode($data));



?>

