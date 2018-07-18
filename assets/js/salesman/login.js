//obsluga zalogowanego usera
$(document).ready(function(){	
	$(document).on("click","#log-salesman", function(e){
		e.preventDefault();
		var route = "http://pp42877.wsbpoz.solidhost.pl/";
		
		// obsługa przycisku "Przedstawiciel"		
			$.ajax({
				url: route+"crm2.0/resources/users/salesman/login.php",
			    type : "GET",
			    contentType : 'application/json',
			    success : function(result) {

			    	
			    	if(result.logged){
	    				$.get(route+"crm2.0/assets/actions/action-main-salesman.php", function(data){
	    					
	    					$("#page-content").html(data);
	    					
	   	
	    					

	    							    				
    						
    						$("#login").html("<a href='#' id='log-out-salesman'>Wyloguj się</a>"+"<b>Zalogowany jako </b>"+result.salesman);
    						
    						// wylogowanie admina
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