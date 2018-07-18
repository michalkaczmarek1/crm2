
//formularz dodania wiadomosci
$(document).ready(function(){
	
		// wyświetl formularz "Dodaj przedstawiciela"
		
	
		$(document).on("click",".contact-client", function(e){
			e.preventDefault();
			
				// formularz "Wyślij wiadomość"
			
			var complaint_add_html;

			complaint_add_html = "<main>";
			complaint_add_html += "<section class='well1'>";
			complaint_add_html += "<div class='container'>";
			complaint_add_html += "<div class='alert alert-info valid-info-message'></div>";
			complaint_add_html += "<div class='col-md-offset-3 col-md-6'>";
			complaint_add_html += "<h2 class='text-center'>Formularz kontaktowy</h2>";
			complaint_add_html += "<form role='form' action='#' method='post' id='add-message-form'>";

			complaint_add_html += "<div class='form-group'>";
			complaint_add_html += "<label for='content' class='col-md-2'> Wiadomość: </label>";
			complaint_add_html += "<div class='col-md-10'>";
			complaint_add_html += "<textarea type='textarea' class='form-control' name='content' rows='3' placeholder='Wprowadź treśc'></textarea>";
			complaint_add_html += "</div>";
			complaint_add_html += "</div>";
			
			complaint_add_html +="<div class='select-salesman'></div>";
			 getDataSalesman();
			 
			complaint_add_html += "<div class='row'>";
			complaint_add_html += "<div class='col-md-offset-2 col-md-10'>";
			complaint_add_html += "<p class='post'></p>";
			complaint_add_html += "<button type='submit' class='btn btn-info'> Wyślij </button>";
			complaint_add_html += "</div>";
			complaint_add_html += "</div>";
			complaint_add_html += "</form>";
			complaint_add_html += "<a href='' class='btn btn-primary btn-sm active offers-client' >Wróc do ofert</a><br/>";
			complaint_add_html +="</div>";
			complaint_add_html +="</div>";
			complaint_add_html +="</div>";
			complaint_add_html +="</section>";
			complaint_add_html +="</main>";
			

				$(".page-content-main").html(complaint_add_html);
							
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-message-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/message/create.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {

		    	    	if(result.error_mess){
		    	    		$(".valid-info-message").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
		    	    	
			    	    	 
	                    	if(!result.error){
	                    		showContactClient(result.message);
	                    		$(".nav").find(".active").removeClass("active");
	                    		 
			    	    	} else {
			    	    		$(".valid-info-message").html(result.error);
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





