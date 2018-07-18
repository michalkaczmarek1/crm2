<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'sale.php';

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'salesman.php';

$sale = new Sale();
$salesman = new Salesman();

// ustawienie danych raportu sprzdazy
$sale->selectLastRecord();

//odczyt imienia i nazwiska przedstawiciela
$salesman->readName($sale->id_salesman_report);

//obliczenie ilosci zrealizowanych zamówień
$sale->calculateAmountAndValueOrders($sale->start_date, $sale->end_date, $sale->id_salesman_report);

// utworzenie tablicy
$sale_report_arr = array(
    "name_report" =>  $sale->name_report,
    "start_date" =>  $sale->start_date,
    "end_date" =>  $sale->end_date,
    "id_report_sale" =>  $sale->id_report_sale,
    "name_salesman" =>  $salesman->name,
    "surname_salesman" =>  $salesman->surname,
    "amount_orders" =>  $sale->amount_orders,
    "value_orders_report" =>  $sale->value_orders_report
);

// zrobienie formatu JSON
print_r(json_encode($sale_report_arr));
?>