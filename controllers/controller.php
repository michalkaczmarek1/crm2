<?php

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

abstract class Controller
{

    /**
     * Przekierowuje pod wskazany URL
     *
     * @param $url -
     *            URL pod ktory ma nastapic przekierowania
     */
    public function redirect(string $url)
    {
        header('Location: ' . $url);
    }

    /**
     * Ładuje obiekt klasy widoku
     *
     * @param string $name
     *            - czesciowa nazwa obiektu klasy widoku
     * @param string $path
     *            - sciezka do pliku z klasa widoku
     * @throws Exception - wyrzucany wyjatek w przypadku nie poprawnej sciezki do pliku klasy obiektu
     * @return object;
     */
    public function loadView(string $name, string $path = APP_VIEW): View
    {
        $path = $path . $name . '.php';
        $name = $name;
        try {
            if (is_file($path)) {
                require_once $path;
                $ob = new $name();
            } else {
                throw new Exception("Nie można otworzyć klasy widoku " . $name . " w sciezce " . $path);
            }
        } catch (Exception $e) {
            echo $e->getMessage() . '<br>
                Plik: ' . $e->getFile() . '<br>
                Linia: ' . $e->getLine() . '<br>
                Trace: ' . $e->getTraceAsString();
            exit();
        }
        
        return $ob;
    }


}