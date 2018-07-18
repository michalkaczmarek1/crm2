
//formularz zmiany danych
$(document).ready(function(){
 
    var route = "http://pp42877.wsbpoz.solidhost.pl/";

    $(document).on('click', '#change-personal-client', function(){
        
        
        var salesman = "true";
        

        $.getJSON(route+"crm2.0/resources/users/client/read-one.php", function(data){
         
            // wartosci które beda wstawione do formularza
            var id = data.id
            var name = data.name;
            var surname = data.surname;
            var address = data.address;
            var city = data.city;
            var email = data.email;
            
            var change_data_client;

            change_data_client = "<main>";
            change_data_client += "<section class='well1'>";
            change_data_client += "<div class='container'>";
            change_data_client += "<div class='alert alert-info valid-info-client'></div>";
            change_data_client += "<div class='col-md-offset-3 col-md-6'>";
             
            change_data_client += "<h2 class='text-center'>Edytuj dane</h2>";
            change_data_client += "<form role='form' action='#' method='post' id='change-data-client-form'>";
            change_data_client += "<div class='form-group'>";
            change_data_client += "<label for='name' class='col-md-2'> Imię: </label>";
            change_data_client += "<div class='col-md-10'>";
            change_data_client += "<input type='text' name='name' value='"+ name + "'class='form-control' placeholder='Wprowadź swoje imie'>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "<div class='form-group'>";
            change_data_client += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
            change_data_client += "<div class='col-md-10'>";
            change_data_client += "<input type='text' class='form-control' value='" + surname + "' name='surname' placeholder='Wprowadź swoje nazwisko'>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "<div class='form-group'>";
            change_data_client += "<label for='address' class='col-md-2'> Adres: </label>";
            change_data_client += "<div class='col-md-10'>";
            change_data_client += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'>" + address + "</textarea>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "<div class='form-group'>";
            change_data_client += "<label for='city' class='col-md-2'> Miejscowość: </label>";
            change_data_client += "<div class='col-md-10'>";
            change_data_client += "<input name='city' type='text' class='form-control' value='" + city + "' placeholder='Wprowadź swoje miasto'>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "<div class='form-group'>";
            change_data_client += "<label for='email' class='col-md-2'> Email: </label>";
            change_data_client += "<div class='col-md-10'>";
            change_data_client += "<input type='email' class='form-control' name='email' value='" + email + "' placeholder='Wprowadź swój adres email'>";
            change_data_client += "<p class='help-block'> Przykład: imie@domena.pl </p>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "<input value=\"" + id + "\" name='id' type='hidden' />";
            change_data_client += "<div class='row'>";
            change_data_client += "<div class='col-md-offset-5 col-md-10'>";
            change_data_client += "<p class='post'></p>";
            change_data_client += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
            change_data_client += "</div>";
            change_data_client += "</div>";
            change_data_client += "</form>";
            change_data_client += "<a href='#' class='btn btn-primary btn-sm active dashboard-client'>Wróć</a><br/>";
            change_data_client +="</div>";
            change_data_client +="</div>";
            change_data_client +="</div>";
            change_data_client +="</section>";
            change_data_client +="</main>";
                     

             $(".page-content-main").html(change_data_client);
              
        });
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#change-data-client-form', function(e){
         
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
                // dane zostały zaaktualizowane, powrót do kokpitu
                
            	if(result.error_mess){
    	    		$(".valid-info-client").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
    	    	} else {
	                if(!result.error){
	                	showDashboardClient(result.message);
	    	    	} else {
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