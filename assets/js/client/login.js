
//obsluga zalogowanego usera
$(document).ready(function(){	
	$(document).on("click","#log-client", function(e){
		e.preventDefault();
		var route = "http://pp42877.wsbpoz.solidhost.pl/";
		
	
			$.ajax({
				url: route+"crm2.0/resources/users/client/login.php",
			    type : "GET",
			    contentType : 'application/json',
			    success : function(result) {

			    	
			    	if(result.logged){
	    				$.get(route+"crm2.0/assets/actions/action-main-client.php", function(data){
	    					
	    					$("#page-content").html(data);
	    					
	   	
	    					

	    							    				
    						
    						$("#login").html("<a href='#' id='log-out-client'>Wyloguj się</a>"+"<b>Zalogowany jako </b>"+result.client);
    						
    						// wylogowanie admina
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
						});
		    		};
			    },
				error: function(xhr, resp, text) {
	    	        // show error to console
	    	        console.log(xhr, resp, text);
	    	    }
			    				
		    });
		});
});