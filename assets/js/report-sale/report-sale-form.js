//generowania raportu sprzedazy
$(document).ready(function(){
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
		
		$(document).on("click","#add-report-sale", function(e){
				
				e.preventDefault();

				$.getJSON(route+"crm2.0/resources/report-sale/gen-report-sale.php", function(result){
					
					

				
				
			
			
				// formularz "Raport zamowien"
			
				var report_order_admin;
				
				report_order_admin = "<main>";
				report_order_admin += "<section class='well1'>";
				report_order_admin += "<div class='container'>";
				report_order_admin += "<div class='alert alert-info valid-info-report-sale'></div>";
				report_order_admin += "<div class='col-md-offset-3 col-md-6'>";
				
				report_order_admin += "<form role='form' action='#' method='post' id='report-order-form'>";
				//pobranie nazwy i dat z raportu
				//pole z nazwa raportu
			 	report_order_admin += "<div class='form-group'>";
				report_order_admin += "<label for='date' class='col-md-3'> Raport sprzedaży: </label>";
				report_order_admin += "<div class='col-md-10'>";
				report_order_admin += "<input type='text' name='name_report' class='form-control'  value='" + result.name_report + "' data-id='"+result.id_report_sale+"' readonly='readonly'>";
				report_order_admin += "</div>";
				report_order_admin += "</div>";
				
				//pobranie id raportu
				
//				var form_data2 = JSON.stringify({ id: id_report });
				//pole z zakresem czasu
				report_order_admin += "<div class='form-group'>";
				report_order_admin += "<label for='city' class='col-md-3'> Zakres czasu: </label>";
				report_order_admin += "<div class='col-md-10'>";	
				report_order_admin += "<input name='date_report' type='text' class='form-control' value='" + result.start_date + " - " + result.end_date + "' readonly='readonly'>";
				report_order_admin += "</div>";
				report_order_admin += "</div>";
//				var id = $(this).attr("data-id");
//				console.log(id);
//				wstawienie przedstawicieli
				report_order_admin +="<div class='select-salesman'></div>";
				 getDataSalesman();
				//pobranie id raportu
				 report_order_admin += "<input value=\"" + result.id_report_sale + "\" name='id' type='hidden' />";
				report_order_admin += "<div class='row'>";
				report_order_admin += "<div class='col-md-offset-2 col-md-10'>";
				report_order_admin += "<p class='post'></p>";
				report_order_admin += "<button type='submit' class='btn btn-primary'> Generuj raport zamowień </button>";
				report_order_admin += "</div>";
				report_order_admin += "</div>";
				report_order_admin += "</form>";
				report_order_admin += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>powrót</a><br/>";
				report_order_admin +="</div>";
				report_order_admin +="</div>";
				report_order_admin +="</div>";
				report_order_admin +="</section>";
				report_order_admin +="</main>";
			
				
//				form_html = "<h2>Dodaj przedstawiciela</h2>"
//				form_html += "<form action='#' method='post' id='add-salesman-form'><label>Imię</label><br><input type='text' name='name'><br>";
//				form_html += "<label>Nazwisko</label><br><input type='text' name='surname'><br>";
//				form_html += "<label>Adres</label><br><textarea rows='5' name='address'></textarea><br>";
//				form_html += "<label>Miasto</label><br><input type='text' name='city'><br>";
//				form_html += "<label>Email</label><br><input type='email' name='email'><br>";
//				form_html += "<input type='submit' value='Dodaj'></form><br>";
				
				if(result.error_mess){
    	    		
    	    		$("#page-content-main").html("<div id='info-sale-admin-form' class='alert alert-info'><p>Bład wprowadzonych danych. Sprawdź ich poprawność lub skontaktuj sie z administratorem</p></div>"+report_order_admin);
    	    	} else {
    	    		

    				$("#page-content-main").html("<div id='info-sale-admin-form' class='alert alert-info'>"+result.success+"</div>"+report_order_admin);
    				changePageTitle("Raport sprzedaży - admin");
	    	    
    	    		
    	    	}
				
				
				
				
				
				// obsługa formularza
				
				$(document).on("submit", "#report-order-form", function(e){
					
					e.preventDefault();
//					var route = "http://pp42877.wsbpoz.solidhost.pl/";
					
					
					var form_data = JSON.stringify($(this).serializeArray());
					
					
					
					
					$.ajax({
						  url: route+"crm2.0/resources/order/read-orders-completed.php",
				    	    type : "POST",
				    	    contentType : 'application/json',
				    	    data : form_data,
				    	    success : function(data) {
				    	        // klient utworzony, powrót do listy klientów
				    	    	
//				    	        showInfoAdmin("test");
				    	    	if(data.message){
				    	    		$(".valid-info-report-sale").html(data.message);
				    	    	} else {
				    	    		readOrdersCompletedTemplate(data);
				    	    	}
				    	        
				    	    },
				    	    error: function(xhr, resp, text) {
				    	        // pokaz błedy w konsoli
				    	        console.log(xhr, resp, text);
				    	    }
					})
					
					
				});
		
			});
				
		});
		
		$(document).on("click","#show-report-sale", function(e){
			
			e.preventDefault();
	
			$.getJSON(route+"crm2.0/resources/report-sale/read-report-sale.php", function(data){
				
				 var report_sale_salesman_html ="";
				 
		
				    report_sale_salesman_html  = "<main>";
				    report_sale_salesman_html  += "<section class='well1'>";
				    report_sale_salesman_html  += "<div class='container'>";
				    report_sale_salesman_html  += "<h2>"+data.name_report+"</h2>";
				    
				 
				    // start table
				    report_sale_salesman_html +="<div class='table-responsive'>"
				    report_sale_salesman_html +="<table class='table table-bordered table-hover'>";
				 
				        // creating our table heading
				    report_sale_salesman_html +="<tr>";
				    report_sale_salesman_html +="<th class='w-25-pct'><b>Zakres raportu</b></th>";
				    report_sale_salesman_html +="<th class='w-25-pct'><b>Przedstawiciel</b></th>";
				    report_sale_salesman_html +="<th class='w-10-pct'><b>Ilość zrealizowanych zamówień</b></th>";
				    report_sale_salesman_html +="<th class='w-15-pct'><b>Całkowita wartość zamówień (w zł)</b></th>"
				    report_sale_salesman_html +="</tr>";
				 
			
				 
				        // creating new table row per record
				    	
				    	report_sale_salesman_html +="<tr>";
				    		 
				    	report_sale_salesman_html +="<td>" + data.start_date + " - " + data.end_date+"</td>";
				    	report_sale_salesman_html +="<td>" + data.name_salesman + " " + data.surname_salesman + "</td>";
				    	report_sale_salesman_html +="<td>" + data.amount_orders + "</td>";
				    	report_sale_salesman_html +="<td>" + data.value_orders_report + "</td>";
				     
				    	report_sale_salesman_html +="</tr>";       
				 
				 
				    // end table
				    report_sale_salesman_html +="</table>";
				    report_sale_salesman_html += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>powrót</a><br/>";
				    report_sale_salesman_html  += "</div>";
				    report_sale_salesman_html  += "</div>";
				    report_sale_salesman_html  += "</section>";
				    report_sale_salesman_html  += "</main>";
				
				$("#page-content-main").html(report_sale_salesman_html);
				
		});
			
	});
		
	
		
});


	
  	 
	






