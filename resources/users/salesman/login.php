<?php
// wymagane nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



// stałe
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

// pobranie połączenia z bazą danych
include_once (APP_MODEL . "model.php");

// pobranie klasy przedstawiciela

include_once (APP_MODEL . "salesman.php");

$salesman = new Salesman();

// obsługa sesji
if(isset($_SESSION['salesman'])){
    echo '{';
    echo '"logged": "Jestes zalogowany.",';
    echo '"salesman": ' . json_encode($_SESSION['salesman']);
    echo '}';
} else {
    // pobranie danych z formularza
    $data = json_decode(file_get_contents("php://input"));
    
    // test
//     var_dump($data);
    
    // ustawianie wartosci logowanie dla przedstawiciela
    
    $data_rec = array();
    array_push($data_rec, $data[0], $data[1]);
    
    foreach ($data_rec as $row) {
        
        if ($row->name == "username") {
            $salesman->username = $row->value;
        }
        
        if ($row->name == "pass") {
            $salesman->pass = $row->value;
        }
        
    
        
    }
    
    
    
    
    // test
//     echo $salesman->username . " " . $salesman->pass;
//     var_dump($data_rec);
    
    // inicjalizacja $_POST
    if(!(isset($_POST['username'])) && !(isset($_POST['pass']))){
        $_POST['username'] = "";
        $_POST['pass'] = "";
    }
    
//     echo "test";
    
    
    
    
    //test
//     $test = md5("1234!"."dhaidonad832809uadaldln");
//     echo $test;

    if ($salesman->username == '' || $salesman->pass == '') {
        
        echo '{';
        echo '"error": "Uzupełnij pola username i hasło."';
        echo '}';
        
    } elseif (!($salesman->login($salesman->username, $salesman->pass))) {
       
        echo '{';
        echo '"error": "Dane do zalogowania sa nie prawidlowe"';
        echo '}';
        
    } else {
        
        $_SESSION['salesman'] = $salesman->username;
        echo '{';
        echo '"online": "Zostałes poprawnie zalogowany.",';
        echo '"logged": "Jestes zalogowany.",';
        echo '"salesman": ' . json_encode($_SESSION['salesman']);
        echo '}';
        
    }
    
//     test
//         echo $_SESSION['salesman'];
    
}


