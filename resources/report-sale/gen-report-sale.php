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


// $sale->initReportSale();


try {
    
    if ($sale->initReportSale()) {
        echo '{';
        echo '"success": "'.$sale->name_report.' został dodany do bazy i wstawiony w pole Raport sprzedaży.",';
        
        //pobrannie danych dla kluczy JSON
        $sale->selectLastRecord();
        echo '"id_report_sale": "'.$sale->id_report_sale.'",';
        echo '"name_report": "'.$sale->name_report.'",';
        echo '"start_date": "'.$sale->start_date.'",';
        echo '"end_date": "'.$sale->end_date.'"';
        echo '}';
        
    }
    // jesli raport sprzedaży nie zostanie wygenerowany
    else {
        throw new Exception("error");
    }
    
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}

// wygenerowanie reportu sprzedazy

