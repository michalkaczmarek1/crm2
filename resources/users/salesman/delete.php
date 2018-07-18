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

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'salesman.php';

$salesman = new Salesman();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));

// ustawienie id przedstawiciela aby został usunięty
$salesman->id_salesman = $data->id;


//test
// var_dump($data)
// echo $salesman->id_salesman;


// usunięcie przedstawiciela
if($salesman->delete()){
    echo '{';
    echo '"message": "Przedstawiciel został usunięty."';
    echo '}';
}
// jesli nie mozna usunac przedstawiciela
else{
    echo '{';
    echo '"message": "Unable to delete object."';
    echo '}';
}
?>