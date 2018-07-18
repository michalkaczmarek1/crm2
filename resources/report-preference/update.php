<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// pobranie plików z klasami
include_once APP_MODEL . 'marketing.php';
include_once APP_MODEL . 'client.php';
include_once APP_MODEL . 'salesman.php';
include_once APP_MODEL . 'offer.php';

//instancja obiektu marketingu, klienta, przedstawiciela, oferty
$marketing = new Marketing();

$client = new Client();

$salesman = new Salesman();

$offer = new Offer();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));


// test
// var_dump($data);

// tablica z danymi raportu
$data_rec = array();
array_push($data_rec, $data[1], $data[2], $data[3], $data[4], $data[5]);

// // test
// var_dump($data_rec);
// ustawienie wartosci dla raportu
foreach ($data_rec as $row) {
    
   
    if ($row->name == "client") {
        $client->id_client = $row->value;
    }
    
    if ($row->name == "offer") {
        $offer->id = $row->value;
    }
    
    if ($row->name == "comments") {
        $marketing->comments = $row->value;
    }
    
    if ($row->name == "id_salesman") {
        $salesman->id_salesman = $row->value;
    }
    
    // ustawienie ID dla edytowanego rekordu
    if ($row->name == "id_report") {
        $marketing->id_report = $row->value;
    }
         
}

//test
// echo  $client->id_client;
// echo $offer->id_offer;
// echo $marketing->comments;
// echo $salesman->id_salesman;
// echo $marketing->id_report;



// update raportu
if($marketing->updateReport($offer, $client, $salesman, $marketing->id_report)){
    echo '{';
    echo '"message": "Raport został wysłany."';
    echo '}';
}

// Jesli nie został zaaktualizowany
else{
    echo '{';
    echo '"message": "Raport nie został wysłany."';
    echo '}';
}
?>