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

//ustalenie id klienta
$salesman->readNameLogged($_SESSION['salesman']);

// zapytanie o przedstawicieli
$stmt = $salesman->readMessages($salesman->id_salesman);
$stmt2 = $salesman->readMessagesClientPlain($salesman->id_salesman);
$num = $stmt->rowCount();
$num2 = $stmt2->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0 || $num2 > 0 ) {
    
    // tablica przedstawicieli
    $messages_client_arr = array();
    $messages_client_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
       
        $message_client_item = array(
            "id_message" => $id_message,
            "content" => $content,
            "date_message" => $date_message,
            "client_name" => $name,
            "client_surname" => $surname

        );
        
        array_push($messages_client_arr["records"], $message_client_item);
    }
    
    
    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row2);
        
        $message_client_item2 = array(
            "id_message" => $id_message,
            "content" => $content,
            "date_message" => $date_message
        );
        
        array_push($messages_client_arr["records"], $message_client_item2);
    }
    
    
    echo json_encode($messages_client_arr);
} else {
    echo json_encode(array(
        "message" => "Nie znaleziono wiadomosci."
    ));
}

?>