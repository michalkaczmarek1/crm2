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
include_once APP_MODEL . 'car.php';

$car = new Car();

// ustawienie wartosci ID dla edytowanego rekordu
$car->id_car = isset($_GET['id']) ? $_GET['id'] : "";


// odczyt szczegołów oferty, który bedzie edytowany
$car->readOne();

// utworzenie tablicy
$car_arr = array(
    "mark" => $car->mark,
    "model" => $car->model,
    "engine" => $car->engine,
    "horsepower" => $car->horsepower,
    "truck_or_delivery" => $car->truck_or_delivery,
    "price" => $car->price
    
);

// zrobienie formatu JSON
print_r(json_encode($car_arr));
?>