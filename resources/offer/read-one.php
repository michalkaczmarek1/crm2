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
include_once APP_MODEL . 'offer.php';

$offer = new Offer();

// ustawienie wartosci ID dla edytowanego rekordu
$offer->id = isset($_GET['id']) ? $_GET['id'] : "";


// odczyt szczegołów oferty, który bedzie edytowany
$offer->readOne();

// utworzenie tablicy
$offer_arr = array(
    "name" => $offer->name,
    "date_offer" => $offer->date_offer,
    "start_date" => $offer->start_date,
    "end_date" => $offer->end_date,
    "description" => $offer->description,
    "reduction" => $offer->reduction
    
);

// zrobienie formatu JSON
print_r(json_encode($offer_arr));
?>