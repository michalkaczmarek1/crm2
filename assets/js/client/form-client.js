
//formularz logowania
$(document).ready(function(){

	var login_client;
	var route = "http://pp42877.wsbpoz.solidhost.pl/";

		
	login_client = '<div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div class="login-panel panel panel-default"><div class="panel-heading"><h3 class="panel-title">Logowanie</h3></div><div class="panel-body"><div class="alert alert-info info-valid"></div><form role="form" method="post" id="login-client-form" action="#"><fieldset><div class="form-group"><input class="form-control" placeholder="username"  name="username" type="text" autofocus></div><div class="form-group"><input class="form-control" placeholder="password" name="pass" type="password" value=""></div><input type="submit" class="btn btn-lg btn-success btn-block" value="Login" id="login-salesman"></fieldset><a href="#" class="btn btn-primary btn-block contact">Wyslij wiadomość</a></form><a href="index.php" class="btn btn-primary btn-sm active" >Wróc</a><br/></div></div></div></div></div>';
		$("#page-content").html(login_client);
		
	//	 obsługa formularza logowania
	
		
		$(document).on("submit", "#login-client-form", function(e){
			

			
			e.preventDefault();
			
			var form_data_login = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				url: route+"crm2.0/resources/users/client/login.php",
	    	    type : "POST",
	    	    contentType : 'application/json',
	    	    data : form_data_login,
	    	    success : function(result) {
		    	        
	    	    	
	    	    	if(result.error){
    					validInfo(result.error);
    					
    				}
	    	    	
	    	    	

		    			
		    			if(result.logged){
		    				$.get(route+"crm2.0/assets/actions/action-main-client.php", function(data){
		    					
		    					$("#page-content").html(data);
		    					
		    					if(result.client){		    				
		    						
		    						$("#login").html("<a href='#' id='log-out-client'>Wyloguj się</a>"+"<b>Zalogowany jako </b>"+result.client);
		    						
		    						// wylogowanie 
		    						$(document).on("click","#log-out-client", function(e){
		    							
		    							// obsługa wylogowania
		    							
		    							var logout_data = JSON.stringify(result.logged);
		    							
		    							$.ajax({
		    								  url: route+"crm2.0/resources/users/client/logout.php",
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