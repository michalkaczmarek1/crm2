<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'offer.php';

// instancja obiektu bazy danych i oferty
$offer = new Offer();

// zapytanie o przedstawicieli
$stmt = $offer->read();
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica ofert
    $offer_arr = array();
    $offer_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
       
        $offer_item = array(
            "id_offer" => $id_offer,
            "name" => $name,
            "date_offer" => $date_offer,
            "start_date" => $start_date,
            "end_date" => $end_date,
            "description" => $description,
            "reduction" => $reduction
        );
        
        array_push($offer_arr["records"], $offer_item);
    }
    
    echo json_encode($offer_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono ofert."
    ));
}

?>