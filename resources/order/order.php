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

// instancja obiektu zamowienia
include_once APP_MODEL . 'sale.php';

// instancja obiektu przedstawiciela
include_once APP_MODEL . 'salesman.php';

// instancja obiektu samochodu
include_once APP_MODEL . 'car.php';

$sale = new Sale();
$salesman = new Salesman();
$car = new Car();

// pobranie przesłanych danych
$data = json_decode(file_get_contents("php://input"));
// var_dump($data);
$data_cars["ids"] = array();

// wstawienie id przeslanych w formularzu do tablicy
//tablica z bledami

foreach ($data as $row) {
    
    
   
        if ($row->name == "cars[]") {
       
            $data_cars["ids"][] = $row->value;

        }
   
}
// test
// var_dump($data);

// tablica z danymi zamówienia
$data_rec = array();
array_push($data_rec, $data[0], $data[1], $data[2], $data[3], $data_cars);
// var_dump($data_rec);
//1 Musze pobrac cene
// 2 Obliczyc wartosc zamowienia do bazy
//pobrac id przedstawiciela
$salesman->readNameLogged($_SESSION['salesman']);
//musze ustawic wszystie wartosci aby zapisac w bazie. 
// var_dump($data_cars["ids"]);

$car_prices["prices"] = array();

extract($data_cars);
//sprawdzenie bledu

//ustalenie cen aut
foreach($ids as $id){
    
    
    $car->getPrice($id);
    $car_prices["prices"][] = $car->price;
    
    
}

// var_dump($car_prices);
extract($car_prices);

//test
// var_dump($prices);

//ustalenie wartosci zamówienia
$sale->valueOrder($prices);



// print_r($car_prices["prices"]);
// test
// var_dump($data_rec);
// ustawienie wartosci dla zamówienia
foreach ($data_rec as $row) {
    
    if ($row->name == "date") {
        $sale->date_order = $row->value;
    }
    
    if ($row->name == "invoice") {
        $sale->id_invoice_order = $row->value;
    }
    
    if ($row->name == "salesman") {
        $row->value = $salesman->id_salesman;
        $sale->id_salesman = $row->value;
    }
    
    if ($row->name == "client") {
        $sale->id_client = $row->value;
    }
    
    //ustalenie zawartosci kolumny content
    if(is_array($row)){
        
        extract($row);
        $content = array();
        
        foreach($ids as $id){
            
            $car->readName($id);
            $content["names"][] = $car->mark." ".$car->model." ".$car->engine." ".$car->horsepower." ".$car->truck_or_delivery;
         
        }
        $sale->content = implode(", ", $content["names"]);
    }
    
   
    
    
}

//

//testy
// print_r($content);


// echo $sale->date_order;
// echo $sale->content;
// echo $sale->id_invoice_order;
// echo $sale->id_salesman;
// echo $sale->value_order;


try {
    
    if($sale->value_order == 0){
        echo '{';
        echo '"error": "Wybierz auta."';
        echo '}';
    } else {
        
        // dodanie zamówienia
        if ($sale->addOrder()) {
            echo '{';
            echo '"message": "Zamówienie o wartosci '.$sale->value_order.' zł zostało dodane do bazy.,"';
            echo '}';
        }
        // jesli zamówienie nie zostało dodane
        else {
           throw new Exception("error");
        }
        
        
    }
    
} catch (Exception $e) {
    echo '{';
    echo '"error_mess": "'.$e->getMessage().'"';
    echo '}';
}



