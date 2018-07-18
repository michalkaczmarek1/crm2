<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';

include_once APP_MODEL . 'salesman.php';
$salesman = new Salesman();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));
$data_rec = array();

array_push($data_rec, $data[0]);
// instancja obiektu bazy danych i przedstawiciela
$salesman = new Salesman();

//przypisanie id z formularza
foreach($data_rec as $row){
    
    if($row->name == "salesmans"){
        $id = $row->value;
    }
    
}


// zapytanie o zamowienie przedstawiciela

$stmt = $salesman->readOrderSalesman($id);
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica przedstawicieli
    $order_salesman_arr = array();
    $order_salesman_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz do zmiennej
        // nazwa klucza jest nazwa zmiennej
        extract($row);
        
        $order_salesman_item = array(
            "nr_order" => $nr_order,
            "date_order" => $date_order,
            "content" => $content,
            "value_order" => $value_order,
            "nr_invoice" => $nr_invoice,
            "name_client" => $name,
            "surname_client" => $surname
        );
        
        array_push($order_salesman_arr["records"], $order_salesman_item);
    }
    
    echo json_encode($order_salesman_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono zamowien przedstawiciela."
    ));
}

?>