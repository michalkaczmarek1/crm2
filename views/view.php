<?php

include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

abstract class View
{



    /**
     * Dołącza widoki.
     *
     * @return void
     */
    public function render($name, $path = APP_LAYOUT)
    {
        $path = $path . $name . '.html.php';
        try {
            if (is_file($path)) {
                require $path;
            } else {
                throw new Exception('Nie można otworzyć widoku ' . $name . ' w scieżce ' . $path);
            }
        } catch (Exception $e) {
            echo $e->getMessage() . '<br />
                File: ' . $e->getFile() . '<br />
                Code line: ' . $e->getLine() . '<br />
                Trace: ' . $e->getTraceAsString();
            exit();
        }
    }

    /**
     * Ustawia dane.
     *
     * @param string $name
     * @param mixed $value
     *
     * @return void
     */
    public function set($name, $value)
    {
        $this->$name = $value;
    }

    /**
     * Pobiera dane.
     *
     * @param string $name
     *
     * @return mixed
     */
    public function get($name)
    {
        return $this->$name;
    }
}