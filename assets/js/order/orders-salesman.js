//wyswietla liste zamowien
function readOrdersTemplate(data){
 
    var orders_salesman_html="";
 

    orders_salesman_html = "<main>";
    orders_salesman_html += "<section class='well1'>";
    orders_salesman_html += "<div class='container'>";
    orders_salesman_html += "<h2>Lista zamówień przedstawiciela</h2>";
    orders_salesman_html += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>Wróć</a><br/>";
 
    // start table
    orders_salesman_html+="<div class='table-responsive'>"
    orders_salesman_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    orders_salesman_html+="<tr>";
    orders_salesman_html+="<th class='w-25-pct'>Numer zamówienia</th>";
    orders_salesman_html+="<th class='w-25-pct'>Data zamówienia</th>";
    orders_salesman_html+="<th class='w-10-pct'>Treść</th>";
    orders_salesman_html+="<th class='w-15-pct'>Wartosc zamówienia</th>";
    orders_salesman_html+="<th class='w-15-pct'>Numer faktury</th>";
    orders_salesman_html+="<th class='w-15-pct'>Klient</th>";
    orders_salesman_html+="<th class='w-25-pct text-align-center'>Akcja</th>";
    orders_salesman_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	orders_salesman_html+="<tr>";
    		 
    	orders_salesman_html+="<td>" + val.nr_order + "</td>";
    	orders_salesman_html+="<td>" + val.date_order + "</td>";
    	orders_salesman_html+="<td>" + val.content + "</td>";
    	orders_salesman_html+="<td>" + val.value_order + "</td>";
    	orders_salesman_html+="<td>" + val.nr_invoice + "</td>";
    	orders_salesman_html+="<td>" + val.name_client + " " + val.surname_client + "</td>";
    
  
             // przycisk akcji
    	orders_salesman_html+="<td>";
  
           	// przycisk realizuj
    	orders_salesman_html+="<button class='m-r-10px btn-danger btn-xs' id='checkout-salesman-button' data-id='" + val.nr_order + "'>";
    	orders_salesman_html+="Realizuj";
    	orders_salesman_html+="</button>";
    
    	orders_salesman_html+="</td>";
  
    	orders_salesman_html+="</tr>";       
 
    });
 
    // end table
    orders_salesman_html+="</table>";
    orders_salesman_html += "</div>";
    orders_salesman_html += "</div>";
    orders_salesman_html += "</section>";
    orders_salesman_html += "</main>";


    
    $("#page-content-main").html(orders_salesman_html);
}

