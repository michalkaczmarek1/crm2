//formularz dodaj zamówienie
$(document).ready(function(){
		
		// wyświetl formularz "Dodaj zamówienie"
	
		$(document).on("click","#add-order", function(e){
			e.preventDefault();
			
			
				// formularz "Dodaj zamówienie"
			
			var salesman_add_order;

			salesman_add_order = "<main>";
			salesman_add_order += "<section class='well1'>";
			salesman_add_order += "<div class='container'>";
			salesman_add_order += "<div class='alert alert-info valid-info-order'></div>";			
			salesman_add_order += "<div class='col-md-offset-3 col-md-6'>";
			salesman_add_order += "<h2 class='text-center'>Dodaj zamówienie</h2>";
			salesman_add_order += "<form role='form' action='#' method='post' id='add-order-form'>";
			salesman_add_order += "<div id='date'></div>";
			salesman_add_order += "<div class='salesman-field'></div>";
			//pobranie daty i danych przedstawiciela
			getDataForm();
			//pole przedstawiciela
			
			
			// pole select dla faktur
			salesman_add_order += "<div class='select-invoice'></div>";
			getDataInvoice();
			
//			pole select dla klientów
			salesman_add_order += "<div class='select-client'></div>";
			getDataClient();
			
//			pole select dla samochodów
			salesman_add_order += "<div class='select-car'></div>";
			getDataCar();
			salesman_add_order += "<div class='row'>";
			salesman_add_order += "<div class='col-xs-6 col-xs-offset-5 col-sm-6 col-sm-offset-5 col-md-6 col-md-offset-5 col-lg-6 col-lg-offset-5'>";
			salesman_add_order += "<p class='post'></p>";
			salesman_add_order += "<button type='submit' class='btn btn-info1'> Dodaj zamówienie </button>";
			salesman_add_order += "</div>";
			salesman_add_order += "</div>";
			salesman_add_order += "</form>";
			salesman_add_order += "<a href='#' class='btn btn-primary btn-sm active sale'>powrót</a><br/>";
			salesman_add_order +="</div>";
			salesman_add_order +="</div>";
			salesman_add_order +="</div>";
			salesman_add_order +="</section>";
			salesman_add_order +="</main>";
			
				
			$(".page-content-main").html(salesman_add_order);
							
		});
		
	
		
		// obsługa formularza
		
		$(document).on("submit", "#add-order-form", function(e){
			
			e.preventDefault();
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var form_data = JSON.stringify($(this).serializeArray());
			
			$.ajax({
				  url: route+"crm2.0/resources/order/order.php",
		    	    type : "POST",
		    	    contentType : 'application/json',
		    	    data : form_data,
		    	    success : function(result) {
		    	        // zamówienie utworzone, powrót do zakładki sprzedaż
		    	    	
		    	    	if(result.error_mess){
		    	    		$(".valid-info-order").html("<p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p>");
		    	    	} else {
			    	        
			    	        if(!result.error){
			    	        	showInfo(result.message);
			    	    	} else {
			    	    		$(".valid-info-order").html(result.error);
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

//pobranie danych przedstawiciela do formularza
function getDataInvoice(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/invoice/read-numbers.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_invoice_html;
        // html for listing products
    	
    	select_invoice_html ="<div class='form-group'>";
		 select_invoice_html +="<label for='invoice' class='col-md-4'>";
		 select_invoice_html +="Faktura:";
		 select_invoice_html +="</label>";
		 select_invoice_html +="<div class='col-md-8'>";
		 select_invoice_html +="<select name='invoice' class='form-control'>";
			
			 select_invoice_html +="<option value=" + data.id_invoice + ">" + data.nr_invoice + "</option>";
		
        
        
   	 select_invoice_html +="</select>";
	 select_invoice_html +="</div>";
	 select_invoice_html +="</div>";
	 
	 $(".select-invoice").html(select_invoice_html);
        
    
        
        // chage page title
//        changePageTitle("Read Products");
 
    });
}

//pobranie danych samochodu do formularza
function getDataCar(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/car/read-model.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_car_html;
        // html for listing products
    	
    	select_car_html ="<div class='form-group'>";
		 select_car_html +="<label for='invoice' class='col-md-4'>";
		 select_car_html +="Wybierz&nbsp;samochody:";
		 select_car_html +="</label>";
		 select_car_html +="<div class='col-md-8'>";
		 select_car_html +="<select name='cars[]' class='form-control' multiple='multiple'>";
		 
        $.each(data.records, function (key, val){
        
        	
			 select_car_html +="<option value=" + val.id_car + ">" + val.mark + " " + val.model + " " + val.engine + "cm3 " + val.horsepower + "KM " +val.truck_or_delivery+"</option>";
		
        });
        
   	 select_car_html +="</select>";
	 select_car_html +="</div>";
	 select_car_html +="</div>";
	 
	 $(".select-car").html(select_car_html);
        
    
        
        // chage page title
//        changePageTitle("Read Products");
 
    });
}



//pobranie danych przedstawiciela do formularza
function getDataForm(){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"crm2.0/resources/order/read-salesman.php";
    // get list of products from the API
	var salesman_date_order;
    $.getJSON(json_url, function(data){
    	
       	salesman_date_order = "<div class='form-group'>";
		salesman_date_order += "<label for='date' class='col-md-4'> Data zamówienia: </label>";
		salesman_date_order += "<div class='col-md-8'>";
		salesman_date_order += "<input type='text' name='date' class='form-control' id='date' value='"+data.date+"'>";
		salesman_date_order += "</div>";
		salesman_date_order += "</div>";
	 
	 
		$("#date").html(salesman_date_order);
    	    	
    	var salesman_name;
    	
        // html for listing products
    	
    	salesman_name = "<div class='form-group'>";
		salesman_name += "<label for='city' class='col-md-4'> Przedstawiciel: </label>";
		salesman_name += "<div class='col-md-8'>";	
        	salesman_name += "<input name='salesman' type='text' class='form-control' value='" + data.name + " " + data.surname + "' readonly='readonly'>";
		salesman_name += "</div>";
		salesman_name += "</div>";
	 
	 
		$(".salesman-field").html(salesman_name);
    
        
        // chage page title
//		        changePageTitle("Read Products");
 
  
        
        // chage page title
//        changePageTitle("Read Products");
 
    });
    
    
}

//pobranie danych klientów do formularza
function getDataClient(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/salesman/read-clients.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_client_html;
        // html for listing products
    	
    	select_client_html ="<div class='form-group'>";
		 select_client_html +="<label for='salesmans' class='col-md-4'>";
		 select_client_html +="Wybierz&nbsp;klienta:";
		 select_client_html +="</label>";
		 select_client_html +="<div class='col-md-8'>";
		 select_client_html +="<select name='client'class='form-control'>";
		 
        $.each(data.records_salesman, function (key, val){
        
        	
			 select_client_html +="<option value=" + val.id_client_salesman + ">" + val.name_client_salesman + " " + val.surname_client_salesman + "</option>";
			 
        });
        
   	 select_client_html +="</select>";
	 select_client_html +="</div>";
	 select_client_html +="</div>";
	 
	 $(".select-client").html(select_client_html);
        
    
        
        // chage page title
//        changePageTitle("Read Products");
 
    });
}


