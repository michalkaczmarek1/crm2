<?php include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");

if(isset($_SESSION['client'])){
    include_once APP_LAYOUT.'main.html.php';
} else {
    
?>



<!-- <div id="content-form-login"></div> -->


<script src="<?php echo APP_JS.'client/form-client.js'?>" <?php } ?>></script>

