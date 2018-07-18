<?php
//skrypty akcji wyswietlajacy strone wylogowania
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

include_once APP_CONTROLLER."LoginController.php";

$login = new LoginController();
$login->displayIndexRedirect();
