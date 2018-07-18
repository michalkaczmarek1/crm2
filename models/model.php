<?php

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");


abstract class Model
{

    /**
     * składowa przechowujaca obiekt klasy PDO
     */
    protected $pdo;

    /**
     * Ustawia polaczenie z baza danych za pomoca interfejsu PDO.
     *
     * @return void
     */
    public function __construct()
    {
        try {
            require APP_CONFIG.'settings.php';
            $this->pdo = new PDO('mysql:host=' . $dbHost . ';dbname=' . $dbName, $dbUser, $dbPass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->exec("set names utf8");
        } catch (PDOException $e) {
            echo 'Nie można połączyć się z bazą danych z powodu błędu: ' . $e->getMessage();
        }
    }

}

