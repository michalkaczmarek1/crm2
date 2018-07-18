
//formularz dodaj klienta
$(document).ready(function(){
	

		
		$(document).on("click","#create-client", function(e){
			e.preventDefault();
						
			var admin_client_add_html;

			admin_client_add_html = "<main>";
			admin_client_add_html += "<section class='well1'>";
			admin_client_add_html += "<div class='container'>";
			admin_client_add_html += "<div class='alert alert-info valid-info-client'></div>";
			admin_client_add_html += "<div class='col-md-offset-3 col-md-6'>";
			admin_client_add_html += "<h2 class='text-center'>Dodaj klienta</h2>";
			admin_client_add_html += "<form role='form' action='#' method='post' id='add-client-form'>";
			admin_client_add_html += "<div class='form-group'>";
			admin_client_add_html += "<label for='name' class='col-md-2'> Imię: </label>";
			admin_client_add_html += "<div class='col-md-10'>";
			admin_client_add_html += "<input type='text' name='name' class='form-control' placeholder='Wprowadź imie klienta'>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "<div class='form-group'>";
			admin_client_add_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
			admin_client_add_html += "<div class='col-md-10'>";
			admin_client_add_html += "<input type='text' class='form-control' name='surname' placeholder='Wprowadź nazwisko klienta'>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "<div class='form-group'>";
			admin_client_add_html += "<label for='address' class='col-md-2'> Adres: </label>";
			admin_client_add_html += "<div class='col-md-10'>";
			admin_client_add_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź adres klienta'></textarea>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "<div class='form-group'>";
			admin_client_add_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
			admin_client_add_html += "<div class='col-md-10'>";
			admin_client_add_html += "<input name='city' type='text' class='form-control' placeholder='Wprowadź miasto klienta'>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "<div class='form-group'>";
			admin_client_add_html += "<label for='email' class='col-md-2'> Email: </label>";
			admin_client_add_html += "<div class='col-md-10'>";
			admin_client_add_html += "<input type='email' class='form-control' name='email' placeholder='Wprowadź adres email klienta'>";
			admin_client_add_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			 admin_client_add_html +="<div class='form-group'>";
			 admin_client_add_html +="<label for='status' class='col-md-4'>";
			 admin_client_add_html +="Wybierz&nbsp;status:";
			 admin_client_add_html +="</label>";
			 admin_client_add_html +="<div class='col-md-8'>";
			 admin_client_add_html +="<select name='status'class='form-control'>";
			 admin_client_add_html +="<option value='Stały'>Stały</option>";
			 admin_client_add_html +="<option value='Zwykły'>Zwykły</option>";
			 admin_client_add_html +="</select>";
			 admin_client_add_html +="</div>";
			 admin_client_add_html +="</div>";
			 admin_client_add_html +="<div class='select-salesman'></div>";
			 getDataSalesman();
			admin_client_add_html += "<div class='row'>";
			admin_client_add_html += "<div class='col-md-offset-2 col-md-10'>";
			admin_client_add_html += "<p class='post'></p>";
			admin_client_add_html += "<button type='submit' class='btn btn-info'> Dodaj </button>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</div>";
			admin_client_add_html += "</form>";
			admin_client_add_html += "<a href='#' class='btn btn-primary btn-sm active read-clients'>Wróć do listy</a><br/>";
			admin_client_add_html +="</div>";
			admin_client_add_html +="</div>";
			admin_client_add_html +="</div>";
			admin_client_add_html +="</section>";
			admin_client_add_html +="</main>";
			
				
				$("#page-content-main").html(admin_client_add_html);
				changePageTitle("Dodaj klienta - admin");
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-client-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/users/client/create.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {

		    	    	if(result.error_mess){
		    	    		$(".valid-info-client").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showClients("", "Rekord został poprawnie wprowadzony");
			    	    		
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

//pobranie danych przedstawiciela do formularza
function getDataSalesman(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/salesman/read.php";
   
    $.getJSON(json_url, function(data){
    	
    	var select_salesman_html;
   
    	
    	select_salesman_html ="<div class='form-group'>";
		 select_salesman_html +="<label for='salesmans' class='col-md-4'>";
		 select_salesman_html +="Wybierz&nbsp;przedstawiciela:";
		 select_salesman_html +="</label>";
		 select_salesman_html +="<div class='col-md-8'>";
		 select_salesman_html +="<select name='salesmans'class='form-control'>";
		 
        $.each(data.records, function (key, val){
        
        	
			 select_salesman_html +="<option value=" + val.id_salesman + ">" + val.name + " " + val.surname + "</option>";
			 var id_salesman = val.id_salesman;
        });
        
   	 select_salesman_html +="</select>";
	 select_salesman_html +="</div>";
	 select_salesman_html +="</div>";
	 
	 $(".select-salesman").html(select_salesman_html);
         
    });
}




