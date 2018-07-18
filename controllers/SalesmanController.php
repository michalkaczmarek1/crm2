<?php
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once APP_CONTROLLER.'controller.php';

class SalesmanController extends Controller
{
    /**
     * widok dla crud przedst w panelu admina
     */
    public function displaySalesman() {
        $views = $this->loadView("SalesmanView");
        $views->displaySalesman();
    }
     
}
//test
// $login = new LoginController();
// $login->addAdminForm();