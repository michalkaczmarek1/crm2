<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobrane polaczenie z baza danych
include_once APP_MODEL . 'model.php';

// instancja obiektu sprzedaży
include_once APP_MODEL . 'sale.php';

$sale = new Sale();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id zamówienia aby został zrealizowany
$nr_order  = $data->id;
// var_dump($nr_order);
 //test
//  echo $sale->nr_order;




// realizacja zamówienia
if($sale->checkoutOrder($nr_order)){
    $id_salesman = $sale->id_salesman;
    echo '{';
    echo '"id_salesman": "'.$id_salesman.'",';
    echo '"message": "Zamówienie zostało zrealizowane."';
    echo '}';
}
// jesli nie mozna usunac przedstawiciela
else{
    echo '{';
    echo '"message": "Zamówienie nie zostało zrealizowane."';
    echo '}';
}
?>