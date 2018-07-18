//formularz pobrania raportu preferencji
$(document).ready(function(){
	
		// wyświetl formularz "Dodaj przedstawiciela"
		
		$(document).on("click","#get-report-preference", function(e){
			e.preventDefault();
			
				// formularz "Dodaj klienta"
			
			var select_salesman_preference;

			select_salesman_preference = "<main>";
			select_salesman_preference += "<section class='well1'>";
			select_salesman_preference += "<div class='container'>";
			select_salesman_preference += "<div class='alert alert-info valid-info-report-preference'></div>";
			select_salesman_preference += "<div class='col-md-offset-3 col-md-6'>";
			select_salesman_preference += "<form role='form' action='#' method='post' id='select-salesman-preference-form'>";
			select_salesman_preference +="<div class='select-salesman'></div>";
			//wstawienie przedstawicieli
			 getDataSalesman();
			select_salesman_preference += "<div class='row'>";
			select_salesman_preference += "<div class='col-md-offset-2 col-md-10'>";
			select_salesman_preference += "<p class='post'></p>";
			select_salesman_preference += "<button type='submit' class='btn btn-info'> Wyślij </button>";
			select_salesman_preference += "</div>";
			select_salesman_preference += "</div>";
			select_salesman_preference += "</form>";
			select_salesman_preference += "<a href='#' class='btn btn-primary btn-sm active marketing-admin'>powrót</a><br/>";
			select_salesman_preference +="</div>";
			select_salesman_preference +="</div>";
			select_salesman_preference +="</div>";
			select_salesman_preference +="</section>";
			select_salesman_preference +="</main>";
			

				$("#page-content-main").html(select_salesman_preference);
				changePageTitle("Raport preferencji - admin");
							
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#select-salesman-preference-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/report-preference/read.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(data) {
		    	    	
		    	    	if(data.message){
		    	    		$(".valid-info-report-preference").html(data.message);
		    	    	} else {
		    	    		readReportsPreferencesTemplate(data);
		    	    	}
		    	    	
		    	    	

		    	    	
		    	    },
		    	    error: function(xhr, resp, text) {
		    	        // pokaz błedy w konsoli
		    	        console.log(xhr, resp, text);
		    	    }
			})
			
			
		});
		
		
});








