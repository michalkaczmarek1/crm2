<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa zawierajaca metody i własciwosci dot klientow
class Client extends Model
{
    
    // nazwa tabeli
    private $table_name = "client";
    
    private $salt = "dhaidonad832809uadaldln";
    
    // własciwosci obiektu
    public $id_client;
    
    public $id_salesman;
    
    public $name;
    
    public $surname;
    
    public $address;
    
    public $city;
    
    public $email;
    
    public $status;
    
    public $username;
    
    public $pass;
    
    /**
     * odczytuje dane klientów
     * @return PDOStatement
     */
    public function read()
    {
        
        // select all query
        $query = "SELECT * FROM " . $this->table_name;
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * tworzy klienta
     * @return boolean
     */
    public function create()
    {
        
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . " (name, surname, email, address, city, status, id_salesman)
            VALUES
                (:name, :surname, :email, :address, :city, :status, :id_salesman)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id_salesman", $this->id_salesman);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * usuwa klienta z bazy po jego id
     * @return boolean
     */
    public function delete()
    {
        
        // zapytanie delete
        $query = "DELETE FROM " . $this->table_name . " WHERE id_client = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id_client = htmlspecialchars(strip_tags($this->id_client));
        
        // powiazanie id rekordu
        $stmt->bindParam(1, $this->id_client);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            
            return true;
        }
        
        return false;
    }
    
    /**
     * odczytuje jeden rekord po id klienta
     */
    public function readOne()
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_client = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id klienta do zaaktualizowania
        $stmt->bindParam(1, $this->id_client);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $this->name = $row['name'];
        $this->surname = $row['surname'];
        $this->address = $row['address'];
        $this->city = $row['city'];
        $this->email = $row['email'];
        $this->status = $row['status'];
        $this->id_salesman = $row['id_salesman'];
    }
    
    /**
     * aktualizuje klienta po jego id
     */
    public function update()
    {
        
        // update query
        $query = "UPDATE " . $this->table_name . "
                  SET name= :name,
                    surname = :surname,
                    address = :address,
                    city = :city,
                    email = :email,
                    status = :status,
                    id_salesman = :id_salesman
                    WHERE id_client = :id";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczyszczanie z HTML
        
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        // powiązanie nowych wartosci
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id_salesman", $this->id_salesman);
        $stmt->bindParam(":id", $this->id_client);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * aktualizacja danych klienta po jego id(wykorzystywane przez aktual. danych przez samego klienta)
     * @return boolean
     */
    public function updateData()
    {
        
        // zapytanie update
        $query = "UPDATE " . $this->table_name . "
                  SET name = :name,
                    surname = :surname,
                    address = :address,
                    city = :city,
                    email = :email
                    WHERE id_client = :id";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczyszczanie z HTML
        
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->status = htmlspecialchars(strip_tags($this->status));
        
        // powiązanie nowych wartosci
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id_client);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * pobiera id klienta po jego loginie
     * @param string $username
     */
    public function readNameLogged($username)
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT id_client FROM client_register WHERE username = '".$username."'";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        
        // wykonanie zapytania
        $stmt->execute();
        
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci  dla własciwosci obiektu
        $this->id_client = $row['id_client'];
        
        
    }
    
    
    /**
     * pobiera zamowienie klienta po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readOrder($id)
    {
        $this->id_client = $id;
        
        // zapytanie o pojedynczy rekord
        $query = " SELECT nr_order, date_order, content, value_order, nr_invoice, salesman.name, salesman.surname
                FROM order_car, invoice, salesman
                WHERE
                    order_car.id_invoice = invoice.id_invoice
                AND
                    order_car.id_salesman = salesman.id_salesman
                AND
                    id_client = ".$this->id_client;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    /**
     * pobranie zamowien zrealzowanych klienta po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readOrderCompleted($id)
    {
        $this->id_client = $id;
        
        // zapytanie o pojedynczy rekord
        $query = " SELECT nr_order, date_order, content, value_order, nr_invoice, salesman.name, salesman.surname
                FROM order_car_completed, invoice_paid, salesman
                WHERE
                    order_car_completed.id_invoice_paid = invoice_paid.id_invoice_paid
                AND
                    order_car_completed.id_salesman = salesman.id_salesman
                AND
                    id_client = ".$this->id_client;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    
    /**
     * pobranie reklamacji klienta po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readComplaints($id)
    {
        $this->id_client = $id;
        
        // zapytanie o pojedynczy rekord
        $query = " SELECT * FROM complaint WHERE id_client = ".$this->id_client;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    /**
     * logowanie klienta
     * @param string $username
     * @param string $pass
     * @return boolean
     */
    public function login($username, $pass)
    {
        $this->username = $username;
        $this->pass = $pass;
        
        // zapytanie do pobranie rekordu
        $query = "SELECT * FROM client_register WHERE username='".$this->username."' AND pass='" . md5($this->pass . $this->salt) . "'";
        
        $results = $this->pdo->query($query);
        
        
        if($results->rowCount() > 0){
            
            
            return true;
            
        } else {
            
            
            return false;
            
        }
        
        
        
        
        
    }
    
    /**
     * wylogowanie klienta
     */
    function logout()
    {
        session_destroy();
    }
}

// test
// $m = new Salesman();
// $res = $m->read();
// print_r($res->fetchAll());
