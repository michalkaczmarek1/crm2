<?php
//strona główna aplikacji
include_once ($_SERVER['DOCUMENT_ROOT'] . "/crm2.0/config/constant.php");
include_once (APP_LAYOUT . "page-header.html.php");
?>


	<div id="page-content">
		
<!-- 		obsługa sesji admina -->
    	 <?php if(isset($_SESSION['admin'])){?>
    		<script src="<?php echo APP_JS.'login.js'?>"></script>
    	 <?php } else {?>
    	 	<script src="<?php echo APP_JS.'app.js'?>"></script>	
    	 <?php }?>

<!-- 		obsługa sesji przedstawiciela  -->    	 
    	 <?php if(isset($_SESSION['salesman'])){?>
    		<script src="<?php echo APP_JS.'salesman/login.js'?>"></script>
    	 <?php } else {?>
    	 	<script src="<?php echo APP_JS.'app-salesman.js'?>"></script>	
    	 <?php }?>
    	 
    	 <!-- 		obsługa sesji klienta  -->    	 
    	 <?php if(isset($_SESSION['client'])){?>
    		<script src="<?php echo APP_JS.'client/login.js'?>"></script>
    	 <?php } else {?>
    	 	<script src="<?php echo APP_JS.'app-client.js'?>"></script>	
    	 <?php }?>
    	 
<!--     	 szablon index -->
    	 <?php include_once APP_LAYOUT . 'index.html.php'; ?>
	</div>
	

	
	


<?php include_once APP_LAYOUT.'page-footer.html.php'; ?>