<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'car.php';

// instancja obiektu bazy danych i oferty
$car = new Car();


$stmt = $car->read();
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica ofert
    $car_arr = array();
    $car_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
        $car_item = array(
            "id_car" => $id_car,
            "mark" => $mark,
            "model" => $model,
            "engine" => $engine,
            "horsepower" => $horsepower,
            "truck_or_delivery" => $truck_or_delivery,
            "price" => $price
        );
        
        array_push($car_arr["records"], $car_item);
    }
    
    echo json_encode($car_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono samochodów."
    ));
}

?>