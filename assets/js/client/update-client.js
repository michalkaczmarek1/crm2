//formularz edycji klienta
$(document).ready(function(){
 
	var route = "http://pp42877.wsbpoz.solidhost.pl/";

    $(document).on('click', '#update-client-button', function(){
    	
    	

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
    	    var sal_name = data.sal_name;
    	    var sal_surname = data.sal_surname;
    	    var id_salesman = data.id_salesman;
    	    
    		var admin_client_update_html;

			admin_client_update_html = "<main>";
			admin_client_update_html += "<section class='well1'>";
			admin_client_update_html += "<div class='container'>";
			admin_client_update_html += "<div class='alert alert-info valid-info-client'></div>";
			admin_client_update_html += "<div class='col-md-offset-3 col-md-6'>";

			admin_client_update_html += "<h2 class='text-center'>Edytuj klienta</h2>";
			admin_client_update_html += "<form role='form' action='#' method='post' id='update-client-form'>";
			admin_client_update_html += "<div class='form-group'>";
			admin_client_update_html += "<label for='name' class='col-md-2'> Imię: </label>";
			admin_client_update_html += "<div class='col-md-10'>";
			admin_client_update_html += "<input type='text' name='name' value='"+ name + "'class='form-control' placeholder='Wprowadź swoje imie'>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "<div class='form-group'>";
			admin_client_update_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
			admin_client_update_html += "<div class='col-md-10'>";
			admin_client_update_html += "<input type='text' class='form-control' value='" + surname + "' name='surname' placeholder='Wprowadź swoje nazwisko'>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "<div class='form-group'>";
			admin_client_update_html += "<label for='address' class='col-md-2'> Adres: </label>";
			admin_client_update_html += "<div class='col-md-10'>";
			admin_client_update_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź swój adres'>" + address + "</textarea>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "<div class='form-group'>";
			admin_client_update_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
			admin_client_update_html += "<div class='col-md-10'>";
			admin_client_update_html += "<input name='city' type='text' class='form-control' value='" + city + "' placeholder='Wprowadź swoje miasto'>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "<div class='form-group'>";
			admin_client_update_html += "<label for='email' class='col-md-2'> Email: </label>";
			admin_client_update_html += "<div class='col-md-10'>";
			admin_client_update_html += "<input type='email' class='form-control' name='email' value='" + email + "' placeholder='Wprowadź swój adres email'>";
			admin_client_update_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html +="<div class='form-group'>";
			 admin_client_update_html +="<label for='status' class='col-md-4'>";
			 admin_client_update_html +="Wybierz&nbsp;status:";
			 admin_client_update_html +="</label>";
			 admin_client_update_html +="<div class='col-md-8'>";
			 admin_client_update_html +="<select name='status'class='form-control'>";
			 
			 if(status === "Zwykły"){
				 admin_client_update_html +="<option value='Zwykły' selected='selected'>Zwykły</option>";
				 admin_client_update_html +="<option value='Stały'>Stały</option>";
			 } else {
				 admin_client_update_html +="<option value='Zwykły'>Zwykły</option>";
				 admin_client_update_html +="<option value='Stały' selected='selected'>Stały</option>";
			 }
			 
			 
			 admin_client_update_html +="</select>";
			 admin_client_update_html +="</div>";
			 admin_client_update_html +="</div>";
			 admin_client_update_html +="<div id='select-salesman-update'></div>";
			 
			 getDataSalesmanUpdate(id_salesman);
			 
			admin_client_update_html += "<input value=\"" + id + "\" name='id' type='hidden' />";
			admin_client_update_html += "<div class='row'>";
			admin_client_update_html += "<div class='col-md-offset-5 col-md-10'>";
			admin_client_update_html += "<p class='post'></p>";
			admin_client_update_html += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</div>";
			admin_client_update_html += "</form>";
			admin_client_update_html += "<a href='#' class='btn btn-primary btn-sm active read-clients'>powrót</a><br/>";
			admin_client_update_html +="</div>";
			admin_client_update_html +="</div>";
			admin_client_update_html +="</div>";
			admin_client_update_html +="</section>";
			admin_client_update_html +="</main>";

    	     $("#page-content-main").html(admin_client_update_html);
    	     changePageTitle("Edycja klienta - admin");

    	});
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#update-client-form', function(e){
         
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
	    	    		showClients("", "Rekord został poprawnie zaaktualizowany");
	    	    		
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

//dane przedstawiciela potrzebne do formularza
function getDataSalesmanUpdate(id){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	var json_url;
	json_url = route+"/crm2.0/resources/users/salesman/read.php";
	

	
	
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_salesman_html;
        // html for listing products
    	
    	select_salesman_html ="<div class='form-group'>";
		 select_salesman_html +="<label for='salesmans' class='col-md-4'>";
		 select_salesman_html +="Wybierz&nbsp;przedstawiciela:";
		 select_salesman_html +="</label>";
		 select_salesman_html +="<div class='col-md-8'>";
		 select_salesman_html +="<select name='salesmans'class='form-control'>";
		 
        $.each(data.records, function (key, val){
        	
        	select_salesman_html +="<option value=" + val.id_salesman
        	
        	if(id === val.id){
        		select_salesman_html += " selected='selected'";
        	}
        	
        	select_salesman_html+= ">" + val.name + " " + val.surname + "</option>";

        });
        
   	 select_salesman_html +="</select>";
	 select_salesman_html +="</div>";
	 select_salesman_html +="</div>";
	 
	 $("#select-salesman-update").html(select_salesman_html);
        

 
    });
}