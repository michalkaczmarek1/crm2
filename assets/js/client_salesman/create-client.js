//formularz dodaj klienta
$(document).ready(function(){
    
        
        
        $(document).on("click","#create-client-salesman", function(e){
            e.preventDefault();
            
                // formularz "Dodaj klienta"
            
            var salesman_client_add_html;

            salesman_client_add_html = "<main>";
            salesman_client_add_html += "<section class='well1'>";
            salesman_client_add_html += "<div class='container'>";
            salesman_client_add_html += "<div class='alert alert-info valid-info-client'></div>";
            salesman_client_add_html += "<div class='col-md-offset-3 col-md-6'>";
            salesman_client_add_html += "<h2 class='text-center'>Dodaj klienta</h2>";
            salesman_client_add_html += "<form role='form' action='#' method='post' id='add-client-salesman-form'>";
            salesman_client_add_html += "<div class='form-group'>";
            salesman_client_add_html += "<label for='name' class='col-md-2'> Imię: </label>";
            salesman_client_add_html += "<div class='col-md-10'>";
            salesman_client_add_html += "<input type='text' name='name' class='form-control' placeholder='Wprowadź imie klienta'>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "<div class='form-group'>";
            salesman_client_add_html += "<label for='surname' class='col-md-2'> Nazwisko: </label>";
            salesman_client_add_html += "<div class='col-md-10'>";
            salesman_client_add_html += "<input type='text' class='form-control' name='surname' placeholder='Wprowadź nazwisko klienta'>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "<div class='form-group'>";
            salesman_client_add_html += "<label for='address' class='col-md-2'> Adres: </label>";
            salesman_client_add_html += "<div class='col-md-10'>";
            salesman_client_add_html += "<textarea type='textarea' class='form-control' name='address' rows='3' placeholder='Wprowadź adres klienta'></textarea>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "<div class='form-group'>";
            salesman_client_add_html += "<label for='city' class='col-md-2'> Miejscowość: </label>";
            salesman_client_add_html += "<div class='col-md-10'>";
            salesman_client_add_html += "<input name='city' type='text' class='form-control' placeholder='Wprowadź miasto klienta'>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "<div class='form-group'>";
            salesman_client_add_html += "<label for='email' class='col-md-2'> Email: </label>";
            salesman_client_add_html += "<div class='col-md-10'>";
            salesman_client_add_html += "<input type='email' class='form-control' name='email' placeholder='Wprowadź adres email klienta'>";
            salesman_client_add_html += "<p class='help-block'> Przykład: imie@domena.pl </p>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
             salesman_client_add_html +="<div class='form-group'>";
             salesman_client_add_html +="<label for='status' class='col-md-4'>";
             salesman_client_add_html +="Wybierz&nbsp;status:";
             salesman_client_add_html +="</label>";
             salesman_client_add_html +="<div class='col-md-8'>";
             salesman_client_add_html +="<select name='status'class='form-control'>";
             salesman_client_add_html +="<option value='Stały'>Stały</option>";
             salesman_client_add_html +="<option value='Zwykły'>Zwykły</option>";
             salesman_client_add_html +="</select>";
             salesman_client_add_html +="</div>";
             salesman_client_add_html +="</div>";
            salesman_client_add_html += "<div class='row'>";
            salesman_client_add_html += "<div class='col-md-offset-2 col-md-10'>";
            salesman_client_add_html += "<p class='post'></p>";
            salesman_client_add_html += "<button type='submit' class='btn btn-info'> Dodaj </button>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</div>";
            salesman_client_add_html += "</form>";
            salesman_client_add_html += "<a href='#' class='btn btn-primary btn-sm active show-client-salesman'>powrót</a><br/>";
            salesman_client_add_html +="</div>";
            salesman_client_add_html +="</div>";
            salesman_client_add_html +="</div>";
            salesman_client_add_html +="</section>";
            salesman_client_add_html +="</main>";
            

                $(".page-content-main").html(salesman_client_add_html);
                            
        });
        
    
        
        // obsługa formularza
        
        $(document).on("submit", "#add-client-salesman-form", function(e){
            
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
		    	    			showClientsSalesman("", "Rekord został poprawnie wprowadzony");
			    	    		
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
        
            
             select_salesman_html +="<option value=" + val.id_salesman + ">" + val.name + " " + val.surname + "</option>";
             var id_salesman = val.id_salesman;
        });
        
     select_salesman_html +="</select>";
     select_salesman_html +="</div>";
     select_salesman_html +="</div>";
     
     $(".select-salesman").html(select_salesman_html);
        

 
    });
}




