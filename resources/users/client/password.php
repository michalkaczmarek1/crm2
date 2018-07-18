<?php
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
include_once (APP_MODEL . "pass.php");

$pass = new Pass();


$data = json_decode(file_get_contents("php://input"));
// var_dump($data);
$data_rec = array();

array_push($data_rec, $data[0], $data[1], $data[2]);
//tablica z bledami
$errors = false;
foreach ($data_rec as $row) {
    
    
    if($row->value != ""){
    
        if ($row->name == "oldpass") {
            $pass->oldpass = $row->value;
        }
        
        if ($row->name == "newpass") {
            $pass->newpass = $row->value;
        }
        
        if ($row->name == "newpass-repeat") {
            $pass->newpass2 = $row->value;
        }
    } else {
        $errors = true;
    }
}

if($errors === true){
    echo '{';
    echo '"error": "Uzupełnij wszystkie pola."';
    echo '}';
} else {

    //     /         sprawdzenie długosci hasła
    if($pass->checkLength($pass->oldpass) &&  $pass->checkLength($pass->newpass)){
        
        // sprawdzenie czy stare hasło jest poprawne
        if($pass->checkOldPassClient($pass->oldpass)){
            
            //sprawdzenie pola nowe hasło i powtórz nowe hasło - czy sa takie same
            if($pass->checkNewPass($pass->newpass, $pass->newpass2)){
                
                //zmiana hasła
                $pass->changePassClient($pass->newpass, $_SESSION['client']);
                         
            }
            
        }
        
    }
            
}


    
    
   
            







//test
// foreach($_POST as $key => $row){
//     echo $key;
//     echo $row;
// }


//michaltest 12345678! - konto testowe