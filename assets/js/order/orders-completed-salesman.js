// wyswietla liste zamowien zrealizowanych
function readOrdersCompletedTemplate(data){
 
	 var orders_completed_salesman_html="";

	    orders_completed_salesman_html = "<main>";
	    orders_completed_salesman_html += "<section class='well1'>";
	    orders_completed_salesman_html += "<div class='container'>";
	    orders_completed_salesman_html += "<h2>Zamówienia zrealizowane przez przedstawiciela z ostatnich 7 dni</h2>";
	    
	 
	    // start table
	    orders_completed_salesman_html+="<div class='table-responsive'>"
	    orders_completed_salesman_html+="<table class='table table-bordered table-hover'>";
	 
	        // creating our table heading
	    orders_completed_salesman_html+="<tr>";
	    orders_completed_salesman_html+="<th class='w-25-pct'><b>Numer zamówienia</b></th>";
	    orders_completed_salesman_html+="<th class='w-25-pct'><b>Data zamówienia</b></th>";
	    orders_completed_salesman_html+="<th class='w-10-pct'><b>Treść</b></th>";
	    orders_completed_salesman_html+="<th class='w-15-pct'><b>Wartosc zamówienia</b></th>";
	    orders_completed_salesman_html+="<th class='w-15-pct'><b>Numer faktury</b></th>";
	    orders_completed_salesman_html+="<th class='w-15-pct'><b>Klient</b></th>";
	    orders_completed_salesman_html+="</tr>";
	 
	    // loop through returned list of data
	    $.each(data.records, function(key, val) {
	 
	        // creating new table row per record
	    	
	    	orders_completed_salesman_html+="<tr>";
	    		 
	    	orders_completed_salesman_html+="<td>" + val.nr_order + "</td>";
	    	orders_completed_salesman_html+="<td>" + val.date_order + "</td>";
	    	orders_completed_salesman_html+="<td>" + val.content + "</td>";
	    	orders_completed_salesman_html+="<td>" + val.value_order + "</td>";
	    	orders_completed_salesman_html+="<td>" + val.nr_invoice + "</td>";
	    	orders_completed_salesman_html+="<td>" + val.name_client + " " + val.surname_client + "</td>";
	    	
	    
	  	  
	    	orders_completed_salesman_html+="</tr>";       
	 
	    });
	 
	    // end table
	    orders_completed_salesman_html+="</table>";
	    orders_completed_salesman_html += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>powrót</a>";
	    orders_completed_salesman_html+= "<a class='btn btn-primary' href='#' id='show-report-sale'>Pokaż raport sprzedaży</a>";
	    orders_completed_salesman_html += "</div>";
	    orders_completed_salesman_html += "</div>";
	    orders_completed_salesman_html += "</section>";
	    orders_completed_salesman_html += "</main>";


	    
	    $("#page-content-main").html(orders_completed_salesman_html);
	    
	
}

