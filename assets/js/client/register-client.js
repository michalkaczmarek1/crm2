            
//formularz rejestracji klienta
$(document).ready(function(){
        
        
        
        $(document).on("click","#register-client-button", function(e){
            e.preventDefault();
            
            var id = $(this).attr('data-id');
        
            
            var admin_client_register_html;

            admin_client_register_html = "<main>";
            admin_client_register_html += "<section class='well1'>";
            admin_client_register_html += "<div class='container'>";
            admin_client_register_html += "<div class='alert alert-info valid-info-client'></div>";
            admin_client_register_html += "<div class='col-md-offset-3 col-md-6'>";
            admin_client_register_html += "<h2 class='text-center'>Rejestracja klienta</h2>";
            admin_client_register_html += "<form role='form' action='#' method='post' id='add-register-client-form'>";
            admin_client_register_html += "<div class='form-group'>";
            admin_client_register_html += "<label for='email' class='col-md-2'> Login: </label>";
            admin_client_register_html += "<div class='col-md-10'>";
            admin_client_register_html += "<input type='text' class='form-control' style='width: 100%;' name='username' placeholder='Wprowadź login'>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "<div class='form-group'>";
            admin_client_register_html += "<label for='email' class='col-md-2'> Hasło tymczasowe: </label>";
            admin_client_register_html += "<div class='col-md-10'>";
            admin_client_register_html += "<input type='password' style='width: 100%;' class='form-control' name='pass' placeholder='Wprowadź hasło'>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "<input type='hidden' name='id_client' value='"+ id +"'>";
            admin_client_register_html += "<div class='row'>";
            admin_client_register_html += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
            admin_client_register_html += "<p class='post'></p>";
            admin_client_register_html += "<button type='submit' class='btn btn-primary'> Zarejestruj </button>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "</div>";
            admin_client_register_html += "</form>";
            admin_client_register_html += "<a href='#' class='btn btn-primary btn-sm active read-clients'>powrót</a><br/>";
            admin_client_register_html +="</div>";
            
            admin_client_register_html +="</div>";
            admin_client_register_html +="</div>";
            admin_client_register_html +="</section>";
            admin_client_register_html +="</main>";
            
            $("#page-content-main").html(admin_client_register_html);
            changePageTitle("Rejestracja klienta - admin");
        });
        
        
        // obsługa formularza
        
        $(document).on("submit", "#add-register-client-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/users/client/register.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {
                        // klient utworzony, powrót do listy klientów
                        
                    	if(result.error_mess){
		    	    		$(".valid-info-client").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showClients("", "Klient został zarejetrowany");
			    	    		
			    	    	} else  {
			    	    		$(".valid-info-client").html(result.error);
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
        
        
        
        