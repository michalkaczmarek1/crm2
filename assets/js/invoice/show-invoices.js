//wyswietla liste faktur
function readInvoicesTemplate(data){
 
    var show_invoices_html="";



   // when clicked, it will load the create product form
    show_invoices_html = "<main>";
    show_invoices_html += "<section class='well1'>";
    show_invoices_html += "<div class='container'>";
    show_invoices_html += "<h3>Twoje zrealizowane faktury</h3>";
    show_invoices_html += "<a href='#' class='btn btn-primary btn-sm active sale'>powrót</a><br/>";

     // start table
    show_invoices_html += "<div class='table-responsive'>"
    show_invoices_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    show_invoices_html+="<tr>";
    show_invoices_html+="<th class='w-25-pct'>Numer faktury</th>";
    show_invoices_html+="<th class='w-25-pct'>Wartosć brutto (w zł)</th>";
    show_invoices_html+="<th class='w-25-pct text-align-center'>Akcje</th>";
    show_invoices_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	show_invoices_html+="<tr>";
    		 
    	show_invoices_html+="<td>" + val.nr_invoice + "</td>";
    	show_invoices_html+="<td>" + val.value_order + "</td>";
    
  
             // 'action' buttons
    	show_invoices_html+="<td>";
                 // read product button
    	show_invoices_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-invoice-button' data-number='" + val.nr_invoice + "'>";
    	show_invoices_html+="Pokaż";
    	show_invoices_html+="</button>";
  
    	show_invoices_html+="</td>";
  
    	show_invoices_html+="</tr>";       
 
    });
 
    // end table
    show_invoices_html+="</table>";
    show_invoices_html += "</div>";
    show_invoices_html += "</div>";
    show_invoices_html += "</section>";
    show_invoices_html += "</main>";
    
    $(".page-content-main").html(show_invoices_html);
}