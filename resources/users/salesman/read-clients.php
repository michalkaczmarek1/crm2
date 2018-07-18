<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'client.php';
include_once APP_MODEL . 'salesman.php';

// instancja obiektu bazy danych i klienta
$client = new Client();

// instancja obiektu bazy danych i klienta
$salesman = new Salesman();

// odczyt klientów

// echo $_SESSION['salesman'];
//pobranie klientow przedtawiciela

//ustalenie id przedstawiciela
$salesman->readNameLogged($_SESSION['salesman']);

$stmt = $salesman->readClientsSalesman($salesman->id_salesman);
$num = $stmt->rowCount();
// sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
     
    //ustawienie klientow dla przedstawiciela
   
        
        // tablica klientów przedstawiciela
        $client_salesman_arr = array();
        $client_salesman_arr["records_salesman"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
       
            
            extract($row);
            
            $client_salesman_item = array(
                "id_client_salesman" => $id_client,
                "name_client_salesman" => $name,
                "surname_client_salesman" => $surname
            );
            
            array_push($client_salesman_arr["records_salesman"], $client_salesman_item);
            
        }
        
        echo json_encode($client_salesman_arr);
        
} else {
    echo json_encode(array(
        "message" => "Nie znaleziono klientów."
    ));
}

?>