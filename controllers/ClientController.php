<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_CONTROLLER.'controller.php';

class ClientController extends Controller
{
    /**
     * widok dla crud klienta w panelu admina
     */
    public function displayClient() {
        $views = $this->loadView("ClientView");
        $views->displayClient();
    }
     
}
//test
// $login = new LoginController();
// $login->addAdminForm();