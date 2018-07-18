//formularz dodanie oferty
$(document).ready(function(){
        
        
        
        $(document).on("click","#create-offer", function(e){
            e.preventDefault();
            
                // formularz "Dodaj ofertę"
            
            var admin_offer_add_html;

            admin_offer_add_html = "<main>";
            admin_offer_add_html += "<section class='well1'>";
            admin_offer_add_html += "<div class='container'>";
            admin_offer_add_html += "<div class='alert alert-info valid-info-offer'></div>";
            admin_offer_add_html += "<div class='col-md-offset-3 col-md-6'>";
            admin_offer_add_html += "<h2 class='text-center'>Dodaj ofertę</h2>";
            admin_offer_add_html += "<form role='form' action='#' method='post' id='add-offer-form'>";
            admin_offer_add_html += "<div class='form-group'>";
            admin_offer_add_html += "<label for='name' class='col-md-2'> Nazwa oferty: </label>";
            admin_offer_add_html += "<div class='col-md-10'>";
            admin_offer_add_html += "<input type='text' name='name' class='form-control' placeholder='Wprowadź nazwę oferty'>";
            admin_offer_add_html += "</div>";
            admin_offer_add_html += "</div>";
            

			
            admin_offer_add_html += "<div class='form-group'>";
            admin_offer_add_html += "<label for='description' class='col-md-2'> Opis: </label>";
            admin_offer_add_html += "<div class='col-md-10'>";
            admin_offer_add_html += "<textarea type='textarea' class='form-control' name='description' rows='3' placeholder='Wprowadź opis'></textarea>";
            admin_offer_add_html += "</div>";
            admin_offer_add_html += "</div>";
            
            admin_offer_add_html += "<div class='form-group'>";
            admin_offer_add_html += "<label for='name' class='col-md-3'> Wysokość obniżki: </label>";
            admin_offer_add_html += "<div class='col-md-10'>";
            admin_offer_add_html += "<input type='number' min='0' value='0' max='60' step='10' name='reduction' class='form-control' >";
            admin_offer_add_html += "</div>";
            admin_offer_add_html += "</div>";
  
//			pole select dla daty początkowej
            admin_offer_add_html += "<div class='select-date'></div>";
            getStartDateFormOffer();
			
//			pole select dla daty końcowej
            admin_offer_add_html += "<div id='select-date-end'></div>";
            getEndDateFormOffer();
            
            admin_offer_add_html += "<div class='row'>";
            admin_offer_add_html += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
            admin_offer_add_html += "<p class='post'></p>";
            admin_offer_add_html += "<button type='submit' class='btn btn-primary'> Dodaj </button>";
            admin_offer_add_html += "</div>";
            admin_offer_add_html += "</div>";
            admin_offer_add_html += "</form>";
            admin_offer_add_html += "<a href='#' class='btn btn-primary btn-sm active show-offers'>Wróć do listy  </a><br/>";
            admin_offer_add_html +="</div>";
            admin_offer_add_html +="</div>";
            admin_offer_add_html +="</div>";
            admin_offer_add_html +="</section>";
            admin_offer_add_html +="</main>";
            

                $("#page-content-main").html(admin_offer_add_html);
                changePageTitle("Dodaj ofertę - admin");
        });
        
    
        
        // obsługa formularza
        
        $(document).on("submit", "#add-offer-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/offer/create.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {

                    	if(result.error_mess){
		    	    		$(".valid-info-offer").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    		
		    	    		if(!result.error){
			    	    		showOffers("", "Rekord został poprawnie wprowadzony");
			    	    		
			    	    	} else  {
			    	    		$(".valid-info-offer").html(result.error);
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

//pobranie daty początkowej do formularza
function getStartDateFormOffer(){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	var offer = "offer";
	
	
	
	json_url = route+"/crm2.0/resources/meeting/read-date.php?offer="+offer;

    $.getJSON(json_url, function(data){
    	
    	var select_date;
    	
        // html for listing products
    	
    	select_date ="<div class='form-group'>";
		 select_date +="<label for='dates' class='col-md-4'>";
		 select_date += "Data początkowa";
		 select_date +="</label>";
		 select_date +="<div class='col-md-8'>";
		 select_date +="<select name='date-start' class='form-control'>";
		 $.each(data.offer, function(key, val) {
			 
			 select_date +="<option value='"+val+"'>" +val+"</option>";
			 
			 
		 });
		 
   	 select_date +="</select>";
   	select_date +="<div class='col-md-8'>";
   	select_date +="</div>";
	 select_date +="</div>";
	 select_date +="</div>";
	 
	 $(".select-date").html(select_date);
        
    

 
    });
}

//pobranie daty końcowej do formularza
function getEndDateFormOffer(){
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	var offer = "offer";
	
	
	
	json_url = route+"/crm2.0/resources/meeting/read-date.php?offer="+offer;
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_date;
    	
        // html for listing products
    	
    	select_date ="<div class='form-group'>";
		 select_date +="<label for='dates' class='col-md-4'>";
		 select_date += "Data końcowa";
		 select_date +="</label>";
		 select_date +="<div class='col-md-8'>";
		 select_date +="<select name='date-end' class='form-control'>";
		 $.each(data.offer, function(key, val) {
			 
			 select_date +="<option value='"+val+"'>" +val+"</option>";
			 
			 
		 });
		 
   	 select_date +="</select>";
   	select_date +="<div class='col-md-8'>";
   	select_date +="</div>";
	 select_date +="</div>";
	 select_date +="</div>";
	 
	 $("#select-date-end").html(select_date);
        
    

 
    });
}


