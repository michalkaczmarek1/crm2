<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa zawierajaca wlasciwosci i metody dot obslugi marketingowej
class Marketing extends Model
{
    
    
    //wlasciwosci tabeli report_preference
    public $id_report;
    
    public $name_report;
    
    public $comments;
    
    public $date_report;
    
    // wlasciwosci obiektu zwiazane z wysylka mail
    public $to;
    
    public $subject;
    
    public $meesage;
    
    public $headers;
    
    //własciwosc zwiazane z tabela message
    
    public $id_message;
    
    public $content_message;
    
    public $date_message;
    
    
    
    /**
     * aktualizowanie wybranych pol raportu preferencji
     * @param Offer $offer
     * @param Client $client
     * @param Salesman $salesman
     * @param int $id
     * @return boolean
     */
    public function updateReport(Offer $offer, Client $client, Salesman $salesman, $id)
    {
        $this->id_report = $id;
        
        
        
        // update query
        $query = "UPDATE report_preference
                 SET comments = :comments,
                    id_offer = :id_offer,
                    id_client = :id_client,
                    id_salesman = :id_salesman
                    WHERE id_report_preference = :id";
        
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->comments = htmlspecialchars(strip_tags($this->comments));
        
        // bind values
        $stmt->bindParam(":id", $this->id_report);
        $stmt->bindParam(":id_offer", $offer->id);
        $stmt->bindParam(":id_client", $client->id_client);
        $stmt->bindParam(":id_salesman", $salesman->id_salesman);
        $stmt->bindParam(":comments", $this->comments);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    
    /**
     * inicjalizuje raport preferencji
     * @param Offer $offer
     * @param Client $client
     * @param Salesman $salesman
     * @return boolean
     */
    public function initReportPreference(Offer $offer, Client $client, Salesman $salesman)
    {
        
        $number = "";
        while($number == ""){
            
            $number = rand(0, 1000);
            //nazwa raportu
            $this->name_report = "Raport preferencji nr ".date("Y-m-d")."/".$number;
            
        }
        
        //data raportu
        $this->date_report = date("Y-m-d");
        
        //query insert into
        $query = "INSERT INTO
                  report_preference (name, comments, date_report, id_offer, id_client, id_salesman)
            VALUES
                (:name, :comments, :date_report, :id_offer, :id_client, :id_salesman)";
        
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        
        // sanitize
        $this->name_report = htmlspecialchars(strip_tags($this->name_report));
        $this->comments = htmlspecialchars(strip_tags($this->comments));
        
        // bind values
        $stmt->bindParam(":name", $this->name_report);
        $stmt->bindParam(":comments", $this->comments);
        $stmt->bindParam(":date_report", $this->date_report);
        $stmt->bindParam(":id_offer", $offer->id);
        $stmt->bindParam(":id_client", $client->id_client);
        $stmt->bindParam(":id_salesman", $salesman->id_salesman);
        
        
        
        
        // execute query
        if($stmt->execute()){
            
            return true;
        } else {
            return false;
        }
        
    }
    
    /**
     * pobiera ostatni rekord z tabeli raport preferencji
     */
    public function selectLastRecord()
    {
        
        
        $query = "SELECT * FROM report_preference WHERE id_report_preference = (SELECT MAX(id_report_preference) FROM report_preference)";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->id_report = $row['id_report_preference'];
        $this->name_report = $row['name'];
        $this->comments = $row['date_report'];
        
        
    }
    
    
    /**
     * odczytuje dane potrzebne do wysyłki maila
     * @param int $id_report
     * @param Client $client
     * @param Offer $offer
     * @param Salesman $salesman
     */
    public function readDataToMail($id_report, Client $client, Offer $offer, Salesman $salesman)
    {
        
        $this->id_report = $id_report;
        
        // select query
        $query = "SELECT client.name as client_name, client.surname as client_surname, client.email as client_mail,
                offer.name as offer_name, offer.id_offer, offer.description, offer.start_date, offer.end_date, offer.reduction,
                salesman.name as salesman_name, salesman.surname as salesman_surname,
                salesman.email as salesman_mail
                FROM client, offer, salesman, report_preference
                WHERE report_preference.id_offer = offer.id_offer
                AND report_preference.id_client = client.id_client
                AND report_preference.id_salesman = salesman.id_salesman
                AND report_preference.id_report_preference = ?";
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // powiazanie parametru id
        $stmt->bindParam(1, $this->id_report);
        
        // execute query
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $client->name = $row['client_name'];
        $client->surname = $row['client_surname'];
        $client->email = $row['client_mail'];
        $offer->name = $row['offer_name'];
        $offer->id = $row['id_offer'];
        $offer->description = $row['description'];
        $offer->start_date = $row['start_date'];
        $offer->end_date = $row['end_date'];
        $offer->reduction = $row['reduction'];
        $salesman->name = $row['salesman_name'];
        $salesman->surname = $row['salesman_surname'];
        $salesman->email = $row['salesman_mail'];
        
        
    }
    
    
    /**
     * odczytuje zawartosc oferty potrzebnej do maila
     * @param int $id_offer
     * @return PDOStatement
     */
    public function readContentOffer($id_offer)
    {
        
        // select query
        $query = "SELECT car.mark, car.model, car.truck_or_delivery, car.price, car.engine, car.horsepower
                FROM car, offer, content_offer
                WHERE content_offer.id_car = car.id_car
                AND content_offer.id_offer = offer.id_offer AND content_offer.id_offer = ?";
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // bind value
        $stmt->bindParam(1, $id_offer);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
        
    }
    
    /**
     * wysyla mail do wybranego klienta
     * @param Client $client
     * @param Offer $offer
     * @param Salesman $salesman
     * @param array $data_cars
     */
    public function sendMailToClient(Client $client, Offer $offer, Salesman $salesman, $data_cars)
    {
        //odbiorca
        $this->to = $client->email;
        
        //temat maila
        $this->subject = 'Oferta '.$offer->name;
        
        //naglowki
        $this->headers = "From: " . $salesman->email . "\r\n";
        $this->headers .= "Reply-To: ". $salesman->email . "\r\n";
        $this->headers .= "CC: ".$salesman->email.'"';
        $this->headers .= "MIME-Version: 1.0\r\n";
        $this->headers .= "Content-Type: text/html; charset=utf-8\r\n";
        
        //wiadomosc
        $this->message = "<h2>".$offer->name."</h2>";
        $this->message .= "<h3>Witaj ".$client->name. " ".$client->surname."</h3>";
        $this->message .= "<p>Zgodnie z twoja dyspozycja wysyłamy ci maila z wybrana przez ciebie ofertą.</p>";
        $this->message .= "<h4>Zawartosć oferty ".$offer->name.": <h4>";
        $this->message .= "<ul>";
        
        foreach ($data_cars as $rec){
            
            foreach($rec as $key => $row){
                
                if($key == "mark_car"){
                    $this->message .= "<li>Marka: ".$row."</li>";
                }
                
                if($key == "model_car"){
                    $this->message .= "<li>Model: ".$row."</li>";
                }
                
                if($key == "truck_or_delivery"){
                    $this->message .= "<li>Rodzaj nadwozia: ".$row."</li>";
                }
                
                if($key == "price"){
                    $this->message .= "<li>Cena: ".$row." zł</li>";
                }
                
                if($key == "engine"){
                    $this->message .= "<li>Silnik: ".$row." cm3</li>";
                }
                
                if($key == "horsepower"){
                    $this->message .= "<li>Moc: ".$row." KM</li>";
                }
                
                
            }
            
            $this->message .= "---------------------------------------------";
        }
        
        $this->message .= "</ul>";
        
        $this->message .= "<p>Jesli zainteresowala Cie nasza oferta skontaktuj sie ze swoim przedstawicielem.</p>";
        
        $this->message .= "<p>Dane przedstawiciela:</p>";
        
        $this->message .= "<p>".$salesman->name. " ".$salesman->surname."</p>";
        $this->message .= "<p>Adres mailowy: ".$salesman->email."</p>";
        
        $this->message .= "<p>Z poważaniem</p>";
        $this->message .= "<p>".$salesman->name. " ".$salesman->surname."</p>";
        
        //wyslanie maila
        
        if(mail($this->to, $this->subject, $this->message, $this->headers)){
            return true;
        } else {
            return false;
        }
        
        
    }
    
    /**
     * tworzy wiadomosc w bazie
     * @param Client $client
     * @param Salesman $salesman
     * @return boolean
     */
    public function createMessage(Client $client, Salesman $salesman)
    {
        
        
        $this->date_message = date("Y-m-d");
        
        // query to insert record
        $query = "INSERT INTO
                message(content, date_message, id_client, id_salesman)
            VALUES
                (:content, :date, :id_client, :id_salesman)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->content_message = htmlspecialchars(strip_tags($this->content_message));
        
        // bind values
        $stmt->bindParam(":content", $this->content_message);
        $stmt->bindParam(":date", $this->date_message);
        $stmt->bindParam(":id_client", $client->id_client);
        $stmt->bindParam(":id_salesman", $salesman->id_salesman);
        
        // execute query
        if ($stmt->execute()) {
            
            return true;
        }
        
        return false;
    }
    
    
    
    
    
    
    
    
    
}

// test
// $m = new Admin();
// print_r($m);

