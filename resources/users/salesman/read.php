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

// zapytanie o przedstawicieli
$stmt = $salesman->read();
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica przedstawicieli
    $salesman_arr = array();
    $salesman_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
        $salesman_item = array(
            "id_salesman" => $id_salesman,
            "name" => $name,
            "surname" => $surname,
            "address" => $address,
            "city" => $city,
            "email" => $email
        );
        
        array_push($salesman_arr["records"], $salesman_item);
    }
    
    echo json_encode($salesman_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono przedstawicieli."
    ));
}

?>