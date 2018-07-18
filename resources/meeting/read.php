<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'salesman.php';

// instancja obiektu bazy danych i przedstawiciela
$salesman = new Salesman();

//ustalenie id przedstawiciela
$salesman->readNameLogged($_SESSION['salesman']);

// zapytanie o przedstawicieli
$stmt = $salesman->readMeetings($salesman->id_salesman);
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica przedstawicieli
    $salesman_meetings_arr = array();
    $salesman_meetings_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
         
        extract($row);
        
        $salesman_meeting_item = array(
            "date_meeting" => $date_meeting,
            "client_name" => $name,
            "client_surname" => $surname,
            "comments" => $comments
        );
        
        array_push($salesman_meetings_arr["records"], $salesman_meeting_item);
    }
    
    echo json_encode($salesman_meetings_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono spotkań."
    ));
}

?>