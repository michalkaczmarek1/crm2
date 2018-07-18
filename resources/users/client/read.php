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

if(isset($_GET['salesman'])){
    
    
    //ustalenie id
    
    $salesman->readNameLogged($_SESSION['salesman']);
    
    // odczyt klientów
    $stmt = $salesman->readClients($salesman->id_salesman);
    $num = $stmt->rowCount();
    // echo $_SESSION['salesman'];
    //pobranie klientow przedtawiciela
    
    
    // sprawdzenie jesli więcej niz jeden rekord
    if ($num > 0) {
        
        // tablica klientów
        $client_salesman_arr = array();
        $client_salesman_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // wydzielamy wiersz
            // wtedy $row['name'] bedzie można odczytać
            // przez $name (kolumna "name")
            
            extract($row);
            
            $client_salesman_item = array(
                "id_client" => $id_client,
                "name" => $name,
                "surname" => $surname,
                "address" => $address,
                "city" => $city,
                "email" => $email,
                "status" => $status,
                "id_salesman" => $id_salesman
            );
               
            
            //         echo $salesman_id_salesman;

            
            array_push($client_salesman_arr["records"], $client_salesman_item);
        }
        
        
        
        echo json_encode($client_salesman_arr);
        
        
    }
    else {
        echo json_encode(array(
            "message" => "Nie znaleziono klientów."
        ));
    }
    
    
} else {
    // odczyt klientów
    $stmt = $client->read();
    $num = $stmt->rowCount();
    // echo $_SESSION['salesman'];
    //pobranie klientow przedtawiciela
    
    
    // sprawdzenie jesli więcej niz jeden rekord
    if ($num > 0) {
        
        // tablica klientów
        $client_arr = array();
        $client_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // wydzielamy wiersz
            // wtedy $row['name'] bedzie można odczytać
            // przez $name (kolumna "name")
            
            extract($row);
            
            $client_item = array(
                "id_client" => $id_client,
                "name" => $name,
                "surname" => $surname,
                "address" => $address,
                "city" => $city,
                "email" => $email,
                "status" => $status,
                "id_salesman" => $id_salesman
            );
            
            //pobranie danych przedstawiciela i umieszczenie ich w tablicy
            $salesman->readName($id_salesman);
            
            $client_item["sal_name"] = $salesman->name;
            $client_item["sal_surname"] = $salesman->surname;
            
            if($status == "Stały"){
                $client_item["register"] = true;
                
            }
            //         echo $salesman_id_salesman;
            
            
            array_push($client_arr["records"], $client_item);
         
        }
        
        
        
        echo json_encode($client_arr);
        
        
    }
    else {
        echo json_encode(array(
            "message" => "Nie znaleziono klientów."
        ));
    }
}


?>