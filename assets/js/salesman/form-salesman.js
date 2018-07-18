$(document).ready(function(){

	var login_salesman;
	var route = "http://pp42877.wsbpoz.solidhost.pl/";

		
		login_salesman = '<div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div class="login-panel panel panel-default"><div class="panel-heading"><h3 class="panel-title">Logowanie</h3></div><div class="panel-body"><div class="alert alert-info info-valid"></div><form role="form" method="post" id="login-salesman-form" action="#"><fieldset><div class="form-group"><input class="form-control" placeholder="username"  name="username" type="text" autofocus></div><div class="form-group"><input class="form-control" placeholder="password" name="pass" type="password" value=""></div><input type="submit" class="btn btn-lg btn-success btn-block" value="Login" id="login-salesman"></fieldset></form><a href="index.php" class="btn btn-primary btn-sm active" >Wróc</a><br/></div></div></div></div></div>';
		$("#page-content").html(login_salesman);
		
	//	 obsługa formularza logowania
		
		$(document).on("submit", "#login-salesman-form", function(e){
			

			
			e.preventDefault();
			
			var form_data_login = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				url: route+"crm2.0/resources/users/salesman/login.php",
	    	    type : "POST",
	    	    contentType : 'application/json',
	    	    data : form_data_login,
	    	    success : function(result) {
		    	        
	    	    	
//		    			 wyswietlenie listy przedstawicieli
	    	    	
	    	    	if(result.error){
    					validInfo(result.error);
    					
    				}
		    			
		    			if(result.logged){
		    				$.get(route+"crm2.0/assets/actions/action-main-salesman.php", function(data){
		    					
		    					$("#page-content").html(data);
		    					
		    					if(result.salesman){		    				
		    						
		    						$("#login").html("<a href='#' id='log-out-salesman'>Wyloguj się</a>"+"<b>Zalogowany jako </b>"+result.salesman);
		    						
		    						// wylogowanie przedstawiciela
		    						$(document).on("click","#log-out-salesman", function(e){
		    							
		    							// obsługa wylogowania
		    							
		    							var logout_data = JSON.stringify(result.logged);
		    							
		    							$.ajax({
		    								  url: route+"crm2.0/resources/users/salesman/logout.php",
		    						    	    type : "POST",
		    						    	    contentType : 'application/json',
		    						    	    data : logout_data,
		    						    	    success : function(res) {
		    						    	        
		    						    	    	$.get(route+"crm2.0/assets/actions/action-logout.php", function(data){
		    		    								
		    						    	    
		    						    	    		if(res.logout){
		    						    	    			
		    						    	    			$("#page-content").html(data);
		    						    	    			$("#logout").html("<b>"+res.logout+"</b>");
		    						    	    		}
		    		    								
		    		    											
		    		    							});
		    						    						
		    						    	    },
		    						    	    error: function(xhr, resp, text) {
		    						    	        // show error to console
		    						    	        console.log(xhr, resp, text);
		    						    	    }
		    							});
		    								
		    						});			
		    					};
		    				});
		    	    }
	    	    },
    				error: function(xhr, resp, text) {
		    	        // show error to console
		    	        console.log(xhr, resp, text);
		    	    }
		    				
	    	    });
			
			});
});