<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'sale.php';



// instancja obiektu bazy danych i sprzedaży
$sale = new Sale();


// odczyt numerów faktur
$stmt = $sale->readNumber();

?>