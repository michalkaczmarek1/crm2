<?php
////skrypty akcji ladujacy skrypty js dla panelu przedst
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

include_once APP_CONTROLLER."LoginController.php";


//obsługo żadania panelu przedstawiciela
$login = new LoginController();
$login->displaySalesmanMain();

