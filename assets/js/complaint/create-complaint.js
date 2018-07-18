//formularz dodawania reklamacji
$(document).ready(function(){
	
		
		
	
		$(document).on("click","#add-complaint", function(e){
			e.preventDefault();
			
			// pobranie id zamówienia
			var id = $(this).attr('data-id');
			
				// formularz "Zgłoś reklamacje"
			
			var complaint_add_html;

			complaint_add_html = "<main>";
			complaint_add_html += "<section class='well1'>";
			complaint_add_html += "<div class='container'>";
			complaint_add_html += "<div class='alert alert-info valid-info-complaint'></div>";
			complaint_add_html += "<div class='col-md-offset-3 col-md-6'>";
			complaint_add_html += "<h2 class='text-center'>Zgłoś reklamacje</h2>";
			complaint_add_html += "<form role='form' action='#' method='post' id='add-complaint-form'>";

			complaint_add_html += "<div class='form-group'>";
			complaint_add_html += "<label for='content' class='col-md-2'> Treść: </label>";
			complaint_add_html += "<div class='col-md-10'>";
			complaint_add_html += "<textarea type='textarea' class='form-control' name='content' rows='3' placeholder='Wprowadź treśc'></textarea>";
			complaint_add_html += "</div>";
			complaint_add_html += "</div>";
			
			complaint_add_html += "<input value=\"" + id + "\" name='nr_order' type='hidden' />";
			
			complaint_add_html += "<div class='row'>";
			complaint_add_html += "<div class='col-md-offset-2 col-md-10'>";
			complaint_add_html += "<p class='post'></p>";
			complaint_add_html += "<button type='submit' class='btn btn-info'> Zgłoś </button>";
			complaint_add_html += "</div>";
			complaint_add_html += "</div>";
			complaint_add_html += "</form>";
			complaint_add_html +="</div>";
			complaint_add_html +="</div>";
			complaint_add_html +="</div>";
			complaint_add_html +="</section>";
			complaint_add_html +="</main>";
			

				$(".page-content-main").html(complaint_add_html);
							
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-complaint-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/complaint/create.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {

		    	    	
		    	    	
		    	    	 
                    	if(!result.error){
                    		showOrdersComplClientPanel("", result.message);
                    		
		    	    	} else {
		    	    		$(".valid-info-complaint").html(result.error);
		    	    	}
		    	    },
		    	    error: function(xhr, resp, text) {
		    	        // pokaz błedy w konsoli
		    	        console.log(xhr, resp, text);
		    	    }
			})
			
			
		});
		
		
});





