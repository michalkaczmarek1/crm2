<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'sale.php';


//instancja obiektu sprzedaży
$sale = new Sale();

// var_dump($sale);


// var_dump($sale);
// echo "test";



// wygenerowanie pliku faktury
if ($sale->initInvoice()) {
    echo '{';
    echo '"success": "Faktura nr '.$sale->nr_invoice.' została utworzona i dodana do bazy.",';
    echo '"number_invoice": "' . $sale->nr_invoice . '"';
    echo '}';
    
}
// jesli faktura nie zostanie wygenerowana
else {
    echo '{';
    echo '"fail": "Faktura nie została utworzona."';
    echo '}';
}


