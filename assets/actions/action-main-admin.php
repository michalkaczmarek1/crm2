<?php
//skrypty akcji ladujacy widoi dla przedst i klienta w adminie (crud)
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

include_once APP_CONTROLLER."LoginController.php";
include_once APP_CONTROLLER."SalesmanController.php";
require_once APP_CONTROLLER."ClientController.php";

//obsługo żadania logowania
$login = new LoginController();
$login->displayMain();

//obsługo żadan dot. przedstawicielia
$salesman = new SalesmanController();
$salesman->displaySalesman();

//obsługo żadan dot. klienta
$client = new ClientController();
$client->displayClient();
