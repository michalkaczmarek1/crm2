//obsluga zalogowania admina
$(document).ready(function(){	
	$(document).on("click","#log-admin", function(e){
		e.preventDefault();
		var route = "http://pp42877.wsbpoz.solidhost.pl/";
		
		// obsługa przycisku "Administrator"		
			$.ajax({
				url: route+"crm2.0/resources/users/admin/login.php",
			    type : "GET",
			    contentType : 'application/json',
			    success : function(result) {

		    				
			    	if(result.logged){
			    		$.get(route+"crm2.0/assets/actions/action-main-admin.php", function(data){
	    					
	    					$("#page-content").html(data);
	    	
	    							    				
    						
    						$("#login").html("<a href='#' class='btn btn-danger' id='log-out'>Wyloguj się</a>"+"<b>Zalogowany jako </b>"+result.admin);
    						
    						// wylogowanie admina
    						$(document).on("click","#log-out", function(e){
    							
    							// obsługa wylogowania
    							
    							var logout_data = JSON.stringify(result.logged);
    							$.ajax({
    								  url: route+"crm2.0/resources/users/admin/logout.php",
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