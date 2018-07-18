//zmiana hasla dla admina
$(document).ready(function(){
	
	
	var form_html_change_pass;
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	 $(document).on('click', '#change-pass-admin', function(e){
		 e.preventDefault();
		 changePageTitle("Zmiana hasła - admin");
		 
			form_html_change_pass = '<div class="container"><div class="row">';
			form_html_change_pass += '<div class="col-md-4 col-md-offset-4">';
				form_html_change_pass += '<div class="login-panel panel panel-default">';
				form_html_change_pass += '<div class="panel-heading">';
				form_html_change_pass += '<h3 class="panel-title">Zmiana hasła</h3>';
				form_html_change_pass += '</div><div class="panel-body">';
				form_html_change_pass += '<div class="alert alert-info info-valid">';
				form_html_change_pass += '</div><form role="form" method="post" id="change-pass-form" action="#">';
				form_html_change_pass += '<fieldset>';
				form_html_change_pass += '<div class="form-group">';
				form_html_change_pass += '<input class="form-control" placeholder="wpisz stare hasło"  name="oldpass" type="password" autofocus>';
				form_html_change_pass += '</div>';
				form_html_change_pass += '<div class="form-group">';
				form_html_change_pass += '<input class="form-control" placeholder="wpisz nowe hasło" name="newpass" type="password" value="">';
				form_html_change_pass += '</div>';
				form_html_change_pass += '<div class="form-group">';
				form_html_change_pass += '<input class="form-control" placeholder="powtórz nowe hasło" name="newpass-repeat" type="password" value="">';
				form_html_change_pass += '</div>';
				form_html_change_pass += '<input type="submit" class="btn btn-lg btn-success btn-block" value="Zmień hasło">';
				form_html_change_pass += '</fieldset></form>';
				form_html_change_pass += '<a href="#" class="btn btn-primary btn-sm active dashboard-admin" >powrót</a><br/>';
				form_html_change_pass += '</div>';
				form_html_change_pass += '</div>';
				form_html_change_pass += '</div>';
				form_html_change_pass += '</div>';
				form_html_change_pass += '</div>';
		
			$("#page-content-main").html(form_html_change_pass);
			
		//	 obsługa formularza logowania
			
			$(document).on("submit", "#change-pass-form", function(e){
				
	
				
				e.preventDefault();
				
				var form_data_login = JSON.stringify($(this).serializeArray());
				
				$.ajax({
					url: route+"crm2.0/resources/users/admin/password.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data_login,
		    	    success : function(result) {
			    	        // product was created, go back to products list
	//		    	        showProducts(); kolejny ajax?
			    	    	
	//		    			 wyswietlenie listy przedstawicieli
			    			
	//		    			$(document).on("click","#login-admin", function(e){
		    	    	if(!result.error){
		    	    		$(".info-valid").html(result.message);
		    	    	} else {
		    	    		$(".info-valid").html(result.error);
		    	    	}
		    	        
		    		
		    	    },
					error: function(xhr, resp, text) {
		    	        // show error to console
		    	        console.log(xhr, resp, text);
		    	    }
			    				
	    	    });
			
			});
	 });
});



		
	