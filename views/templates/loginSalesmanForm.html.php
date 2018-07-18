<?php include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

if(isset($_SESSION['salesman'])){
    include_once APP_LAYOUT.'mainSalesman.html.php';
} else {
    
?>



<!-- <div id="content-form-login"></div> -->


<script src="<?php echo APP_JS.'salesman/form-salesman.js'?>" <?php } ?>></script>

