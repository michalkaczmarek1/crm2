//wyswietla liste zamowien dla klienta
function readOrdersClientTemplate(data){
 
    var orders_client_html="";
 

    orders_client_html = "<main>";
    orders_client_html += "<section class='well1'>";
    orders_client_html += "<div class='container'>";
    orders_client_html += "<h2>Lista zamówień</h2>";
    
    orders_client_html += "<a href='' class='btn btn-primary btn-sm active orders-compl-client' >Pobierz zamówienia zrealizowane</a>";
    orders_client_html += "<a href='' class='btn btn-primary btn-sm active show-complaints' >Zobacz swoje reklamacje</a><br/>";
 
    // start table
    orders_client_html+="<div class='table-responsive'>"
    orders_client_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    orders_client_html+="<tr>";
    orders_client_html+="<th class='w-25-pct'><strong>Numer zamówienia</strong></th>";
    orders_client_html+="<th class='w-25-pct'><strong>Data zamówienia</strong></th>";
    orders_client_html+="<th class='w-10-pct'><strong>Treść</strong></th>";
    orders_client_html+="<th class='w-15-pct'><strong>Wartosc zamówienia</strong></th>";
    orders_client_html+="<th class='w-15-pct'><strong>Numer faktury</strong></th>";
    orders_client_html+="<th class='w-15-pct'><strong>Przedstawiciel</strong></th>";
    orders_client_html+="<th class='w-25-pct text-align-center'><strong>Status zamówienia</strong></th>";
    orders_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
        
        orders_client_html+="<tr>";
             
        orders_client_html+="<td>" + val.nr_order + "</td>";
        orders_client_html+="<td>" + val.date_order + "</td>";
        orders_client_html+="<td>" + val.content + "</td>";
        orders_client_html+="<td>" + val.value_order + "</td>";
        orders_client_html+="<td>" + val.nr_invoice + "</td>";
        orders_client_html+="<td>" + val.name_salesman + " " + val.surname_salesman + "</td>";
    

        orders_client_html+="<td>";
        
        orders_client_html+="<p>oczekujace na realizacje</p>";
        
        orders_client_html+="</td>";
        
        orders_client_html+="</tr>";       
 
    });
 
    // end table
    orders_client_html+="</table>";
    orders_client_html += "</div>";
    orders_client_html += "</div>";
    orders_client_html += "</section>";
    orders_client_html += "</main>";


    
    $(".page-content-main").html(orders_client_html);
}


