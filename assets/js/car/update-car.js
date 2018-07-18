
//formularz edycji
$(document).ready(function(){
    
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	

	
        $(document).on("click","#update-car-button", function(e){
            e.preventDefault();
            

        	var id = $(this).attr('data-id');
        	

        	$.getJSON(route+"crm2.0/resources/car/read-one.php?id=" + id, function(data){
        		
	        	
	            // wartosci które beda wstawione do formularza
	    	    var mark = data.mark;
	    	    var model = data.model;
	    	    var engine = data.engine;
	    	    var horsepower = data.horsepower;
	    	    var truck_or_delivery = data.truck_or_delivery;
	    	    var price = data.price;
	            
	                // formularz "Edytuj samochód"
	            
	            var admin_update_car_html;
	
	            admin_update_car_html = "<main>";
	            admin_update_car_html += "<section class='well1'>";
	            admin_update_car_html += "<div class='container'>";
	            admin_update_car_html += "<div class='alert alert-info valid-info-car'></div>";
	            admin_update_car_html += "<div class='col-md-offset-3 col-md-6'>";
	            admin_update_car_html += "<h2 class='text-center'>Edytuj samochód</h2>";
	            admin_update_car_html += "<form role='form' action='#' method='post' id='update-car-form'>";
	            
	            admin_update_car_html += "<div class='form-group'>";
	            admin_update_car_html += "<label for='name' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Marka: </label>";
	            admin_update_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
	            admin_update_car_html += "<input type='text' name='mark' value='"+mark+"' class='form-control' placeholder='Wprowadź marke'>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            
	            admin_update_car_html += "<div class='form-group'>";
	            admin_update_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Model: </label>";
	            admin_update_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
	            admin_update_car_html += "<input type='text' class='form-control' name='model' value='"+model+"' placeholder='Wprowadź model'>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            
	            admin_update_car_html += "<div class='form-group'>";
	            admin_update_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Silnik (w cm3): </label>";
	            admin_update_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
	            admin_update_car_html += "<input type='text' class='form-control' name='engine' value='"+engine+"' placeholder='Wprowadź pojemność silnika'>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            
	            admin_update_car_html += "<div class='form-group'>";
	            admin_update_car_html += "<label for='surname' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Moc silnika (w KM): </label>";
	            admin_update_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
	            admin_update_car_html += "<input type='text' class='form-control' name='horsepower' value='"+horsepower+"' placeholder='Wprowadź moc silnik'>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            
	            admin_update_car_html += "<div class='form-group'>";
	            admin_update_car_html += "<label for='price' class='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Cena (w zł): </label>";
	            admin_update_car_html += "<div class='col-xs-10 col-sm-10 col-md-10 col-lg-10'>";
	            admin_update_car_html += "<input type='text' class='form-control' name='price' value='"+price+"' placeholder='Wprowadź cenę'>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            
	            admin_update_car_html +="<div class='form-group'>";
	            admin_update_car_html +="<label for='truck_or_delivery' class='col-xs-5 col-sm-5 col-md-5 col-lg-5'>";
	            admin_update_car_html +="Samochód ciężarowy czy dostawczy:";
	            admin_update_car_html +="</label>";
	            admin_update_car_html +="<div class='col-xs-7 col-sm-7 col-md-7 col-lg-7'>";
	            admin_update_car_html +="<select name='truck_or_delivery' class='form-control'>";
	            
	            if(truck_or_delivery == "Samochód ciężarowy"){
	            	admin_update_car_html +="<option value='Samochód ciężarowy' selected='selected'>Samochód ciężarowy</option>";
		            admin_update_car_html +="<option value='Samochód dostawczy'>Samochód dostawczy</option>";
	            } else {
	            	admin_update_car_html +="<option value='Samochód ciężarowy'>Samochód ciężarowy</option>";
		            admin_update_car_html +="<option value='Samochód dostawczy' selected='selected'>Samochód dostawczy</option>";
	            }
	            
	            admin_update_car_html +="</select>";
	            admin_update_car_html +="</div>";
	            admin_update_car_html +="</div>";
	            
	           
	            admin_update_car_html += "<input value=\"" + id + "\" name='id' type='hidden' />";
	
	            admin_update_car_html += "<div class='row'>";
	            admin_update_car_html += "<div class='col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>";
	            admin_update_car_html += "<p class='post'></p>";
	            admin_update_car_html += "<button type='submit' class='btn btn-info'> Edytuj </button>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</div>";
	            admin_update_car_html += "</form>";
	            admin_update_car_html += "<a href='#' class='btn btn-primary btn-sm active show-cars'>powrót</a><br/>";
	            admin_update_car_html +="</div>";
	            admin_update_car_html +="</div>";
	            admin_update_car_html +="</div>";
	            admin_update_car_html +="</section>";
	            admin_update_car_html +="</main>";
	            

                $("#page-content-main").html(admin_update_car_html);
                changePageTitle("Edycja samochodu - admin");
        	});            
        });
        
    
        
        // obsługa formularza
        
        $(document).on("submit", "#update-car-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/car/update.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {
                        // samochód utworzony, powrót do listy samochodów
                        
                    	if(result.error_mess){
		    	    		$(".valid-info-car").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showCars("", "Rekord został poprawnie zaaktualizowany");
			    	    		
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






