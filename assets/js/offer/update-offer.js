//aktualizacja oferty
$(document).ready(function(){
 
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    // show html form when 'update product' button was clicked
    $(document).on('click', '#update-offer-button', function(){
    	
    	
    	// pobranie id przedstawiciela
    	var id = $(this).attr('data-id');
    	
    	// odczytanie rekordu do edycji
    	$.getJSON(route+"crm2.0/resources/offer/read-one.php?id=" + id, function(data){
    	 
    		
    	    // wartosci które beda wstawione do formularza
    	    var name = data.name;
    	    var date_offer = data.date_offer;
    	    var start_date = data.start_date;
    	    var end_date = data.end_date;
    	    var description = data.description;
    	    var reduction = data.reduction;
    	    
    		var admin_update_offer_html;
    		
            admin_update_offer_html = "<main>";
            admin_update_offer_html += "<section class='well1'>";
            admin_update_offer_html += "<div class='container'>";
            admin_update_offer_html += "<div class='alert alert-info valid-info-offer'></div>";
            admin_update_offer_html += "<div class='col-md-offset-3 col-md-6'>";
            admin_update_offer_html += "<h2 class='text-center'>Edytuj ofertę</h2>";
            
            admin_update_offer_html += "<form role='form' action='#' method='post' id='update-offer-form'>";
            admin_update_offer_html += "<div class='form-group'>";
            admin_update_offer_html += "<label for='name' class='col-md-2'> Nazwa oferty: </label>";
            admin_update_offer_html += "<div class='col-md-10'>";
            admin_update_offer_html += "<input type='text' name='name' class='form-control' value='"+name+"'>";
            admin_update_offer_html += "</div>";
            admin_update_offer_html += "</div>";
            			

            
//		pole opis	
            admin_update_offer_html += "<div class='form-group'>";
            admin_update_offer_html += "<label for='description' class='col-md-2'> Opis: </label>";
            admin_update_offer_html += "<div class='col-md-10'>";
            admin_update_offer_html += "<textarea type='textarea' class='form-control' name='description' rows='3'>"+description+"</textarea>";
            admin_update_offer_html += "</div>";
            admin_update_offer_html += "</div>";
            
// pole obniżki           
            admin_update_offer_html += "<div class='form-group'>";
            admin_update_offer_html += "<label for='name' class='col-md-3'> Wysokość obniżki: </label>";
            admin_update_offer_html += "<div class='col-md-10'>";
            admin_update_offer_html += "<input type='number' min='0' value='"+reduction+"' max='60' step='10' name='reduction' class='form-control' >";
            admin_update_offer_html += "</div>";
            admin_update_offer_html += "</div>";
            
//			pole select dla daty początkowej
            admin_update_offer_html += "<div id='select-offer-date-update'></div>";
            getStartDateOfferUpdate(start_date)
            
            
//			pole select dla daty końcowej
            admin_update_offer_html += "<div id='select-offer-date-end-update'></div>";
            getEndDateOfferUpdate(end_date)
            
            admin_update_offer_html += "<input value=\"" + id + "\" name='id' type='hidden' />";
            admin_update_offer_html += "<div class='row'>";
            admin_update_offer_html += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
            admin_update_offer_html += "<p class='post'></p>";
            admin_update_offer_html += "<button type='submit' class='btn btn-primary'> Edytuj </button>";
            admin_update_offer_html += "</div>";
            admin_update_offer_html += "</div>";
            
            admin_update_offer_html += "</form>";
            admin_update_offer_html += "<a href='#' class='btn btn-primary btn-sm active show-offers'>POWRÓT  </a><br/>";
            admin_update_offer_html +="</div>";
            
            admin_update_offer_html +="</div>";
            admin_update_offer_html +="</div>";
            admin_update_offer_html +="</section>";
            admin_update_offer_html +="</main>";
    	             

    	     $("#page-content-main").html(admin_update_offer_html);
    	     changePageTitle("Edycja oferty - admin");

    	});
    });
     
 // obsługa formularza edycji
    $(document).on('submit', '#update-offer-form', function(e){
         
    	e.preventDefault();
    	
    	// pobranie danych formularza
    	
    	var form_data=JSON.stringify($(this).serializeArray());
    	
    	// wysłanie danych formularz do API
    	$.ajax({
    	    url: route+"crm2.0/resources/offer/update.php",
    	    type : "POST",
    	    contentType : 'application/json',
    	    data : form_data,
    	    success : function(result) {
    	        // oferta została zaaktualizowana, powrót do listy
    	    	if(result.error_mess){
    	    		$(".valid-info-offer").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
    	    	} else {
    	    		
    	    		if(!result.error){
	    	    		showOffers("", result.message);
	    	    		
	    	    	} else  {
	    	    		$(".valid-info-offer").html(result.error);
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

//dane oferty potrzebne do formularza
function getStartDateOfferUpdate(start_date){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	var json_url;
	var offer = "offer";
	json_url = route+"/crm2.0/resources/meeting/read-date.php?offer="+offer;
	

	
	
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var update_date_offer_start;
        // html for listing products
      
      update_date_offer_start ="<div class='form-group'>";
             update_date_offer_start +="<label for='date-start' class='col-md-4'>";
             update_date_offer_start +="Data początkowa:";
             update_date_offer_start +="</label>";
             update_date_offer_start +="<div class='col-md-8'>";
             update_date_offer_start +="<select name='date-start'class='form-control'>";
             
        $.each(data.offer, function (key, val){
            
            update_date_offer_start +="<option value=" + val
            
            if(start_date === val){
                  update_date_offer_start += " selected='selected'";
            }
            
            update_date_offer_start+= ">" + val + "</option>";

        });
        
       update_date_offer_start +="</select>";
       update_date_offer_start +="</div>";
       update_date_offer_start +="</div>";
       
       $("#select-offer-date-update").html(update_date_offer_start);
        
    

 
    });
}

//dane przedstawiciela potrzebne do formularza
function getEndDateOfferUpdate(end_date){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	var json_url;
	var offer = "offer";
	json_url = route+"/crm2.0/resources/meeting/read-date.php?offer="+offer;
	

	
	
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        var update_date_offer_end;
        // html for listing products
      
      update_date_offer_end ="<div class='form-group'>";
             update_date_offer_end +="<label for='date-end' class='col-md-4'>";
             update_date_offer_end +="Data końcowa:";
             update_date_offer_end +="</label>";
             update_date_offer_end +="<div class='col-md-8'>";
             update_date_offer_end +="<select name='date-end'class='form-control'>";
             
        $.each(data.offer, function (key, val){
            
            update_date_offer_end +="<option value=" + val
            
            if(end_date === val){
                  update_date_offer_end += " selected='selected'";
            }
            
            update_date_offer_end+= ">" + val + "</option>";

        });
        
       update_date_offer_end +="</select>";
       update_date_offer_end +="</div>";
       update_date_offer_end +="</div>";
       
       $("#select-offer-date-end-update").html(update_date_offer_end);
        

 
    });
}