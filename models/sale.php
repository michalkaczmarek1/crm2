<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa zawierajaca wlasiwosci i metody dot obslugi sprzedazy
class Sale extends Model
{
    
    // nazwa tabeli zamowien
    private $table_name_order = "order_car";
    
    private $table_name_invoice = "invoice";
    
    // własciwosci obiektu zwiazane z zamówieniem
    public $nr_order;
    
    public $date_order;
    
    public $content;
    
    public $id_invoice_order;
    
    public $id_salesman;
    
    public $value_order;
    
    public $id_client;
    
    // własciwosci obiektu zwiazane z tabela invoice
    public $id_invoice;
    
    public $nr_invoice;
    
    public $date;
    
    // własciwosci obiektu zwiazane z tabela invoice_paid
    public $id_invoice_paid;
    
    public $nr_invoice_paid;
    
    public $date_invoice;
    
    // własciwosci obiektu zwiazane z raportem  sprzedazy
    public $id_report_sale;
    
    public $name_report;
    
    public $date_report;
    
    public $start_date;
    
    public $end_date;
    
    public $id_salesman_report;
    
    public $amount_orders;
    
    public $value_orders_report;
    
    //własciwosci obiektu zwiazane z reklamacja
    public $nr_complaint;
    
    public $content_complaint;
    
    //wlasciwosci pomocnicze
    
    public $salesman_name;
    public $salesman_surname;
    public $client_name;
    public $client_surname;
    public $client_address;
    public $client_city;
    public $client_email;
    
    
    //inicjalizacja faktury
    public function initInvoice()
    {
        
        $number = "";
        while($number == ""){
            
            $number = rand(0, 1000);
            
            $this->nr_invoice = date("Y-m-d")."/".$number;
        }
        
        
        $this->date = date("Y-m-d");
        
        // wprowadzenie faktury do bazy
        $query = "INSERT INTO
                 ".$this->table_name_invoice." (nr_invoice, date)
            VALUES
                (:nr_invoice, :date)";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // powiazanie wartosci
        $stmt->bindParam(":nr_invoice", $this->nr_invoice);
        $stmt->bindParam(":date", $this->date);
        
        
        //  wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
        
    }
    
    /**
     * odczytuje numer faktury ktory jest nastepnie wstawiany do formularza
     */
    public function readNumber()
    {
        
        $query = "SELECT * FROM invoice WHERE id_invoice = (SELECT MAX(id_invoice) FROM invoice)";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->id_invoice = $row['id_invoice'];
        $this->nr_invoice = $row['nr_invoice'];
        
        
        $data_number["nr_invoice"] = $this->nr_invoice;
        $data_number["id_invoice"] = $this->id_invoice;
        
        echo json_encode($data_number);
        
    }
    
    /**
     * pobiera dane ktore sa nastepnie wyswietlane w widoku faktury
     * @param int $id_salesman
     * @param int $nr_invoice
     */
    public function displayInvoice($id_salesman, $nr_invoice)
    {
        
        $this->id_salesman = $id_salesman;
        $this->nr_invoice = $nr_invoice;
        
        $query = " SELECT invoice_paid.nr_invoice, order_car_completed.date_order, salesman.name as salesman_name, salesman.surname as salesman_surname,
                        client.name as client_name, client.surname as client_surname,
                        order_car_completed.nr_order, order_car_completed.value_order, order_car_completed.content, client.address, client.city, client.email
                    FROM order_car_completed, invoice_paid, salesman, client
                    WHERE order_car_completed.id_invoice_paid = invoice_paid.id_invoice_paid
                    AND order_car_completed.id_salesman = salesman.id_salesman
                    AND order_car_completed.id_client = client.id_client
                    AND order_car_completed.id_salesman = ? AND invoice_paid.nr_invoice = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy parametry
        $stmt->bindParam(1, $this->id_salesman);
        $stmt->bindParam(2, $this->nr_invoice);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu.
        
        $this->nr_invoice = $row['nr_invoice'];
        $this->salesman_name = $row['salesman_name'];
        $this->salesman_surname = $row['salesman_surname'];
        $this->client_name = $row['client_name'];
        $this->client_surname = $row['client_surname'];
        $this->nr_order = $row['nr_order'];
        $this->value_order = $row['value_order'];
        $this->date_order = $row['date_order'];
        $this->content= $row['content'];
        $this->client_address = $row['address'];
        $this->client_city = $row['city'];
        $this->client_email = $row['email'];
        
    }
    /**
     * dodaje zamowienie do bazy
     * @return boolean
     */
    public function addOrder()
    {
        
        //query to insert into
        $query = "INSERT INTO
                 order_car(date_order, content, id_invoice, id_salesman, id_client, value_order)
            VALUES(:date_order, :content, :id_invoice, :id_salesman, :id_client, :value_order)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->date_order = htmlspecialchars(strip_tags($this->date_order));
        $this->content = htmlspecialchars(strip_tags($this->content));
        $this->id_invoice = htmlspecialchars(strip_tags($this->id_invoice_order));
        $this->id_salesman = htmlspecialchars(strip_tags($this->id_salesman));
        $this->id_client = htmlspecialchars(strip_tags($this->id_client));
        $this->value_order = htmlspecialchars(strip_tags($this->value_order));
        
        // bind values
        $stmt->bindParam(":date_order", $this->date_order);
        
        $stmt->bindParam(":content", $this->content);
        
        $stmt->bindParam(":id_invoice", $this->id_invoice);
        
        $stmt->bindParam(":id_salesman", $this->id_salesman);
        
        $stmt->bindParam(":id_client", $this->id_client);
        
        $stmt->bindParam(":value_order", $this->value_order);
        
        
        // execute query
        if ($stmt->execute()) {
            
            return true;
        }
        
        return false;
    }
    
    
    /**
     * oblicza wartosc zamowienia
     * @param array $prices
     */
    public function valueOrder($prices)
    {
        $this->value_order = 0;
        foreach($prices as $row){
            
            $this->value_order += $row;
            
        }
        
    }
    
    
    /**
     * realizuje zamowienie
     * @param int $nr_order
     * @return boolean
     */
    public function checkoutOrder($nr_order)
    {
        $this->nr_order = $nr_order;
        
        // zapytanie o pojedynczy rekord z tabeli zamowienia
        $query1= "SELECT * FROM " . $this->table_name_order . " WHERE nr_order = ?";
        
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query1);
        
        // wiazemy id zamowienia do realizacji
        $stmt->bindParam(1, $this->nr_order);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu.
        
        $this->date_order = $row['date_order'];
        $this->content = $row['content'];
        $this->id_invoice = $row['id_invoice'];
        $this->id_salesman = $row['id_salesman'];
        $this->id_client = $row['id_client'];
        $this->value_order = $row['value_order'];
        
        
        // pobieramy dane faktury
        $query2= "SELECT * FROM " . $this->table_name_invoice . " WHERE id_invoice = ?";
        
        // przygotowanie zapytania
        $stmt2 = $this->pdo->prepare($query2);
        
        // wiazemy id zamowienia do realizacji
        $stmt2->bindParam(1, $this->id_invoice);
        
        // wykonanie zapytania
        $stmt2->execute();
        
        // pobieramy otrzymany rekord
        $row2 = $stmt2->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu.
        
        $this->nr_invoice = $row2['nr_invoice'];
        $this->date_invoice = $row2['date'];
        
        
        
        
        //usuniecie faktury z tabeli faktur nie zapłaconych
        $query3= "DELETE FROM invoice WHERE id_invoice = ".$this->id_invoice;
        
        // przygotowanie zapytania
        $stmt3 = $this->pdo->prepare($query3);
        
        
        // wykonanie zapytania
        $stmt3->execute();
        
        
        
        //wstawienie rekordu do tabeli zamowien zrealizowanych
        $query4= "INSERT INTO
                    invoice_paid(nr_invoice, date_invoice, id_salesman)
                  VALUES(:nr_invoice, :date_invoice, :id_salesman)";
        // przygotowanie zapytania
        $stmt4 = $this->pdo->prepare($query4);
        
        
        // wiazemy wartosci
        $stmt4->bindParam(":nr_invoice", $this->nr_invoice);
        
        $stmt4->bindParam(":date_invoice", $this->date_invoice);
        
        
        
        $stmt4->bindParam(":id_salesman", $this->id_salesman);
        
        $stmt4->execute();
        
        //pobieramy dane dot faktury zaplaconej
        $query5= "SELECT * FROM invoice_paid WHERE nr_invoice = ?";
        
        // przygotowanie zapytania
        $stmt5 = $this->pdo->prepare($query5);
        
        // wiazemy id zamowienia do realizacji
        $stmt5->bindParam(1, $this->nr_invoice);
        
        // wykonanie zapytania
        $stmt5->execute();
        
        // pobieramy otrzymany rekord
        $row5 = $stmt5->fetch(PDO::FETCH_ASSOC);
        
        
        $this->id_invoice_paid = $row5['id_invoice_paid'];
        
        
        // majac wszystkie potrzebne dane wstawiamy rekord do tabeli zamowien zrealizowanych
        $query6= "INSERT INTO
                    order_car_completed (date_order, content, id_invoice_paid, id_salesman, value_order, id_client)
                  VALUES (:date_order, :content, :id_invoice_paid, :id_salesman, :value_order, :id_client)";
        // przygotowanie zapytania
        $stmt6 = $this->pdo->prepare($query6);
        
        
        // wiazemy wartosci
        $stmt6->bindParam(":date_order", $this->date_order);
        
        $stmt6->bindParam(":content", $this->content);
        
        $stmt6->bindParam(":id_invoice_paid", $this->id_invoice_paid);
        
        $stmt6->bindParam(":id_salesman", $this->id_salesman);
        
        $stmt6->bindParam(":value_order", $this->value_order);
        
        $stmt6->bindParam(":id_client", $this->id_client);
        
        if($stmt6->execute()){
            
            return true;
        } else {
            return false;
        }
        
    }
    
    /**
     * inicjalizacja raportu sprzedazy
     * @return boolean
     */
    public function initReportSale()
    {
        
        $number = "";
        while($number == ""){
            
            $number = rand(0, 1000);
            //nazwa raportu
            $this->name_report = "Raport sprzedaży nr ".date("Y-m-d")."/".$number;
            
        }
        
        //         ustalanie dat poczatkowych i koncowych
        
        // inicjalizacja start_date
        $this->start_date = new DateTime('2018-07-08');
        // inicjalizacja  end_date
        $this->end_date = new DateTime();
        
        //obliczenie roznicy w datach
        $interval = $this->start_date->diff($this->end_date);
        $diff =  $interval->format('%a');
        
        //sprawdzenie czy róznica jest mniejsza czy wieksza niz 7 dni aby ustalic ramy czasowe raportu
        if($diff <= 7){
            
            
            $this->start_date = new DateTime('2018-07-08');
            
            //zmienna robocza aby nie nadpisać $this->start_date
            $date_open = new DateTime('2018-07-08');
            
            $this->end_date = $date_open->add(new DateInterval('P7D'));
            
        } else {
            
            //zmienna robocza aby nie nadpisać $this->start_date
            $date_open = new DateTime();
            $this->start_date = $date_open->sub(new DateInterval('P7D'));
            
            
            $this->end_date = new DateTime();
            
        }
        
        
        
        //data raportu
        $this->date_report = date("Y-m-d");
        
        
        
        // wprowadzenie raportu do bazy
        $query = "INSERT INTO
                  report_sale (name, start_date, end_date, date)
            VALUES
                (:name, :start_date, :end_date, :date)";
        
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        
        // sanitize
        $this->name_report = htmlspecialchars($this->name_report);
        
        //         // bind values
        $stmt->bindParam(":name", $this->name_report);
        $stmt->bindParam(":start_date", $this->start_date->format("Y-m-d"));
        $stmt->bindParam(":end_date", $this->end_date->format("Y-m-d"));
        $stmt->bindParam(":date", $this->date_report);
        
        
        
        //         // execute query
        if($stmt->execute()){
            return true;
        } else {
            return false;
        }
        
    }
    
    /**
     * pobiera ostatni dodany raport sprzedazy
     */
    public function selectLastRecord()
    {
        
        
        $query = "SELECT * FROM report_sale WHERE id_report_sale = (SELECT MAX(id_report_sale) FROM report_sale)";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->name_report = $row['name'];
        $this->start_date = $row['start_date'];
        $this->end_date = $row['end_date'];
        $this->id_report_sale = $row['id_report_sale'];
        
        
        $query = "SELECT DISTINCT id_salesman FROM order_car_completed WHERE id_report_sale = ".$this->id_report_sale;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->id_salesman_report = $row['id_salesman'];
        
        //aktualizajca id w tabeli report_sale
        $query2 = "UPDATE report_sale
                 SET id_salesman = '".$this->id_salesman_report."'
                 WHERE id_report_sale = ".$this->id_report_sale;
        
        // przygotowanie zapytania
        $stmt2 = $this->pdo->prepare($query2);
        $stmt2->execute();
        
        
    }
    
    
    /**
     * obliczenie wartosci łacznej zamowien i ich ilosci w danym okresie( pełny raport sprzedazy)
     */
    public function calculateAmountAndValueOrders($start_date, $end_date, $id)
    {
        
        //ilosc zamowien
        $query = "SELECT COUNT(nr_order) as 'amount_orders'
        FROM order_car_completed WHERE date_order BETWEEN '".$start_date."' AND '".$end_date."'
            AND id_salesman = ".$id;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wykonanie zapytania
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->amount_orders = $row['amount_orders'];
        
        //suma zamowien
        $query2 = "SELECT sum(value_order) as 'value_orders_report'
        FROM order_car_completed WHERE date_order BETWEEN '".$start_date."' AND '".$end_date."'
            AND id_salesman = ".$id;
        
        // przygotowanie zapytania
        $stmt2 = $this->pdo->prepare($query2);
        
        // wykonanie zapytania
        $stmt2->execute();
        
        $row2 = $stmt2->fetch(PDO::FETCH_ASSOC);
        
        $this->value_orders_report = $row2['value_orders_report'];
        
    }
    
    /**
     * zapisuje reklamacje w bazie
     * @param Client $client
     * @return boolean
     */
    public function createComplaint(Client $client)
    {
        
        
        // query to insert record
        $query = "INSERT INTO
                complaint (content, id_client, nr_order)
            VALUES
                (:content, :id_client, :nr_order)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->content_complaint = htmlspecialchars(strip_tags($this->content_complaint));
        $client->id_client = htmlspecialchars(strip_tags($client->id_client));
        $this->nr_order = htmlspecialchars(strip_tags($this->nr_order));
        
        // bind values
        $stmt->bindParam(":content", $this->content_complaint);
        $stmt->bindParam(":id_client", $client->id_client);
        $stmt->bindParam(":nr_order", $this->nr_order);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
}

