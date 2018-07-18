<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'client.php';

// instancja obiektu bazy danych i przedstawiciela
$client = new Client();

//ustalenie id klienta
$client->readNameLogged($_SESSION['client']);

// zapytanie o przedstawicieli
$stmt = $client->readComplaints($client->id_client);
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica przedstawicieli
    $complaints_client_arr = array();
    $complaints_client_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
        $complaint_client_item = array(
            "nr_complaint" => $nr_complaint,
            "content" => $content,
            "id_client" => $id_client,
            "nr_order" => $nr_order

        );
        
        array_push($complaints_client_arr["records"], $complaint_client_item);
    }
    
    echo json_encode($complaints_client_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono reklamacji."
    ));
}

?>