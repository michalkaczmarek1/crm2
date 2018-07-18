
// wyswietla liste zamowien zrealizowanych dla klienta
function readOrdersComplClientTemplate(data, contentInfo=""){
 
    var orders_compl_client_html="";
 
    orders_compl_client_html = "<main>";
    orders_compl_client_html += "<section class='well1'>";
    orders_compl_client_html += "<div class='container'>";
    orders_compl_client_html += "<h2>Lista zamówień zrealizowanych</h2>";
    orders_compl_client_html += "<div class='alert alert-info valid-info-orders-client'>"+contentInfo+"</div>";
    orders_compl_client_html += "<a href='' class='btn btn-primary btn-sm active orders-client'>Wróć do zamówień</a><br/>";
 
    // start table
    orders_compl_client_html+="<div class='table-responsive'>"
    orders_compl_client_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    orders_compl_client_html+="<tr>";
    orders_compl_client_html+="<th class='w-25-pct'><strong>Numer zamówienia</strong></th>";
    orders_compl_client_html+="<th class='w-25-pct'><strong>Data zamówienia</strong></th>";
    orders_compl_client_html+="<th class='w-10-pct'><strong>Treść</strong></th>";
    orders_compl_client_html+="<th class='w-15-pct'><strong>Wartosc zamówienia</strong></th>";
    orders_compl_client_html+="<th class='w-15-pct'><strong>Numer faktury</strong></th>";
    orders_compl_client_html+="<th class='w-15-pct'><strong>Przedstawiciel</strong></th>";
    orders_compl_client_html+="<th class='w-25-pct text-align-center'><strong>Akcje</strong></th>";
    orders_compl_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
        
        orders_compl_client_html+="<tr>";
             
        orders_compl_client_html+="<td>" + val.nr_order + "</td>";
        orders_compl_client_html+="<td>" + val.date_order + "</td>";
        orders_compl_client_html+="<td>" + val.content + "</td>";
        orders_compl_client_html+="<td>" + val.value_order + "</td>";
        orders_compl_client_html+="<td>" + val.nr_invoice + "</td>";
        orders_compl_client_html+="<td>" + val.name_salesman + " " + val.surname_salesman + "</td>";
    
  
             // przycisk akcji
        orders_compl_client_html+="<td>";

        
        // przycisk do zgłoszenia reklamacji
        orders_compl_client_html+="<button class='m-r-10px btn-info btn-xs' id='add-complaint' data-id='" + val.nr_order + "'>";
        orders_compl_client_html+="Zgłoś reklamacje";
        orders_compl_client_html+="</button>";
    
        orders_compl_client_html+="</td>";
//  
    
        
        orders_compl_client_html+="</tr>";       
 
    });
 
    // end table
    orders_compl_client_html+="</table>";
    orders_compl_client_html += "</div>";
    orders_compl_client_html += "</div>";
    orders_compl_client_html += "</section>";
    orders_compl_client_html += "</main>";

    
    
    $(".page-content-main").html(orders_compl_client_html);
}

