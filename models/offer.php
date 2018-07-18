<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_MODEL . 'model.php';

//klasa zawierajaca metody i wlasciwosci dot oferty
class Offer extends Model
{
    
    // nazwa tabeli
    private $table_name = "offer";
    
    
    
    //wlasciwosci obiektu
    public $id;
    
    public $name;
    
    public $date_offer;
    
    public $start_date;
    
    public $end_date;
    
    public $description;
    
    public $reduction;
    
    
    
    /**
     * pobiera rekordy z bazy
     * @return PDOStatement
     */
    public function read()
    {
        
        // select all query
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY date_offer DESC";
        
        // prepare query statement
        $stmt = $this->pdo->prepare($query);
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    /**
     * zapisuje rekord w bazie
     * @return boolean
     */
    public function create()
    {
        
        
        //set start date
        $this->date_offer = date("Y-m-d");
        
        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . " (name, date_offer, start_date, end_date, description, reduction)
            VALUES
                (:name, :date_offer, :start_date, :end_date, :description, :reduction)";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->date_offer = htmlspecialchars(strip_tags($this->date_offer));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->reduction = htmlspecialchars(strip_tags($this->reduction));
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":date_offer", $this->date_offer);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":reduction", $this->reduction);
        
        // execute query
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * aktualizuje oferte w bazie danych
     * @return boolean
     */
    public function update()
    {
        
        // update query
        $query = "UPDATE " . $this->table_name . "
                 SET name = :name,
                    start_date = :start_date,
                    end_date = :end_date,
                    description = :description,
                    reduction = :reduction
                    WHERE id_offer = :id";
        
        // prepare query
        $stmt = $this->pdo->prepare($query);
        
        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->reduction = htmlspecialchars(strip_tags($this->reduction));
        
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":reduction", $this->reduction);
        $stmt->bindParam(":id", $this->id);
        
        // execute statement
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * usuwa oferte z bazy po jej id
     */
    public function delete()
    {
        
        // zapytanie delete
        $query = "DELETE FROM " . $this->table_name . " WHERE id_offer = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // oczysczenie z HTML
        $this->id = htmlspecialchars(strip_tags($this->id));
        
        // powiazanie id rekordu
        $stmt->bindParam(1, $this->id);
        
        // wykonanie zapytania
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
    
    /**
     * pobiera rekord z bazy danych po id oferty
     */
    public function readOne()
    {
        
        // zapytanie o pojedynczy rekord
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_offer = ?";
        
        // przygotowanie zapytania
        $stmt = $this->pdo->prepare($query);
        
        // wiazemy id przedstawiciela do zaaktualizowania
        $stmt->bindParam(1, $this->id);
        
        // wykonanie zapytania
        $stmt->execute();
        
        // pobieramy otrzymany rekord
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // ustawienie wartosci dla własciwosci obiektu
        $this->name = $row['name'];
        $this->date_offer = $row['date_offer'];
        $this->start_date = $row['start_date'];
        $this->end_date = $row['end_date'];
        $this->description = $row['description'];
        $this->reduction = $row['reduction'];
    }
    
    
}

// test
// $m = new Admin();
// print_r($m);
