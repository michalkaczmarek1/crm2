
//aktualizacja przedstawiciela
$(document).ready(function(){
 
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    // show html form when 'update product' button was clicked
    $(document).on('click', '#update-salesman-button', function(){
    	
    	
    	// pobranie id przedstawiciela
    	var id = $(this).attr('data-id');
    	
    	// odczytanie rekordu do edycji
    	$.getJSON(route+"crm2.0/resources/users/salesman/read-one.php?id=" + id, function(data){
    	 
    	    // wartosci które beda wstawione do formularza
    	    var name = data.name;
    	    var surname = data.surname;
    	    var address = data.address;
    	    var city = data.city;
    	    var email = data.email;
    	    
    		var admin_salesman_update_html;

			admin_salesman_update_html = "<main>";
			admin_salesman_update_html += "<section class='well1'>";
			admin_salesman_update_html += "<div class='container'>";
			admin_salesman_update_html += "<div class='alert alert-info valid-info-salesman'></div>";
			admin_salesman_update_html += "<div class='col-md-offset-3 col-md-6'>";
			admin_salesman_update_html += "<h2 class='text-center'>Edytuj przedstawiciela</h2>";
			 // 'read products' button to show list of products
		
			admin_salesman_update_html += "<form role='form' action='#' method='post' id='update-salesman-form'>";
			admin_salesman_update_html += "<div class='form-group'>";
			admin_salesman_update_html += "<label for='name' class='col-md-2'> Imię: </label>";
			admin_salesman_update_html += "<div class='col-md-10'>";
			admin_salesman_update_html += "<input type='text' name='name' value='"+ name + "'class='form-control' placeholder='Wprowadź swoje imie'>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "<div class='form-group'>";
			admin_salesman_update_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
			admin_salesman_update_html += "<div class='col-md-10'>";
			admin_salesman_update_html += "<input type='text' class='form-control' value='" + surname + "' name='surname' placeholder='Wprowadź swoje nazwisko'>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "<div class='form-group'>";
			admin_salesman_update_html += "<label for='address' class='col-md-2'> Adres: </label>";
			admin_salesman_update_html += "<div class='col-md-10'>";
			admin_salesman_update_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'>" + address + "</textarea>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "<div class='form-group'>";
			admin_salesman_update_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
			admin_salesman_update_html += "<div class='col-md-10'>";
			admin_salesman_update_html += "<input name='city' type='text' class='form-control' value='" + city + "' placeholder='Wprowadź swoje miasto'>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "<div class='form-group'>";
			admin_salesman_update_html += "<label for='email' class='col-md-2'> Email: </label>";
			admin_salesman_update_html += "<div class='col-md-10'>";
			admin_salesman_update_html += "<input type='email' class='form-control' name='email' value='" + email + "' placeholder='Wprowadź swój adres email'>";
			admin_salesman_update_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "<input value=\"" + id + "\" name='id' type='hidden' />";
			admin_salesman_update_html += "<div class='row'>";
			admin_salesman_update_html += "<div class='col-md-offset-5 col-md-10'>";
			admin_salesman_update_html += "<p class='post'></p>";
			admin_salesman_update_html += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</div>";
			admin_salesman_update_html += "</form>";
			admin_salesman_update_html += "<a href='#' class='btn btn-primary btn-sm active read-salesmans'>powrót</a><br/>";
			admin_salesman_update_html +="</div>";
			admin_salesman_update_html +="</div>";
			admin_salesman_update_html +="</div>";
			admin_salesman_update_html +="</section>";
			admin_salesman_update_html +="</main>";
    	             

    	     $("#page-content-main").html(admin_salesman_update_html);
    	     changePageTitle("Edycja przedstawiciela - admin");

    	});
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#update-salesman-form', function(e){
         
    	e.preventDefault();
    	
    	// pobranie danych formularza
    	
    	var form_data=JSON.stringify($(this).serializeArray());
    	
    	// wysłanie danych formularz do API
    	$.ajax({
    	    url: route+"crm2.0/resources/users/salesman/update.php",
    	    type : "POST",
    	    contentType : 'application/json',
    	    data : form_data,
    	    success : function(result) {
    	        // przedstawiciel został zaaktualizowany, powrót do listy
    	    	if(result.error_mess){
    	    		$(".valid-info-salesman").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
    	    	} else {
    	    		
    	    		if(!result.error){
	    	    		showSalesmans("", "Rekord został poprawnie zaaktualizowany");
	    	    		
	    	    	} else  {
	    	    		$(".valid-info-salesman").html(result.error);
	    	    	}
    	    	}
    	    },
    	    error: function(xhr, resp, text) {
    	        // show error to console
    	        console.log(xhr, resp, text);
    	    }
    	});
         
        
    });
});