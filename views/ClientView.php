<?php

include_once APP_VIEW.'view.php';

class CLientView extends View
{
    public function displayClient(){
        $this->render("client");
    }
   
}