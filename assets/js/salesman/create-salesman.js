//nowy przedstawiciel
$(document).ready(function(){
		
		// wyświetl formularz "Dodaj przedstawiciela"
		
		$(document).on("click","#create-salesman", function(e){
			e.preventDefault();
			
				// formularz "Dodaj przedstawiciela"
			
			var admin_salesman_add_html;

			admin_salesman_add_html = "<main>";
			admin_salesman_add_html += "<section class='well1'>";
			admin_salesman_add_html += "<div class='container'>";
			admin_salesman_add_html += "<div class='alert alert-info valid-info-salesman'></div>";
			admin_salesman_add_html += "<div class='col-md-offset-3 col-md-6'>";
			admin_salesman_add_html += "<h2 class='text-center'>Dodaj przedstawiciela</h2>";
			admin_salesman_add_html += "<form role='form' action='#' method='post' id='add-sal-form'>";
			admin_salesman_add_html += "<div class='form-group'>";
			admin_salesman_add_html += "<label for='name' class='col-md-2'> Imię: </label>";
			admin_salesman_add_html += "<div class='col-md-10'>";
			admin_salesman_add_html += "<input type='text' name='name' class='form-control' placeholder='Wprowadź swoje imie'>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "<div class='form-group'>";
			admin_salesman_add_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
			admin_salesman_add_html += "<div class='col-md-10'>";
			admin_salesman_add_html += "<input type='text' class='form-control' name='surname' placeholder='Wprowadź swoje nazwisko'>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "<div class='form-group'>";
			admin_salesman_add_html += "<label for='address' class='col-md-2'> Adres: </label>";
			admin_salesman_add_html += "<div class='col-md-10'>";
			admin_salesman_add_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'></textarea>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "<div class='form-group'>";
			admin_salesman_add_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
			admin_salesman_add_html += "<div class='col-md-10'>";
			admin_salesman_add_html += "<input name='city' type='text' class='form-control' placeholder='Wprowadź swoje miasto'>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "<div class='form-group'>";
			admin_salesman_add_html += "<label for='email' class='col-md-2'> Email: </label>";
			admin_salesman_add_html += "<div class='col-md-10'>";
			admin_salesman_add_html += "<input type='email' class='form-control' name='email' placeholder='Wprowadź swój adres email'>";
			admin_salesman_add_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "<div class='row'>";
			admin_salesman_add_html += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
			admin_salesman_add_html += "<p class='post'></p>";
			admin_salesman_add_html += "<button type='submit' class='btn btn-primary'> Dodaj </button>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</div>";
			admin_salesman_add_html += "</form>";
			admin_salesman_add_html += "<a href='#' class='btn btn-primary btn-sm active read-salesmans'>Wróc do listy</a><br/>";
			admin_salesman_add_html +="</div>";
			admin_salesman_add_html +="</div>";
			admin_salesman_add_html +="</div>";
			admin_salesman_add_html +="</section>";
			admin_salesman_add_html +="</main>";
			

				$("#page-content-main").html(admin_salesman_add_html);
				 changePageTitle("Dodaj przedstawiciela - admin");
				 
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-sal-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/users/salesman/create.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {
		    	        // przedstawiciel utworzony, powrót do listy przedstawicieli
		    	    	if(result.error_mess){
		    	    		$(".valid-info-salesman").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showSalesmans("", "Rekord został poprawnie wprowadzony");
			    	    		
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



