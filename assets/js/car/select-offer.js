
//wybierz oferte
$(document).ready(function(){
    
                
        $(document).on("click","#offer-car-button", function(e){
            e.preventDefault();
            
        
        	var id = $(this).attr('data-id');
        
            
            var select_offer_car_html;

            select_offer_car_html = "<main>";
            select_offer_car_html += "<section class='well1'>";
            select_offer_car_html += "<div class='container'>";
            select_offer_car_html += "<div class='alert alert-info valid-info-car'></div>";
            select_offer_car_html += "<div class='col-md-offset-3 col-md-6'>";
            
            select_offer_car_html += "<form role='form' action='#' method='post' id='select-offer-car-form'>";
            
//          pole select dla ofert                   
            select_offer_car_html += "<div class='select-offer'></div>";
            getDataOffer();

            select_offer_car_html += "<input value=\"" + id + "\" name='id_car' type='hidden' />";
            select_offer_car_html += "<div class='row'>";
            select_offer_car_html += "<div class='col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>";
            select_offer_car_html += "<p class='post'></p>";
            select_offer_car_html += "<button type='submit' class='btn btn-info'> Wyślij </button>";
            select_offer_car_html += "</div>";
            select_offer_car_html += "</div>";
            select_offer_car_html += "</form>";
            select_offer_car_html += "<a href='#' class='btn btn-primary btn-sm active show-cars'>powrót</a><br/>";
            select_offer_car_html +="</div>";
            select_offer_car_html +="</div>";
            select_offer_car_html +="</div>";
            select_offer_car_html +="</section>";
            select_offer_car_html +="</main>";
            

                $("#page-content-main").html(select_offer_car_html);
                changePageTitle("Wybór oferty - admin");
        });
        
        // obsługa formularza
        
        $(document).on("submit", "#select-offer-car-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/car/offer.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {
                        // samochód utworzony, powrót do listy samochodów
                        
                    	if(result.error_mess){
		    	    		$(".valid-info-car").html("<p>Bład wprowadzonych danych. Sprawdź czy auto nie zostało wczsniej przypisane juz do wybranej oferty lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showCars("", "Oferta została poprawnie przypisana");
			    	    		
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






