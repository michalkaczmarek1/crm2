//aktualizacja klienta
$(document).ready(function(){
 
    var route = "http://pp42877.wsbpoz.solidhost.pl/";
    // show html form when 'update product' button was clicked
    $(document).on('click', '#update-salesman-client-button', function(){
        
        
        // pobranie id przedstawiciela
        var id = $(this).attr('data-id');
        
        // odczytanie rekordu do edycji
        $.getJSON(route+"crm2.0/resources/users/client/read-one.php?id=" + id, function(data){
         
            // wartosci które beda wstawione do formularza
            var name = data.name;
            var surname = data.surname;
            var address = data.address;
            var city = data.city;
            var email = data.email;
            var status = data.status;
            
            var salesman_client_update_html;

            salesman_client_update_html = "<main>";
            salesman_client_update_html += "<section class='well1'>";
            salesman_client_update_html += "<div class='container'>";
            salesman_client_update_html += "<div class='alert alert-info valid-info-client'></div>";
            salesman_client_update_html += "<div class='col-md-offset-3 col-md-6'>";
             // 'read products' button to show list of products
            salesman_client_update_html += "<h2 class='text-center'>Edytuj klienta</h2>";
            salesman_client_update_html += "<form role='form' action='#' method='post' id='update-client-salesman-form'>";
            salesman_client_update_html += "<div class='form-group'>";
            salesman_client_update_html += "<label for='name' class='col-md-2'> Imię: </label>";
            salesman_client_update_html += "<div class='col-md-10'>";
            salesman_client_update_html += "<input type='text' name='name' value='"+ name + "'class='form-control' placeholder='Wprowadź swoje imie'>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "<div class='form-group'>";
            salesman_client_update_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
            salesman_client_update_html += "<div class='col-md-10'>";
            salesman_client_update_html += "<input type='text' class='form-control' value='" + surname + "' name='surname' placeholder='Wprowadź swoje nazwisko'>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "<div class='form-group'>";
            salesman_client_update_html += "<label for='address' class='col-md-2'> Adres: </label>";
            salesman_client_update_html += "<div class='col-md-10'>";
            salesman_client_update_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'>" + address + "</textarea>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "<div class='form-group'>";
            salesman_client_update_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
            salesman_client_update_html += "<div class='col-md-10'>";
            salesman_client_update_html += "<input name='city' type='text' class='form-control' value='" + city + "' placeholder='Wprowadź swoje miasto'>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "<div class='form-group'>";
            salesman_client_update_html += "<label for='email' class='col-md-2'> Email: </label>";
            salesman_client_update_html += "<div class='col-md-10'>";
            salesman_client_update_html += "<input type='email' class='form-control' name='email' value='" + email + "' placeholder='Wprowadź swój adres email'>";
            salesman_client_update_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html +="<div class='form-group'>";
             salesman_client_update_html +="<label for='status' class='col-md-4'>";
             salesman_client_update_html +="Wybierz&nbsp;status:";
             salesman_client_update_html +="</label>";
             salesman_client_update_html +="<div class='col-md-8'>";
             salesman_client_update_html +="<select name='status'class='form-control'>";
             
             if(status === "Zwykły"){
                 salesman_client_update_html +="<option value='Zwykły' selected='selected'>Zwykły</option>";
                 salesman_client_update_html +="<option value='Stały'>Stały</option>";
             } else {
                 salesman_client_update_html +="<option value='Zwykły'>Zwykły</option>";
                 salesman_client_update_html +="<option value='Stały' selected='selected'>Stały</option>";
             }
             
             
             salesman_client_update_html +="</select>";
             salesman_client_update_html +="</div>";
             salesman_client_update_html +="</div>";
            
             
            salesman_client_update_html += "<input value=\"" + id + "\" name='id' type='hidden' />";
            salesman_client_update_html += "<div class='row'>";
            salesman_client_update_html += "<div class='col-md-offset-5 col-md-10'>";
            salesman_client_update_html += "<p class='post'></p>";
            salesman_client_update_html += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</div>";
            salesman_client_update_html += "</form>";
            salesman_client_update_html += "<a href='#' class='btn btn-primary btn-sm active show-client-salesman'>powrót</a>";
            salesman_client_update_html +="</div>";
            salesman_client_update_html +="</div>";
            salesman_client_update_html +="</div>";
            salesman_client_update_html +="</section>";
            salesman_client_update_html +="</main>";
                     

             $(".page-content-main").html(salesman_client_update_html);
              

        });
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#update-client-salesman-form', function(e){
         
        e.preventDefault();
        
        // pobranie danych formularza
        
        var form_data=JSON.stringify($(this).serializeArray());
        
        // wysłanie danych formularz do API
        $.ajax({
            url: route+"crm2.0/resources/users/client/update.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // klient został zaaktualizowany, powrót do listy
            	 
            	if(result.error_mess){
    	    		$(".valid-info-client").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
    	    	} else {
    	    		
    	    		if(!result.error){
    	    			showClientsSalesman("", result.message);
	    	    		
	    	    	} else  {
	    	    		$(".valid-info-client").html(result.error);
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

