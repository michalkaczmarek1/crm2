<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once (APP_MODEL . "model.php");
include_once (APP_MODEL . "salesman.php");
include_once (APP_MODEL . "client.php");


class Admin extends Model
{
    
    // nazwa tabeli w bazie
    private $table_name = "admin";
    
    //sol dla hasla
    private $salt = "dhaidonad832809uadaldln";
    
    // wlasciwosci obiektu
    public $username;
    
    public $pass;
    
    /**
     * rejestruje przedstawiciela
     * @param Salesman $salesman - obiekt przedstawiciela
     * @return boolean
     */
    public function registerSalesman(Salesman $salesman)
    {
        // zapytanie usuwajace rekord
        $query2 = "DELETE FROM salesman_register WHERE id_salesman = ?";
        
        
        $stmt2 = $this->pdo->prepare($query2);
        
        $stmt2->bindParam(1, $salesman->id_salesman);
        
        $stmt2->execute();
        
        // zapytanie wstawiajace rekord
        $query = "INSERT INTO
                 salesman_register (username, pass, id_salesman)
            VALUES
                (:username, :pass, :salesman_id)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $salesman->username = htmlspecialchars(strip_tags($salesman->username));
        $salesman->pass = htmlspecialchars(strip_tags($salesman->pass));
        $salesman->id_salesman = htmlspecialchars(strip_tags($salesman->id_salesman));
        
        // wiazanie wartosci
        $stmt->bindParam(":username", $salesman->username);
        $stmt->bindParam(":pass", md5($salesman->pass . $this->salt));
        $stmt->bindParam(":salesman_id", $salesman->id_salesman);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    
    /**
     * rejestruje klienta
     * @param Client $client - obiekt klienta
     * @return boolean
     */
    public function registerClient(Client $client)
    {
        // query to insert record
        $query2 = "DELETE FROM client_register WHERE id_client = ?";
        
        // prepare query
        $stmt2 = $this->pdo->prepare($query2);
        
        $stmt2->bindParam(1, $client->id_client);
        
        $stmt2->execute();
        
        // query to insert record
        $query = "INSERT INTO
                 client_register (username, pass, id_client)
            VALUES
                (:username, :pass, :id_client)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $client->username = htmlspecialchars(strip_tags($client->username));
        $client->pass = htmlspecialchars(strip_tags($client->pass));
        $client->id_client = htmlspecialchars(strip_tags($client->id_client));
        
        // bind values
        $stmt->bindParam(":username", $client->username);
        $stmt->bindParam(":pass", md5($client->pass . $this->salt));
        $stmt->bindParam(":id_client", $client->id_client);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    
    /**
     * loguje admina
     * @return string|PDOStatement
     */
    public function login()
    {
        
        
        $query = "SELECT * FROM admin WHERE username='admin' AND pass='" . md5($this->pass . $this->salt) . "'";
        
        $results = $this->pdo->query($query);
        $data['username'] = '';
        $data['pass'] = '';
        foreach ($results as $result) {
            $data['username'] = $result['username'];
            $data['pass'] = $result['pass'];
        }
        $results->closeCursor();
        
        return $data;
    }
    
    function logout()
    {
        session_destroy();
    }
}

// test
// $m = new Admin();
// print_r($m);
