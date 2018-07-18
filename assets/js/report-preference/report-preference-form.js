//generowanie raprotu preferencji
$(document).ready(function(){
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
		
		$(document).on("click","#add-report-preference", function(e){
				
				e.preventDefault();

				$.getJSON(route+"crm2.0/resources/report-preference/gen-report-preference.php", function(result){
					
					

			
					// formularz "Raport preferencji"
				
					var report_preference_html;
					
					report_preference_html = "<main>";
					report_preference_html += "<section class='well1'>";
					report_preference_html += "<div class='container'>";
					report_preference_html += "<div class='col-md-offset-3 col-md-6'>";
					report_preference_html += "<form role='form' action='#' method='post' id='report-preference-form'>";
					
					//pole z nazwa raportu
					report_preference_html += "<div class='form-group'>";
					report_preference_html += "<label for='date' class='col-md-4'> Raport preferencji: </label>";
					report_preference_html += "<div class='col-md-8'>";
					report_preference_html += "<input type='text' name='name_report' class='form-control'  value='" + result.name_report + "' readonly='readonly'>";
					report_preference_html += "</div>";
					report_preference_html += "</div>";
					
//					pole select dla klientów
					report_preference_html += "<div class='select-client'></div>";
					getDataClient();

//					pole select dla ofert					
					report_preference_html += "<div class='select-offer'></div>";
					getDataOffer();

					
					report_preference_html += "<div class='form-group'>";
					report_preference_html += "<label for='comments' class='col-md-4'> Uwagi: </label>";
					report_preference_html += "<div class='col-md-8'>";
					report_preference_html += "<textarea type='textarea' class='form-control' name='comments' rows='3' placeholder='Wprowadź uwagi'></textarea>";
					report_preference_html += "</div>";
					report_preference_html += "</div>";
		            
		            
//					pobranie id przedstawiciela
					report_preference_html += "<div class='id-salesman'></div>";
					getIdSalesman();
					
					//pobranie id raportu
					report_preference_html += "<input value=\"" + result.id_report + "\" name='id_report' type='hidden' />";
					report_preference_html += "<div class='row'>";
					report_preference_html += "<div class='col-md-offset-2 col-md-10'>";
					report_preference_html += "<p class='post'></p>";
					report_preference_html += "<button type='submit' class='btn btn-primary'> Wyslij raport </button>";
					report_preference_html += "</div>";
					report_preference_html += "</div>";
					report_preference_html += "</form>";
					report_preference_html += "<a href='#' class='btn btn-primary btn-sm active marketing'>powrót</a><br/>";
					report_preference_html +="</div>";
					report_preference_html +="</div>";
					report_preference_html +="</div>";
					report_preference_html +="</section>";
					report_preference_html +="</main>";
				

					
					
				
				
				$(".page-content-main").html("<div id='info-marketing-form' class='alert alert-info'>"+result.success+"</div>"+report_preference_html);
				
				
				// obsługa formularza
				
				$(document).on("submit", "#report-preference-form", function(e){
					
					e.preventDefault();

					
					
					var form_data = JSON.stringify($(this).serializeArray());
					
					
					
					
					$.ajax({
						  url: route+"crm2.0/resources/report-preference/update.php",
				    	    type : "POST",
				    	    contentType : 'application/json',
				    	    data : form_data,
				    	    success : function(data) {

				    	    	
				    	    	showInfoMarketing(data.message);
				    	    	
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
				    report_sale_salesman_html  += "</div>";
				    report_sale_salesman_html  += "</div>";
				    report_sale_salesman_html  += "</section>";
				    report_sale_salesman_html  += "</main>";
				
				$("#page-content-main").html(report_sale_salesman_html);
				
		});
			
	});
		
	
		
});



	
  	 
	






