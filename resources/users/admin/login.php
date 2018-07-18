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

// pobranie klasy admin
// include_once ('/home/pp42877/domains/pp42877.wsbpoz.solidhost.pl/public_html' . APP_MODEL . 'admin.php');
include_once (APP_MODEL . "admin.php");

$admin = new Admin();



// obsługa sesji
if(isset($_SESSION['admin'])){
    echo '{';
    echo '"logged": "Jestes zalogowany.",';
    echo '"admin": ' . json_encode($_SESSION['admin']);
    echo '}';
} else {
    // pobranie danych z formularza
    $data = json_decode(file_get_contents("php://input"));
    
    // test
    // var_dump($data);
    
    // ustawianie wartosci logowanie dla admin
    foreach ($data[0] as $row) {
        
        $admin->username = $row;
    }
    
    foreach ($data[1] as $row) {
        
        $admin->pass = $row;
    }
    
    // test
    // echo $admin->username . " " . $admin->pass;
    // $data_admin = $admin->login();
    // var_dump($data_admin['pass']);
    
    // inicjalizacja $_POST
    if(!(isset($_POST['username'])) && !(isset($_POST['pass']))){
        $_POST['username'] = $admin->username;
        $_POST['pass'] = $admin->pass;
    }
    
    $data_admin = $admin->login();
    
    if (($data_admin['username'] != $admin->username) && ($data_admin['pass'] != $admin->pass)) {
        
        echo '{';
        echo '"error": "Dane do zalogowania sa nieprawidłowe."';
        echo '}';
        
    } elseif ($_POST['username'] == '' || $_POST['pass'] == '') {
        
        echo '{';
        echo '"error": "Uzupełnij pola username i hasło."';
        echo '}';
        
    } else {
        
        $_SESSION['admin'] = $admin->username;
        echo '{';
        echo '"online": "Zostałes poprawnie zalogowany.",';
        echo '"logged": "Jestes zalogowany.",';
        echo '"admin": ' . json_encode($_SESSION['admin']);
        echo '}';
        
        
    }
        
    
    
    
}


