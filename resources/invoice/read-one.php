<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu przedstawiciela i sprzedazy
include_once APP_MODEL . 'sale.php';
include_once APP_MODEL . 'salesman.php';

$salesman = new Salesman();
$sale = new Sale();

//ustalenie id
$salesman->readNameLogged($_SESSION['salesman']);


// ustawienie wartosci ID dla edytowanego rekordu
$sale->nr_invoice = isset($_GET['number']) ? $_GET['number'] : die();

// odczyt szczegołów przedstawiciela, który bedzie edytowany
$sale->displayInvoice($salesman->id_salesman, $sale->nr_invoice);

// utworzenie tablicy
$invoice_arr = array(
    "nr_invoice" =>  $sale->nr_invoice,
    "salesman_name" => $sale->salesman_name,
    "salesman_surname" => $sale->salesman_surname,
    "client_name" => $sale->client_name,
    "client_surname" => $sale->client_surname,
    "nr_order" => $sale->nr_order,
    "value_order_netto" => $sale->value_order,
    "value_order_brutto" => $sale->value_order*1.23,
    "date_order" => $sale->date_order,
    "content" => $sale->content,
    "client_address" => $sale->client_address,
    "client_city" => $sale->client_city,
    "client_email" => $sale->client_email
);


// zrobienie formatu JSON
print_r(json_encode($invoice_arr));
?>