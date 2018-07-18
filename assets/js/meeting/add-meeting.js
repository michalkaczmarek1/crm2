//formularz dodanie spotkania
$(document).ready(function(){
        

        
        $(document).on("click","#add-meeting", function(e){
            e.preventDefault();
            
                // formularz "Dodaj spotkanie"
            
            var add_meeeting_html;

            add_meeeting_html = "<main>";
            add_meeeting_html += "<section class='well1'>";
            add_meeeting_html += "<div class='container'>";
            add_meeeting_html += "<div class='alert alert-info valid-info-meeting'></div>";
            
            add_meeeting_html += "<div class='col-md-offset-3 col-md-6'>";
            add_meeeting_html += "<h2 class='text-center'>Dodaj spotkanie</h2>";
            add_meeeting_html += "<form role='form' action='#' method='post' id='add-meeting-form'>";

//			pole select dla daty
            add_meeeting_html += "<div class='select-date'></div>";
			getDateMeeting();
			
//			pole select dla klientów
            add_meeeting_html += "<div class='select-client'></div>";
			getDataClient();
		
			add_meeeting_html += "<div class='form-group'>";
            add_meeeting_html += "<label for='comments' class='col-md-5'> Uwagi (miejsce spotkanie, dokładna godzina itp): </label>";
            add_meeeting_html += "<div class='col-md-7'>";
            add_meeeting_html += "<textarea type='textarea' class='form-control' name='comments' rows='3' placeholder='Wprowadź uwagi'></textarea>";
            add_meeeting_html += "</div>";
            add_meeeting_html += "</div>";
            
//			pobranie id przedstawiciela
            add_meeeting_html += "<div class='id-salesman'></div>";
			getIdSalesman();
			
            add_meeeting_html += "<div class='row'>";
            add_meeeting_html += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
            add_meeeting_html += "<p class='post'></p>";
            add_meeeting_html += "<button type='submit' class='btn btn-primary'> Dodaj </button>";
            add_meeeting_html += "</div>";
            add_meeeting_html += "</div>";
            add_meeeting_html += "<a href='#' class='btn btn-primary btn-sm active client' >POWRÓT  </a><br/>";
            add_meeeting_html += "</form>";
            add_meeeting_html +="</div>";
            add_meeeting_html +="</div>";
            add_meeeting_html +="</div>";
            add_meeeting_html +="</section>";
            add_meeeting_html +="</main>";
            
                
                $(".page-content-main").html(add_meeeting_html);
                            
        });
        
    
        
        // obsługa formularza
        
        $(document).on("submit", "#add-meeting-form", function(e){
            
            e.preventDefault();
            var route = "http://pp42877.wsbpoz.solidhost.pl/";
            
            var form_data = JSON.stringify($(this).serializeArray());
            
            $.ajax({
                  url: route+"crm2.0/resources/meeting/create.php",
                    type : "POST",
                    contentType : 'application/json',
                    data : form_data,
                    success : function(result) {

                    	if(result.error_mess){
		    	    		$(".valid-info-meeting").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
                    	
	                    	if(!result.error){
	                    		showInfoClient(result.message);
			    	    	} else {
			    	    		$(".valid-info-meeting").html(result.error);
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

//pobranie dat do formularza
function getDateMeeting(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/meeting/read-date.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_date;
    	
        // html for listing products
    	
    	select_date ="<div class='form-group'>";
		 select_date +="<label for='dates' class='col-md-4'>";
		 select_date +="Wybierz&nbsp;date:";
		 select_date +="</label>";
		 select_date +="<div class='col-md-8'>";
		 select_date +="<select name='date'class='form-control'>";
		 $.each(data.dates, function(key, val) {
			 
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

//pobranie id przedstawiciela
function getIdSalesman(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/salesman/read-one.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    var id_field = "<input type='hidden' name='id_salesman' value='"+data.id+"'>";
	 
	 $(".id-salesman").html(id_field);
        
    

 
    });
}




