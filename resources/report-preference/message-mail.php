<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// załączenie pliku bazy danych i pliku obiektu
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'salesman.php';
include_once APP_MODEL . 'client.php';
include_once APP_MODEL . 'marketing.php';
include_once APP_MODEL . 'offer.php';
include_once APP_MODEL . 'car.php';

//instancja obiektu marketingu, klienta, przedstawiciela, oferty, samochodu
$marketing = new Marketing();

$client = new Client();

$salesman = new Salesman();

$offer = new Offer();

$car = new Car();

$marketing->id_report = isset($_GET['id-report']) ? $_GET['id-report'] : die();

$on_mail = isset($_GET['mail']) ? $_GET['mail'] : "";

// // pobranie danych do maila
$marketing->readDataToMail($marketing->id_report, $client, $offer, $salesman);

// $num = $stmt->rowCount();

// tablica z danymi do maila
$mail_data["data_mail"] = array(
    "client_name" => $client->name,
    "client_surname" => $client->surname,
    "client_mail" => $client->email,
    "offer_name" => $offer->name,
    "id_offer" => $offer->id,
    "description" => $offer->description,
    "start_date" => $offer->start_date,
    "end_date" => $offer->end_date,
    "reduction" => $offer->reduction,
    "salesman_name" => $salesman->name,
    "salesman_surname" => $salesman->surname,
    "salesman_mail" => $salesman->email
);

// echo json_encode($mail_data);

$stmt = $marketing->readContentOffer($offer->id);
$num = $stmt->rowCount();





// // // sprawdzenie jesli więcej niz jeden rekord
if ($num > 0) {
      
    $mail_data["data_mail_cars"] = [];    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // wydzielamy wiersz
        // wtedy $row['name'] bedzie można odczytać
        // przez $name (kolumna "name")
        
        extract($row);
        
        $data_car_item = array(
            "mark_car" => $mark,
            "model_car" => $model,
            "truck_or_delivery" => $truck_or_delivery,
            "price" => $price,
            "engine" => $engine,
            "horsepower" => $horsepower
        );
        
        array_push($mail_data["data_mail_cars"], $data_car_item);
        
    }
    
    try {
        
        //wyslanie maila
        if($on_mail == "send"){
            
            if( $marketing->sendMailToClient($client, $offer, $salesman, $mail_data["data_mail_cars"])){
                echo json_encode(array(
                    "successSend" => "Wiadomosc została wysłana."
                ));
            } else {
                throw new Exception("wiadomosc nie wyslana");
            }
            
            
            
        } else {
            echo json_encode($mail_data);
        }
        
        
    } catch (Exception $e) {
        echo '{';
        echo '"error_mess": "'.$e->getMessage().'"';
        echo '}';
    }
    
    
    
    
    
    
}
else {
    echo json_encode(array(
        "message" => "Nie znaleziono danych."
    ));
}

?>