
//skrytp wyswietlajacy formularz dodaj auto
$(document).ready(function(){
    

        
        $(document).on("click","#create-car", function(e){
            e.preventDefault();
            

            
            var admin_add_car_html;

            admin_add_car_html = "<main>";
            admin_add_car_html += "<section class='well1'>";
            admin_add_car_html += "<div class='container'>";
            admin_add_car_html += "<div class='alert alert-info valid-info-car'></div>";
            admin_add_car_html += "<div class='col-md-offset-3 col-md-6'>";
            admin_add_car_html += "<h2 class='text-center'>Dodaj samochód</h2>";
            admin_add_car_html += "<form role='form' action='#' method='post' id='add-car-form'>";
            
            admin_add_car_html += "<div class='form-group'>";
            admin_add_car_html += "<label for='name' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Marka: </label>";
            admin_add_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
            admin_add_car_html += "<input type='text' name='mark' class='form-control' placeholder='Wprowadź marke'>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            
            admin_add_car_html += "<div class='form-group'>";
            admin_add_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Model: </label>";
            admin_add_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
            admin_add_car_html += "<input type='text' class='form-control' name='model' placeholder='Wprowadź model'>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            
            admin_add_car_html += "<div class='form-group'>";
            admin_add_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Silnik (w cm3): </label>";
            admin_add_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
            admin_add_car_html += "<input type='text' class='form-control' name='engine' placeholder='Wprowadź pojemność silnika'>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            
            admin_add_car_html += "<div class='form-group'>";
            admin_add_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Moc silnika (w KM): </label>";
            admin_add_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
            admin_add_car_html += "<input type='text' class='form-control' name='horsepower' placeholder='Wprowadź moc silnik'>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            
            admin_add_car_html += "<div class='form-group'>";
            admin_add_car_html += "<label for='price' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Cena (w zł): </label>";
            admin_add_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
            admin_add_car_html += "<input type='text' class='form-control' name='price' placeholder='Wprowadź cenę'>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            
            admin_add_car_html +="<div class='form-group'>";
            admin_add_car_html +="<label for='truck_or_delivery' class='col-xs-5 col-sm-5 col-md-5 col-lg-5'>";
            admin_add_car_html +="Samochód ciężarowy czy dostawczy:";
            admin_add_car_html +="</label>";
            admin_add_car_html +="<div class='col-xs-7 col-sm-7 col-md-7 col-lg-7'>";
            admin_add_car_html +="<select name='truck_or_delivery' class='form-control'>";
            admin_add_car_html +="<option value='Samochód ciężarowy'>Samochód ciężarowy</option>";
            admin_add_car_html +="<option value='Samochód dostawczy'>Samochód dostawczy</option>";
            admin_add_car_html +="</select>";
            admin_add_car_html +="</div>";
            admin_add_car_html +="</div>";
            
           
            

            admin_add_car_html += "<div class='row'>";
            admin_add_car_html += "<div class='col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>";
            admin_add_car_html += "<p class='post'></p>";
            admin_add_car_html += "<button type='submit' class='btn btn-info'> Dodaj </button>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</div>";
            admin_add_car_html += "</form>";
            admin_add_car_html += "<a href='#' class='btn btn-primary btn-sm active show-cars'>powrót</a><br/>";
            admin_add_car_html +="</div>";
            admin_add_car_html +="</div>";
            admin_add_car_html +="</div>";
            admin_add_car_html +="</section>";
            admin_add_car_html +="</main>";
            
                

                $("#page-content-main").html(admin_add_car_html);
                changePageTitle("Dodaj samochód - admin");
        });
        
    
        
        // obsługa formularza
        
        $(document).on("submit", "#add-car-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/car/create.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {
                        // samochód utworzony, powrót do listy samochodów
                    	if(result.error_mess){
		    	    		$(".valid-info-car").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showCars("", "Rekord został poprawnie wprowadzony");
			    	    		
			    	    	} else  {
			    	    		$(".valid-info-car").html(result.error);
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






