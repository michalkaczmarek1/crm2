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
include_once APP_MODEL . 'client.php';

$salesman = new Salesman();
$client = new Client();

if(isset($_GET['client'])){
    
    //ustalenie id klienta
    $client->readNameLogged($_SESSION['client']);
    
    $stmt = $client->readOrderCompleted($client->id_client);
    $num = $stmt->rowCount();
    
    
    // sprawdzenie jesli więcej niz jeden rekord
    if ($num > 0) {
        
        // tablica przedstawicieli
        $order_client_compl_arr = array();
        $order_client_compl_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // wydzielamy wiersz do zmiennej
            // nazwa klucza jest nazwa zmiennej
            extract($row);
            
            
            $order__compl_client_item = array(
                "nr_order" => $nr_order,
                "date_order" => $date_order,
                "content" => $content,
                "value_order" => $value_order,
                "nr_invoice" => $nr_invoice,
                "name_salesman" => $name,
                "surname_salesman" => $surname
            );
            
            array_push($order_client_compl_arr["records"], $order__compl_client_item);
        }
        
        echo json_encode($order_client_compl_arr);
    }
    else {
        echo json_encode(array(
            "message" => "Nie znaleziono zamówień klienta."
        ));
    }
    
} else {
    
    // pobranie przesłanych danych
    $data = json_decode(file_get_contents("php://input"));
    // var_dump($data);
    
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1], $data[2], $data[3]);
    
    // var_dump($data_rec);
    
    // test
    // var_dump($data_rec);
    // ustawienie wartosci dla przestawiciela
    foreach ($data_rec as $row) {
        
        if ($row->name == "date_report") {
            
            $date_str = $row->value;
            
        }
        
        if ($row->name == "salesmans") {
            
            $salesman->id_salesman = $row->value;
            
        }
        
        if ($row->name == "id") {
            
            $id_report_sale = $row->value;
            
        }
        
    }
    
    //przygotowanie dat do zapytania
    $date_arr = explode(" - ", $date_str);
    //test
    // print_r($date_arr);
    
    // zapytanie o zamowienie przedstawiciela
    
    $stmt = $salesman->readOrderSalesmanCompleted($id_report_sale, $salesman->id_salesman, $date_arr[0], $date_arr[1]);
    $num = $stmt->rowCount();
    
    // sprawdzenie jesli więcej niz jeden rekord
    if ($num > 0) {
        
        // tablica przedstawicieli
        $order_completed_salesman_arr = array();
        
        $order_completed_salesman_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // wydzielamy wiersz do zmiennej
            // nazwa klucza jest nazwa zmiennej
            extract($row);
            $order_salesman_completed_item = array(
                "nr_order" => $nr_order,
                "date_order" => $date_order,
                "content" => $content,
                "nr_invoice" => $nr_invoice,
                "value_order" => $value_order,
                "name_client" => $name,
                "surname_client" => $surname
            );
            
            array_push($order_completed_salesman_arr["records"], $order_salesman_completed_item);
        }
        
        echo json_encode($order_completed_salesman_arr);
    }
    else {
        echo json_encode(array(
            "message" => "Nie znaleziono zamówień przedstawiciela."
        ));
    }
    
}


?>