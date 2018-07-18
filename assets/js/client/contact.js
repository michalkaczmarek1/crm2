
//formularz kontaktowy
$(document).ready(function(){
	

		
	
		$(document).on("click",".contact", function(e){
			e.preventDefault();
			
				// formularz "Wyślij wiadomość"
			
			var message_add_html;

			message_add_html = "<main>";
			message_add_html += "<section class='well1'>";
			message_add_html += "<div class='container'>";
			message_add_html += "<div class='col-md-offset-3 col-md-6'>";
			message_add_html += "<div class='alert alert-info valid-info-client'></div>";
			message_add_html += "<h2 class='text-center'>Formularz kontaktowy</h2>";
			message_add_html += "<form role='form' action='#' method='post' id='add-message-client-form'>";
			message_add_html += "<div class='form-group'>";
			message_add_html += "<label for='content' class='col-md-2'> Wiadomość: </label>";
			message_add_html += "<div class='col-md-10'>";
			message_add_html += "<textarea type='textarea' class='form-control' name='content' rows='3' placeholder='Wprowadź treśc'></textarea>";
			message_add_html += "</div>";
			message_add_html += "</div>";
			
			message_add_html +="<div class='select-salesman'></div>";
			 getDataSalesman();
			 
			message_add_html += "<div class='row'>";
			message_add_html += "<div class='col-md-offset-2 col-md-10'>";
			message_add_html += "<p class='post'></p>";
			message_add_html += "<button type='submit' class='btn btn-info'> Wyślij </button>";
			message_add_html += "</div>";
			message_add_html += "</div>";
			message_add_html += "</form>";
			message_add_html += "<a href='index.php' class='btn btn-primary btn-sm active' >Wróc</a><br/>";
			message_add_html +="</div>";
			message_add_html +="</div>";
			message_add_html +="</div>";
			message_add_html +="</section>";
			message_add_html +="</main>";
			

				$("#page-content").html(message_add_html);

				changePageTitle("Kontakt - klient");
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-message-client-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/message/create.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {

		    	    
		    	    	if(!result.error){
		    	    		$(".valid-info-client").html(result.message);
		    	    	} else {
		    	    		$(".valid-info-client").html(result.error);
		    	    	}
		    	    },
		    	    error: function(xhr, resp, text) {
		    	        // pokaz błedy w konsoli
		    	        console.log(xhr, resp, text);
		    	    }
			})
			
			
		});
		
		
});





