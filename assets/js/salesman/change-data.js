//zmiana danych
$(document).ready(function(){
 
    var route = "http://pp42877.wsbpoz.solidhost.pl/";
    // show html form when 'update product' button was clicked
    $(document).on('click', '#change-personal-salesman', function(){
        
        
        var salesman = "true";
        
        // odczytanie rekordu do edycji
        $.getJSON(route+"crm2.0/resources/users/salesman/read-one.php", function(data){
         
            // wartosci które beda wstawione do formularza
        	var id = data.id
        	var name = data.name;
            var surname = data.surname;
            var address = data.address;
            var city = data.city;
            var email = data.email;
            
            var change_data_salesman;

            change_data_salesman = "<main>";
            change_data_salesman += "<section class='well1'>";
            change_data_salesman += "<div class='container'>";
            change_data_salesman += "<div class='alert alert-info valid-info-salesman'></div>";
            change_data_salesman += "<div class='col-md-offset-3 col-md-6'>";
             // 'read products' button to show list of products
            change_data_salesman += "<h2 class='text-center'>Edytuj dane</h2>";
            change_data_salesman += "<form role='form' action='#' method='post' id='change-data-salesman-form'>";
            change_data_salesman += "<div class='form-group'>";
            change_data_salesman += "<label for='name' class='col-md-2'> Imię: </label>";
            change_data_salesman += "<div class='col-md-10'>";
            change_data_salesman += "<input type='text' name='name' value='"+ name + "'class='form-control' placeholder='Wprowadź swoje imie'>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "<div class='form-group'>";
            change_data_salesman += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
            change_data_salesman += "<div class='col-md-10'>";
            change_data_salesman += "<input type='text' class='form-control' value='" + surname + "' name='surname' placeholder='Wprowadź swoje nazwisko'>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "<div class='form-group'>";
            change_data_salesman += "<label for='address' class='col-md-2'> Adres: </label>";
            change_data_salesman += "<div class='col-md-10'>";
            change_data_salesman += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'>" + address + "</textarea>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "<div class='form-group'>";
            change_data_salesman += "<label for='city' class='col-md-2'> Miejscowość: </label>";
            change_data_salesman += "<div class='col-md-10'>";
            change_data_salesman += "<input name='city' type='text' class='form-control' value='" + city + "' placeholder='Wprowadź swoje miasto'>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "<div class='form-group'>";
            change_data_salesman += "<label for='email' class='col-md-2'> Email: </label>";
            change_data_salesman += "<div class='col-md-10'>";
            change_data_salesman += "<input type='email' class='form-control' name='email' value='" + email + "' placeholder='Wprowadź swój adres email'>";
            change_data_salesman += "<p class='help-block'> Przykład: imie@domena.pl </p>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "<input value=\"" + id + "\" name='id' type='hidden' />";
            change_data_salesman += "<div class='row'>";
            change_data_salesman += "<div class='col-md-offset-5 col-md-10'>";
            change_data_salesman += "<p class='post'></p>";
            change_data_salesman += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
            change_data_salesman += "</div>";
            change_data_salesman += "</div>";
            change_data_salesman += "</form>";
            change_data_salesman += "<a href='#' class='btn btn-primary btn-sm active dashboard-salesman'>Wróć</a><br/>";
            change_data_salesman +="</div>";
            change_data_salesman +="</div>";
            change_data_salesman +="</div>";
            change_data_salesman +="</section>";
            change_data_salesman +="</main>";
                     

             $(".page-content-main").html(change_data_salesman);
              

        });
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#change-data-salesman-form', function(e){
         
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
	            		showDashboard(result.message);
	    	    	} else {
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