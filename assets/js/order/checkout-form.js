
//realizacja zamowienia
$(document).ready(function(){
	
		
		
		$(document).on("click","#checkout-order", function(e){
			e.preventDefault();
			

			
			var select_salesman_order;

			select_salesman_order = "<main>";
			select_salesman_order += "<section class='well1'>";
			select_salesman_order += "<div class='container'>";
			select_salesman_order += "<div class='alert alert-info valid-info-report-sale'></div>";
			select_salesman_order += "<div class='col-md-offset-3 col-md-6'>";
			select_salesman_order += "<form role='form' action='#' method='post' id='select-salesman-form'>";
			select_salesman_order +="<div class='select-salesman'></div>";
			//wstawienie przedstawicieli
			 getDataSalesman();
			select_salesman_order += "<div class='row'>";
			select_salesman_order += "<div class='col-md-offset-2 col-md-10'>";
			select_salesman_order += "<p class='post'></p>";
			select_salesman_order += "<button type='submit' class='btn btn-info'> Wyślij </button>";
			select_salesman_order += "</div>";
			select_salesman_order += "</div>";
			select_salesman_order += "</form>";
			select_salesman_order += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>powrót</a><br/>";
			select_salesman_order +="</div>";
			select_salesman_order +="</div>";
			select_salesman_order +="</div>";
			select_salesman_order +="</section>";
			select_salesman_order +="</main>";
			

				$("#page-content-main").html(select_salesman_order);
				changePageTitle("Realizacja zamówienia - admin");
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#select-salesman-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/order/handle-checkout.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(data) {
		    	        // klient utworzony, powrót do listy klientów
		    	    	if(data.message){
		    	    		$(".valid-info-report-sale").html(data.message);
		    	    	} else {
		    	    		readOrdersTemplate(data);;
		    	    	}
//		    	        showInfoAdmin("test");
		    	        
		    	    },
		    	    error: function(xhr, resp, text) {
		    	        // pokaz błedy w konsoli
		    	        console.log(xhr, resp, text);
		    	    }
			})
			
			
		});
		
		
});








