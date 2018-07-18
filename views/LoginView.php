<?php

include_once APP_VIEW.'view.php';

class LoginView extends View 
{
    public function addAdminForm(){
        $this->render("addAdminForm");
    }
    
    public function loginAdminForm(){
        $this->render("loginAdminForm");
    }
    
    public function loginSalesmanForm(){
        $this->render("loginSalesmanForm");
    }
    
    public function loginClientForm(){
        $this->render("loginClientForm");
    }
    
    public function displayMain(){
        $this->render("main");
    }
    
    public function displaySalesmanMain(){
        $this->render("mainSalesman");
    }
    
    public function displayClientMain(){
        $this->render("mainClient");
    }
    
    public function displayIndexRedirect(){
        $this->render("index-redirect");
    }
}