<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';
include_once APP_MODEL . 'sale.php';

//klasa zawierajaca metody i wlasciwosci dot. przedstawiciela
class Salesman extends Model
{
    
    // nazwa tabeli
    private $table_name = "salesman";
    
    private $salt = "dhaidonad832809uadaldln";
    
    // własciwosci obiektu
    
    public $username;
    
    public $pass;
    
    public $id_salesman;
    
    public $name;
    
    public $surname;
    
    public $address;
    
    public $city;
    
    public $email;
    
    // wlasciwosci obiektu dotyczace spotkania
    public $date_meeting;
    
    public $comments;
    
    
    /**
     * pobiera przestawicieli z bazy
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
     * pobiera klientów przedstawiciela z bazy
     * @param int $id
     * @return PDOStatement
     */
    public function readClients($id)
    {
        $this->id_salesman = $id;
        
        // select all query
        $query = "SELECT * FROM client WHERE id_salesman = ?";
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id_salesman = htmlspecialchars(strip_tags($this->id_salesman));
        
        // powiazanie id rekordu
        $stmt->bindParam(1, $this->id_salesman);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    
    /**
     * zapisuje przedstawiciela w bazie
     * @return boolean
     */
    public function create()
    {
        
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . " (name, surname, address, city, email)
            VALUES
                (:name, :surname, :address, :city, :email)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->email = htmlspecialchars(strip_tags($this->email));
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":email", $this->email);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        } else {
            
            return false;
        }
        
    }
    
    /**
     * usuwa przedstawiciela z bazy
     * @return boolean
     */
    public function delete()
    {
        
        // zapytanie delete
        $query = "DELETE FROM " . $this->table_name . " WHERE id_salesman = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id_salesman = htmlspecialchars(strip_tags($this->id_salesman));
        
        // powiazanie id rekordu
        $stmt->bindParam(1, $this->id_salesman);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * pobiera przedstawiciela z bazy po jego id
     */
    public function readOne()
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_salesman = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id przedstawiciela do zaaktualizowania
        $stmt->bindParam(1, $this->id_salesman);
        
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
    }
    
    /**
     * pobiera imiona i nazwiska przedstawiciela z bazy
     * @param int $id
     */
    public function readName($id = null)
    {
        
        $this->id_salesman = $id;
        
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT name, surname FROM " . $this->table_name . " WHERE id_salesman = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id przedstawiciela do zaaktualizowania
        $stmt->bindParam(1, $this->id_salesman);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $this->name = $row['name'];
        $this->surname = $row['surname'];
        
    }
    
    /**
     * pobiera id przedstawiciela po jego loginie
     * @param string $username
     */
    public function readNameLogged($username)
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT id_salesman FROM salesman_register WHERE username = '".$username."'";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        
        // wykonanie zapytania
        $stmt->execute();
        
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci  dla własciwosci obiektu
        $this->id_salesman = $row['id_salesman'];
        // ustawia imie i nazwisko przedstawiciela
        $this->readName($this->id_salesman);
        
    }
    
    /**
     * aktualizuje dane przedstawiciela
     * @return boolean
     */
    public function update()
    {
        
        // zapytanie aktualizujace
        $query = "UPDATE " . $this->table_name . "
                 SET name = :name,
                    surname = :surname,
                    address = :address,
                    city = :city,
                    email = :email
                    WHERE id_salesman = :id";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczyszczanie z HTML
        
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->email = htmlspecialchars(strip_tags($this->email));
        
        // powiązanie nowych wartosci
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id_salesman);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * pobiera zamowienia przedstawiciela z bazy po jego id
     * @param int $id
     * @return PDOStatement
     */
    function readOrderSalesman($id)
    {
        $this->id_salesman = $id;
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT nr_order, date_order, content, value_order, nr_invoice, client.name, client.surname FROM "
            . $this->table_name . ", invoice, order_car, client
                  WHERE
                    order_car.id_invoice = invoice.id_invoice
                  AND
                    order_car.id_salesman = salesman.id_salesman
                  AND
                    order_car.id_client = client.id_client
                  AND
                    order_car.id_salesman=".$this->id_salesman;
            
            // przygotowanie zapytania
            $stmt = $this->pdo->prepare($query);
            
            // wykonanie zapytania
            $stmt->execute();
            
            return $stmt;
            
    }
    
    /**
     * pobiera zrealizowane zamowienia przedstawiciela po jego id
     * @param int $id_report_sale
     * @param int $id_salesman
     * @param string $start_date
     * @param string $end_date
     * @return PDOStatement
     */
    public function readOrderSalesmanCompleted($id_report_sale, $id_salesman, $start_date, $end_date)
    {
        
        $this->id_salesman = $id_salesman;
        
        
        //aktualizacja rekordu id_report_sale w bazie
        $query = "UPDATE order_car_completed
                 SET order_car_completed.id_report_sale = :id_report
                 WHERE date_order
                BETWEEN :start_date AND :end_date
                AND order_car_completed.id_salesman = :id_salesman";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id_salesman = htmlspecialchars(strip_tags($this->id_salesman));
        $id_report_sale = htmlspecialchars(strip_tags($id_report_sale));
        $start_date = htmlspecialchars(strip_tags($start_date));
        $end_date = htmlspecialchars(strip_tags($end_date));
        
        // powiazanie wartosci
        $stmt->bindParam(":id_report", $id_report_sale);
        
        $stmt->bindParam("id_salesman", $this->id_salesman);
        
        $stmt->bindParam(":start_date", $start_date);
        
        $stmt->bindParam(":end_date", $end_date);
        
        
        $stmt->execute();
        
        
        //date_order miesci sie w start_date i end-date
        $query2 = " SELECT nr_order, date_order, content, nr_invoice, value_order, client.name, client.surname FROM invoice_paid, client, order_car_completed, report_sale, salesman
                    WHERE
                        order_car_completed.date_order BETWEEN '".$start_date."' AND '".$end_date."'
                    AND
                        order_car_completed.id_salesman = salesman.id_salesman
                    AND
                        order_car_completed.id_invoice_paid = invoice_paid.id_invoice_paid
                    AND
                        order_car_completed.id_client = client.id_client
                    AND
                        order_car_completed.id_report_sale = report_sale.id_report_sale
                    AND
                        salesman.id_salesman = ".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt2 = $this->pdo->prepare($query2);
        
        // wykonanie zapytania
        $stmt2->execute();
        
        return $stmt2;
        
    }
    
    
    
    /**
     * pobiera faktury przedstawiciela po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readInvoicesSalesman($id)
    {
        $this->id_salesman = $id;
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT invoice_paid.nr_invoice, order_car_completed.value_order, invoice_paid.id_invoice_paid
                FROM invoice_paid, order_car_completed, salesman
                WHERE invoice_paid.id_invoice_paid = order_car_completed.id_invoice_paid
                AND order_car_completed.id_salesman = salesman.id_salesman
                AND order_car_completed.id_salesman = ".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    
    /**
     * pobranie klientow przedstawiciela po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readClientsSalesman($id)
    {
        $this->id_salesman = $id;
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT client.id_client, client.name, client.surname
                FROM client, salesman
                WHERE client.id_salesman = salesman.id_salesman
                AND client.id_salesman = ".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    /**
     * zapisuje spotkanie w bazie
     * @param Client $client
     * @return boolean
     */
    public function createMeeting(Client $client)
    {
        
        
        // query to insert record
        $query = "INSERT INTO
                  meeting(date_meeting, id_client, comments, id_salesman)
            VALUES
                (:date_meeting, :id_client, :comments, :id_salesman)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->date_meeting = htmlspecialchars(strip_tags($this->date_meeting));
        $client->id_client = htmlspecialchars(strip_tags($client->id_client));
        $this->comments = htmlspecialchars(strip_tags($this->comments));
        $this->id_salesman = htmlspecialchars(strip_tags($this->id_salesman));
        
        
        // bind values
        $stmt->bindParam(":date_meeting", $this->date_meeting);
        $stmt->bindParam(":id_client", $client->id_client);
        $stmt->bindParam(":comments", $this->comments);
        $stmt->bindParam(":id_salesman", $this->id_salesman);
        
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * odczytuje spotkanie przedstawiciela
     * @param int $id
     * @return PDOStatement
     */
    public function readMeetings($id)
    {
        $this->id_salesman = $id;
        
        // select all query
        $query = "SELECT date_meeting, client.name, client.surname, comments
                FROM meeting, client
                WHERE meeting.id_client = client.id_client
                AND meeting.id_salesman=".$this->id_salesman;
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    
    /**
     * pobiera raporty preferencji wyslane przez przedstawiciela
     * @param Marketing $marketing
     * @param Offer $offer
     * @param Client $client
     * @param int $id
     * @return PDOStatement
     */
    public function getReportPreference(Marketing $marketing, Offer $offer, Client $client, $id)
    {
        
        $this->id_salesman = $id;
        
        $query = " SELECT report_preference.name as report_name, report_preference.comments,
                report_preference.date_report, report_preference.id_report_preference, offer.name as offer_name, client.name as client_name,
                client.surname as client_surname FROM report_preference, offer, client, salesman
                WHERE report_preference.id_offer = offer.id_offer
                AND report_preference.id_client = client.id_client
                AND report_preference.id_salesman = salesman.id_salesman
                AND report_preference.id_salesman =".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
        
    }
    
    /**
     * pobiera wiadomosci przedstawiciela po jego id
     * @param int $id
     * @return PDOStatement
     */
    public function readMessages($id)
    {
        $this->id_salesman = $id;
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT id_message, content, date_message, client.name, client.surname
                FROM message, client
                WHERE message.id_client = client.id_client
                AND message.id_salesman = ".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    
    /**
     * pobiera wiadomosci dla przedstawiciela od niestałych klientów
     * @param int $id
     * @return PDOStatement
     */
    public function readMessagesClientPlain($id)
    {
        $this->id_salesman = $id;
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT id_message, content, date_message
                FROM message
                WHERE message.id_client is null
                AND message.id_salesman = ".$this->id_salesman;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        return $stmt;
        
    }
    
    /**
     * logowanie przedstawiciela
     * @param string $username
     * @param string $pass
     * @return boolean
     */
    public function login($username, $pass)
    {
        $this->username = $username;
        $this->pass = $pass;
        
        // zapytanie do pobranie rekordu
        $query = "SELECT * FROM salesman_register WHERE username='".$this->username."' AND pass='" . md5($this->pass . $this->salt) . "'";
        
        $results = $this->pdo->query($query);
        
        
        if($results->rowCount() > 0){
            
            
            return true;
            
        } else {
            
            
            return false;
            
        }
        
        
        
        
        
    }
    
    /**
     * wylogowuje przedstawiciela
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
// michal1988 1234!
// jan22 1234@