<?php

include_once APP_VIEW.'view.php';

class SalesmanView extends View
{
    public function displaySalesman(){
        $this->render("salesman");
    }
   
}