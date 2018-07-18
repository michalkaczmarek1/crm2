<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// stałe
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobranie połączenia z bazą danych
include_once APP_MODEL . 'model.php';

// pobranie klasy admin
include_once APP_MODEL . 'admin.php';

$admin = new Admin();

// pobranie danych z "body" żądania
$data = json_decode(file_get_contents("php://input"));

if($data == "Jestes zalogowany."){
    $admin->logout();
    unset($_SESSION['admin']);
    echo '{';
    echo '"logout": "Zostałes poprawnie wylogowany."';
    echo '}';
}

