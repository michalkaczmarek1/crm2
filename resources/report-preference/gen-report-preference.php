<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// pobranie plikow z klasami
include_once APP_MODEL . 'marketing.php';
include_once APP_MODEL . 'client.php';
include_once APP_MODEL . 'salesman.php';
include_once APP_MODEL . 'offer.php';


//instancja obiektu marketingu, klienta, przedstawiciela, oferty
$marketing = new Marketing();

$client = new Client();

$salesman = new Salesman();

$offer = new Offer();

// var_dump($sale);


// var_dump($sale);


// $sale->initReportSale();



// wygenerowanie reportu marketingu
if ($marketing->initReportPreference($offer, $client, $salesman)) {
    echo '{';
    echo '"success": "'.$marketing->name_report.' został dodany do bazy i wstawiony w pole Raport preferencji.",';
    $marketing->selectLastRecord();
    echo '"id_report": "'.$marketing->id_report.'",';
    echo '"name_report": "'.$marketing->name_report.'"';
    
    //pobrannie danych dla kluczy JSON
//     $sale->selectLastRecord();
//     echo '"id_report_sale": "'.$sale->id_report_sale.'",';
//     echo '"name_report": "'.$sale->name_report.'",';
//     echo '"start_date": "'.$sale->start_date.'",';
//     echo '"end_date": "'.$sale->end_date.'"';
    echo '}';
    
}
// jesli raport sprzedaży nie zostanie wygenerowany
else {
    echo '{';
    echo '"fail": "Raport nie został utworzony."';
    echo '}';
}


