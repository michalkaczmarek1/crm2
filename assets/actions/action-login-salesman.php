<?php
//skrypty akcji wyswietlajacy formularz logowania przedst
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

include_once APP_CONTROLLER."LoginController.php";

$login = new LoginController();
$login->loginSalesmanForm();
