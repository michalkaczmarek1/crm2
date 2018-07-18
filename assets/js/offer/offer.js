//wyswietla liste ofert
function readOffersTemplate(data, contentInfo = ""){
 
    var admin_offer_html="";
 

    admin_offer_html = "<main>";
    admin_offer_html += "<section class='well1'>";
    admin_offer_html += "<div class='container'>";
    admin_offer_html += "<h2>Lista ofert</h2>";
    admin_offer_html += "<div class='info-car alert alert-info'>"+contentInfo+"</div>";
    admin_offer_html += "<a href='#' class='btn btn-primary btn-sm active marketing-admin'>POWRÓT  </a>";
    admin_offer_html += "<a href='' class='btn btn-primary btn-sm active' id='create-offer' >Dodaj nową ofertę</a><br/>";
    
 
    // start table
    admin_offer_html += "<div class='table-responsive'>"
    admin_offer_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    admin_offer_html+="<tr>";
    admin_offer_html+="<th class='w-25-pct'><strong>Numer</strong></th>";
    admin_offer_html+="<th class='w-25-pct'><strong>Nazwa</strong></th>";
    admin_offer_html+="<th class='w-10-pct'><strong>Data wprowadzenia</strong></th>";
    admin_offer_html+="<th class='w-15-pct'><strong>Początek oferty</strong></th>";
    admin_offer_html+="<th class='w-15-pct'><strong>Koniec oferty</strong></th>";
    admin_offer_html+="<th class='w-15-pct'><strong>Opis</strong></th>";
    admin_offer_html+="<th class='w-15-pct'><strong>Obniżka w %</strong></th>";
    admin_offer_html+="<th class='w-25-pct text-align-center'><strong>Akcje</strong></th>";
    admin_offer_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	admin_offer_html+="<tr>";
    		 
    
    	admin_offer_html+="<td>" + val.id_offer + "</td>";
    	admin_offer_html+="<td>" + val.name + "</td>";
    	admin_offer_html+="<td>" + val.date_offer + "</td>";
    	admin_offer_html+="<td>" + val.start_date + "</td>";
    	admin_offer_html+="<td>" + val.end_date + "</td>";
    	admin_offer_html+="<td>" + val.description + "</td>";
    	admin_offer_html+="<td>" + val.reduction + "</td>";
    
  
             // 'action' buttons
    	admin_offer_html+="<td>";
                 // read product button
    	admin_offer_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-offer-button' data-id='" + val.id_offer + "'>";
    	admin_offer_html+="Pokaż";
    	admin_offer_html+="</button>";
  
                 // edit button
    	admin_offer_html+="<button class='m-r-10px btn-warning btn-xs' id='update-offer-button' data-id='" + val.id_offer + "'>";
    	admin_offer_html+="Edytuj";
    	admin_offer_html+="</button>";
  
                 // delete button
    	admin_offer_html+="<button class='m-r-10px btn-danger btn-xs' id='delete-offer-button' data-id='" + val.id_offer + "'>";
    	admin_offer_html+="Usuń";
    	admin_offer_html+="</button>";
    	
    	admin_offer_html+="</td>";
  
    	admin_offer_html+="</tr>";       
 
    });
 
    // end table
    admin_offer_html+="</table>";
    admin_offer_html += "</div>";
    admin_offer_html += "</div>";
    admin_offer_html += "</section>";
    admin_offer_html += "</main>";

    
    $("#page-content-main").html(admin_offer_html);
}

