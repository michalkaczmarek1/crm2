// wyswietla liste ofert dla klienta
function readOffersClientTemplate(data){
 
    var client_offer_html="";
 
    client_offer_html = "<main>";
    client_offer_html += "<section class='well1'>";
    client_offer_html += "<div class='container'>";
    client_offer_html += "<h2>Lista najnowszych ofert</h2>";
    
    
 
    // start table
    client_offer_html += "<div class='table-responsive'>"
    client_offer_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    client_offer_html+="<tr>";
    client_offer_html+="<th class='w-25-pct'><strong>Numer</strong></th>";
    client_offer_html+="<th class='w-25-pct'><strong>Nazwa</strong></th>";
    client_offer_html+="<th class='w-10-pct'><strong>Data wprowadzenia</strong></th>";
    client_offer_html+="<th class='w-15-pct'><strong>Początek oferty</strong></th>";
    client_offer_html+="<th class='w-15-pct'><strong>Koniec oferty</strong></th>";
    client_offer_html+="<th class='w-15-pct'><strong>Opis</strong></th>";
    client_offer_html+="<th class='w-15-pct'><strong>Obniżka w %</strong></th>";
    client_offer_html+="<th class='w-25-pct text-align-center'><strong>Akcje</strong></th>";
    client_offer_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
        
        client_offer_html+="<tr>";
             
    
        client_offer_html+="<td>" + val.id_offer + "</td>";
        client_offer_html+="<td>" + val.name + "</td>";
        client_offer_html+="<td>" + val.date_offer + "</td>";
        client_offer_html+="<td>" + val.start_date + "</td>";
        client_offer_html+="<td>" + val.end_date + "</td>";
        client_offer_html+="<td>" + val.description + "</td>";
        client_offer_html+="<td>" + val.reduction + "</td>";
    
        
        // 'action' buttons
        client_offer_html+="<td>";
                 // read product button
        client_offer_html+="<button class='m-r-10px btn-primary btn-xs contact-client'>";
        client_offer_html+="Skontaktuj sie z przedstawicielem";
        client_offer_html+="</button>";
    	
        client_offer_html+="</td>";
    	
        client_offer_html+="</tr>";       
 
    });
 
    // end table
    client_offer_html+="</table>";
    client_offer_html += "</div>";
    client_offer_html += "</div>";
    client_offer_html += "</section>";
    client_offer_html += "</main>";

    
    $(".page-content-main").html(client_offer_html);
}


