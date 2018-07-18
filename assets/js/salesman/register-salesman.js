			
//rejestracja przedstawiciela
$(document).ready(function(){
		

		
		$(document).on("click","#register-salesman-button", function(e){
			e.preventDefault();
			
			var id = $(this).attr('data-id');

			
			var admin_register_salesman;

			admin_register_salesman = "<main>";
			admin_register_salesman += "<section class='well1'>";
			admin_register_salesman += "<div class='container'>";
			admin_register_salesman += "<div class='alert alert-info valid-info-salesman'></div>";
			admin_register_salesman += "<div class='col-md-offset-3 col-md-6'>";
			admin_register_salesman += "<h2 class='text-center'>Rejestracja przedstawiciela</h2>";
			admin_register_salesman += "<form role='form' action='#' method='post' id='add-register-form'>";
			admin_register_salesman += "<div class='form-group'>";
			admin_register_salesman += "<label for='email' class='col-md-2'> Login: </label>";
			admin_register_salesman += "<div class='col-md-10'>";
			admin_register_salesman += "<input type='text' style='width: 100%;' class='form-control' name='username' placeholder='Wprowadź login'>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "<div class='form-group'>";
			admin_register_salesman += "<label for='email' class='col-md-2'> Hasło tymczasowe: </label>";
			admin_register_salesman += "<div class='col-md-10'>";
			admin_register_salesman += "<input type='password' style='width: 100%;' class='form-control' name='pass' placeholder='Wprowadź hasło'>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "<input type='hidden' name='id_salesman' value='"+ id +"'>";
			admin_register_salesman += "<div class='row'>";
			admin_register_salesman += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
			admin_register_salesman += "<p class='post'></p>";
			admin_register_salesman += "<button type='submit' class='btn btn-primary'> Zarejestruj </button>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "</div>";
			admin_register_salesman += "</form>";
	
			admin_register_salesman += "<a href='#' class='btn btn-primary btn-sm active read-salesmans'>powrót</a><br/>";
			admin_register_salesman +="</div>";
			
			admin_register_salesman +="</div>";
			admin_register_salesman +="</div>";
			admin_register_salesman +="</section>";
			admin_register_salesman +="</main>";
			
			$("#page-content-main").html(admin_register_salesman);
			changePageTitle("Rejestracja przedstawiciela - admin");
		});
		
		
		// obsługa formularza
		
		$(document).on("submit", "#add-register-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/users/salesman/register.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {
		    	        // klient utworzony, powrót do listy klientów
		    	    	if(result.error_mess){
		    	    		$(".valid-info-salesman").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showSalesmans("", "Przedstawiciel został zarejetrowany");
			    	    		
			    	    	} else  {
			    	    		$(".valid-info-salesman").html(result.error);
			    	    	}
		    	    	}
		    	        
		    	    },
		    	    error: function(xhr, resp, text) {
		    	        // pokaz błedy w konsoli
		    	        console.log(xhr, resp, text);
		    	    }
			})
			
			
		});
		
});
		
		
		
		