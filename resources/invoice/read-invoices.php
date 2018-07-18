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

//ustalenie id
$salesman->readNameLogged($_SESSION['salesman']);

// zapytanie o faktury
$stmt = $salesman->readInvoicesSalesman($salesman->id_salesman);
$num = $stmt->rowCount();

// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
    
    // tablica przedstawicieli
    $salesman_invoices_arr = array();
    $salesman_invoices_arr["records"] = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
        $salesman_invoices_item = array(
            "nr_invoice" => $nr_invoice,
            "value_order" => $value_order*1.23,
            "id_invoice_paid" => $id_invoice_paid
        );
        
        array_push($salesman_invoices_arr["records"], $salesman_invoices_item);
    }
    
    echo json_encode($salesman_invoices_arr);
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono faktur."
    ));
}

?>