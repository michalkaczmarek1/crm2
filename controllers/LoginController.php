<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_CONTROLLER.'controller.php';

class LoginController extends Controller
{
    
    /**
     * widok dla logowania admina
     */
    public function loginAdminForm() {
        $views = $this->loadView("LoginView");
        $views->loginAdminForm();
    }
    
    /**
     * widok dla logowania przedst
     */
    public function loginSalesmanForm() {
        $views = $this->loadView("LoginView");
        $views->loginSalesmanForm();
    }
    
    /**
     * widok dla logowania klienta
     */
    public function loginClientForm() {
        $views = $this->loadView("LoginView");
        $views->loginClientForm();
    }
    
    /**
     * widok ladujacy skrypty js dla panelu admina
     */
    public function displayMain() {
        $views = $this->loadView("LoginView");
        $views->displayMain();
    }
    
    /**
     * widok ladujacy skrypty js dla panelu przedst
     */
    public function displaySalesmanMain() {
        $views = $this->loadView("LoginView");
        $views->displaySalesmanMain();
    }
    
    /**
     * widok ladujacy skrypty js dla panelu klienta
     */
    public function displayClientMain() {
        $views = $this->loadView("LoginView");
        $views->displayClientMain();
    }
    
    /**
     * widok wyswietlajacy strone wylogowania
     */
    public function displayIndexRedirect() {
        $views = $this->loadView("LoginView");
        $views->displayIndexRedirect();
    }
    
}
//test
// $login = new LoginController();
// $login->addAdminForm();