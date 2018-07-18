<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id dla przestawiciela
foreach ($data as $row) {
    
    if ($row->name == "salesmans") {
        $salesman->id_salesman = $row->value;
    }
}


// zapytanie o raporty preferencji przedstawiciela
$stmt = $salesman->getReportPreference($marketing, $offer, $client, $salesman->id_salesman);
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica raportów preferencji
    $report_preference_arr = array();
    $report_preference_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
               
        $report_preference_item = array(
            "name_report" => $report_name,
            "id_report_preference" => $id_report_preference,
            "comments" => $comments,
            "date_report" => $date_report,
            "offer_name" => $offer_name,
            "client_name" => $client_name,
            "client_surname" => $client_surname
        );
        
        array_push($report_preference_arr["records"], $report_preference_item);
    }
    
    echo json_encode($report_preference_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono raportów."
    ));
}

?>