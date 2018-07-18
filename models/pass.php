<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa uzytownika odpowiadajaca za obsługe formularza zmiany hasła
class Pass extends Model 
{
    //wlasciwosci obiektu
    public $username;
    
    public $oldpass;
    
    public $newpass;
    
    public $newpass2;

    
    private $salt = "dhaidonad832809uadaldln";

    /**
     * sprawdzenie długosci hasła
     * @param string $pass - ciag znakow do sprawdzenia
     * @return boolean
     */
    public function checkLength($pass){
        
        if((strlen($pass) >= 8)){
            return true;
        } else {
            echo '{';
            echo '"error": "Hasło musi mieć co najmniej 8 znaków."';
            echo '}';
            return false;
            
        }
        
        
        
        
    }
    
    /**
     * sprawdzenie poprawnosci starego hasła
     * @param string $oldpass - stare hasło
     * @return boolean
     */
    public function checkOldPass($oldpass)
    {
        $this->oldpass = $oldpass;
        
        $query = 'SELECT pass FROM admin WHERE pass="' . md5($this->oldpass . $this->salt) . '"';
        
        $statement = $this->pdo->prepare($query);
        $statement->execute();
        
        if ($statement->rowCount() > 0) {
            return true;
        } else {
            echo '{';
            echo '"error": "Stare hasło jest nieprawidłowe."';
            echo '}';
            return false;
            
        }
    }
    
    /**
     * sprawdzenie czy nowe hasła sa identyczne
     * @param string $newpass - dane z pola nowe hasło
     * @param string $newpass2 - dane z pola powtórz nowe hasło
     * @return boolean
     */
    public function checkNewPass($newpass, $newpass2)
    {
        $this->newpass = $newpass;
        $this->newpass2 = $newpass2;
        
        if ($this->newpass === $this->newpass2) {
            return true;
        } else {
            echo '{';
            echo '"error": "Pola nowe hasło i powtórz nowe hasło są różne."';
            echo '}';
            return false;
            
        }
    }
    
    /**
     * zmiana hasła w bazie
     * @param string $newpass - dane z pola nowe hasło
     * @param string $username - login uzytkownika
     * @return boolean
     */
    public function changePass($newpass, $username)
    {
        $this->newpass = $newpass;
        $this->username = $username;
        
        $query = "UPDATE
                    admin
                  SET 
                    pass = :newpass
                  WHERE 
                    username = :username";
        
        $statement = $this->pdo->prepare($query);
        
        $this->newpass = htmlspecialchars(strip_tags($this->newpass));
        $this->newpass2 = htmlspecialchars(strip_tags($this->newpass2));
        
        
        $statement->bindValue(":newpass", md5($newpass . $this->salt));
        $statement->bindValue(":username", $username);
        
        if ($statement->execute()) {
            echo '{';
            echo '"message": "Hasło zostało zmienione."';
            echo '}';
            return true;
        } else {
            
            return false;
        }
    }
    
    /**
     * sprawdzenie poprawnosci starego hasła
     * @param string $oldpass - stare hasło
     * @return boolean
     */
    public function checkOldPassClient($oldpass)
    {
        $this->oldpass = $oldpass;
        
        $query = 'SELECT pass FROM client_register WHERE pass="' . md5($this->oldpass . $this->salt) . '"';
        
        $statement = $this->pdo->prepare($query);
        $statement->execute();
        
        if ($statement->rowCount() > 0) {
            return true;
        } else {
            echo '{';
            echo '"error": "Stare hasło jest nieprawidłowe."';
            echo '}';
            return false;
            
        }
    }
    
    /**
     * zmiana hasła w bazie
     * @param string $newpass - dane z pola nowe hasło
     * @param string $username - login uzytkownika
     * @return boolean
     */
    public function changePassClient($newpass, $username)
    {
        $this->newpass = $newpass;
        $this->username = $username;
        
        $query = "UPDATE
                    client_register
                  SET
                    pass = :newpass
                  WHERE
                    username = :username";
        
        $statement = $this->pdo->prepare($query);
        
        $this->newpass = htmlspecialchars(strip_tags($this->newpass));
        $this->newpass2 = htmlspecialchars(strip_tags($this->newpass2));
        
        $statement->bindValue(":newpass", md5($newpass . $this->salt));
        $statement->bindValue(":username", $username);
        
        if ($statement->execute()) {
            echo '{';
            echo '"message": "Hasło zostało zmienione."';
            echo '}';
            return true;
        } else {
            
            return false;
        }
    }
    
    /**
     * sprawdzenie poprawnosci starego hasła
     * @param string $oldpass - stare hasło
     * @return boolean
     */
    public function checkOldPassSalesman($oldpass)
    {
        $this->oldpass = $oldpass;
        
        $query = 'SELECT pass FROM salesman_register WHERE pass="' . md5($this->oldpass . $this->salt) . '"';
        
        $statement = $this->pdo->prepare($query);
        $statement->execute();
        
        if ($statement->rowCount() > 0) {
            return true;
        } else {
            echo '{';
            echo '"error": "Stare hasło jest nieprawidłowe."';
            echo '}';
            return false;
            
        }
    }
    
    /**
     * zmiana hasła w bazie
     * @param string $newpass - dane z pola nowe hasło
     * @param string $username - login uzytkownika
     * @return boolean
     */
    public function changePassSalesman($newpass, $username)
    {
        $this->newpass = $newpass;
        $this->username = $username;
        
        $query = "UPDATE
                    salesman_register
                  SET
                    pass = :newpass
                  WHERE
                    username = :username";
        
        $statement = $this->pdo->prepare($query);
        
        $this->newpass = htmlspecialchars(strip_tags($this->newpass));
        $this->newpass2 = htmlspecialchars(strip_tags($this->newpass2));
        
        $statement->bindValue(":newpass", md5($newpass . $this->salt));
        $statement->bindValue(":username", $username);
        
        if ($statement->execute()) {
            echo '{';
            echo '"message": "Hasło zostało zmienione."';
            echo '}';
            return true;
        } else {
            
            return false;
        }
    }
    

}







