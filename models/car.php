<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa zawierajaca metody i własciwosc dot samochodów
class Car extends Model
{
    
    // nazwa tabeli z bazy
    private $table_name = "car";
    
    
    
    // własciwosci obiektu
    public $id_car;
    
    public $mark;
    
    public $model;
    
    public $engine;
    
    public $horsepower;
    
    public $truck_or_delivery;
    
    public $price;
    
    
    /**
     * odczytuje rekordy z tabeli
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
     * dodaje samochod do bazy
     * @return boolean
     */
    public function create()
    {
        
        //ustalenie daty wprowadzenia oferty
        $this->date_offer = date("Y-m-d");
        
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . " (mark, model, engine, horsepower, truck_or_delivery, price)
            VALUES
                (:mark, :model, :engine, :horsepower, :truck_or_delivery, :price)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->mark = htmlspecialchars(strip_tags($this->mark));
        $this->model = htmlspecialchars(strip_tags($this->model));
        $this->engine = htmlspecialchars(strip_tags($this->engine));
        $this->horsepower = htmlspecialchars(strip_tags($this->horsepower));
        $this->truck_or_delivery = htmlspecialchars(strip_tags($this->truck_or_delivery));
        $this->price = htmlspecialchars(strip_tags($this->price));
        
        // bind values
        $stmt->bindParam(":mark", $this->mark);
        $stmt->bindParam(":model", $this->model);
        $stmt->bindParam(":engine", $this->engine);
        $stmt->bindParam(":horsepower", $this->horsepower);
        $stmt->bindParam(":truck_or_delivery", $this->truck_or_delivery);
        $stmt->bindParam(":price", $this->price);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * odczytuje jeden rekord z bazy po jego id
     */
    public function readOne()
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_car = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id samochodu do zaaktualizowania
        $stmt->bindParam(1, $this->id_car);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $this->mark = $row['mark'];
        $this->model = $row['model'];
        $this->engine = $row['engine'];
        $this->horsepower = $row['horsepower'];
        $this->truck_or_delivery = $row['truck_or_delivery'];
        $this->price = $row['price'];
    }
    
    /**
     * aktualizuje rekord w bazie po jego id
     * @return boolean
     */
    public function update()
    {
        // update query
        $query = "UPDATE " . $this->table_name . "
                 SET mark = :mark,
                    model = :model,
                    engine = :engine,
                    horsepower = :horsepower,
                    truck_or_delivery = :truck_or_delivery,
                    price = :price
                    WHERE id_car = :id";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->mark = htmlspecialchars(strip_tags($this->mark));
        $this->model = htmlspecialchars(strip_tags($this->model));
        $this->engine = htmlspecialchars(strip_tags($this->engine));
        $this->horsepower = htmlspecialchars(strip_tags($this->horsepower));
        $this->truck_or_delivery = htmlspecialchars(strip_tags($this->truck_or_delivery));
        $this->price = htmlspecialchars(strip_tags($this->price));
        
        // bind values
        $stmt->bindParam(":mark", $this->mark);
        $stmt->bindParam(":model", $this->model);
        $stmt->bindParam(":engine", $this->engine);
        $stmt->bindParam(":horsepower", $this->horsepower);
        $stmt->bindParam(":truck_or_delivery", $this->truck_or_delivery);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":id", $this->id_car);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * usuwa samochod z bazy po jego id
     * @return boolean
     */
    public function delete()
    {
        
        // zapytanie delete
        $query = "DELETE FROM " . $this->table_name . " WHERE id_car = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id_car = htmlspecialchars(strip_tags($this->id_car));
        
        // powiazanie id rekordu
        $stmt->bindParam(1, $this->id_car);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    
    /**
     * przypisuje samochody do wybranej oferty i zapisuje dane w specjalne tabeli(content_offer)
     * @param Offer $offer - obiekt oferty
     * @return boolean
     */
    public function createContentOffer(Offer $offer)
    {
        
        
        // query to insert record
        $query = "INSERT INTO
                content_offer (id_car, id_offer)
            VALUES
                (:id_car, :id_offer)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->id_car = htmlspecialchars(strip_tags($this->id_car));
        $offer->id = htmlspecialchars(strip_tags($offer->id));
        
        // bind values
        $stmt->bindParam(":id_car", $this->id_car);
        $stmt->bindParam(":id_offer", $offer->id);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    
    /**
     * odczytuje modele z bazy
     */
    public function readModels()
    {
        
        $data = array();
        // zapytanie o pojedynczy rekord
        $query = "SELECT id_car, mark, model, engine, horsepower, truck_or_delivery FROM " . $this->table_name;
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        
        // wykonanie zapytania
        $stmt->execute();
        
        if($stmt->rowCount() > 0){
            
            $models_arr['records'] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // wydzielamy wiersz
                // wtedy $row['name'] bedzie można odczytać
                // przez $name (kolumna "name")
                
                extract($row);
                
                $model_item = array(
                    "id_car" => $id_car,
                    "mark" => $mark,
                    "model" => $model,
                    "engine" => $engine,
                    "horsepower" => $horsepower,
                    "truck_or_delivery" => $truck_or_delivery
                );
                
                
                array_push($models_arr["records"], $model_item);
            }
            
            echo json_encode($models_arr);
            
        } else {
            echo json_encode(array(
                "message" => "Nie znaleziono modelów samochodów."
            ));
        }
        
    }
    
    
    /**
     * pobiera cene samachodu z bazy (f pomocnicza dla obliczania wartosci zamowienia)
     * @param int $id
     */
    public function getPrice($id)
    {
        
        $this->id_car = $id;
        
        $price = array();
        // zapytanie o ceny
        
        $query = "SELECT price FROM car WHERE id_car = '".$this->id_car."'";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        
        // wykonanie zapytania
        $stmt->execute();
        
        if($stmt->rowCount() > 0){
            
            $record = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->price = $record['price'];
            
        }
        
    }
    
    /**
     * odczytuje dane samochodów po ich id
     * @param int $id
     */
    public function readName($id = null)
    {
        
        $this->id_car = $id;
        
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT mark, model, engine, horsepower, truck_or_delivery FROM " . $this->table_name . " WHERE id_car = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id samochodu do zaaktualizowania
        $stmt->bindParam(1, $this->id_car);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $this->mark = $row['mark'];
        $this->model = $row['model'];
        $this->engine = $row['engine'];
        $this->horsepower = $row['horsepower'];
        $this->truck_or_delivery = $row['truck_or_delivery'];
        
    }
    
    
    
}

