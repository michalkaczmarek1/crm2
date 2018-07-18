<?php
//skrypty akcji wyswietlajacy formularz logowania admina
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

include_once APP_CONTROLLER."LoginController.php";

$login = new LoginController();
$login->loginAdminForm();

// $login = new LoginController();
// $login->loginSalesmanForm();
