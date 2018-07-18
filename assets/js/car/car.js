// wyswietla szablon dla listy samochodów
function readCarsTemplate(data, contentInfo = ""){
 
    var admin_car_html="";
 
    admin_car_html = "<main>";
    admin_car_html += "<section class='well1'>";
    admin_car_html += "<div class='container'>";
    admin_car_html += "<h2>Lista samochodów</h2>";
    admin_car_html += "<div class='info-car alert alert-info'>"+contentInfo+"</div>";
    admin_car_html += "<a href='#' class='btn btn-primary btn-sm active sale-admin'>POWRÓT  </a>";
    admin_car_html += "<a href='' class='btn btn-primary btn-sm active' id='create-car' >Dodaj nowy samochód</a><br/>";
    
 
    // start table
    admin_car_html += "<div class='table-responsive'>"
    admin_car_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    admin_car_html+="<tr>";
    admin_car_html+="<th class='w-25-pct'><strong>Id</strong></th>";
    admin_car_html+="<th class='w-25-pct'><strong>Marka</strong></th>";
    admin_car_html+="<th class='w-10-pct'><strong>Model</strong></th>";
    admin_car_html+="<th class='w-15-pct'><strong>Silnik</strong></th>";
    admin_car_html+="<th class='w-15-pct'><strong>Moc silnika</strong></th>";
    admin_car_html+="<th class='w-15-pct'><strong>Samochód cięzarowy czy dostawczy</strong></th>";
    admin_car_html+="<th class='w-15-pct'><strong>Cena</strong></th>";
    admin_car_html+="<th class='w-25-pct text-align-center'>Akcje</th>";
    admin_car_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	admin_car_html+="<tr>";

    
    	admin_car_html+="<td>" + val.id_car + "</td>";
    	admin_car_html+="<td>" + val.mark + "</td>";
    	admin_car_html+="<td>" + val.model + "</td>";
    	admin_car_html+="<td>" + val.engine + " cm3</td>";
    	admin_car_html+="<td>" + val.horsepower + " KM</td>";
    	admin_car_html+="<td>" + val.truck_or_delivery + "</td>";
    	admin_car_html+="<td>" + val.price + " zł</td>";
    
  
             // 'action' buttons
    	admin_car_html+="<td>";
                 // read product button
    	admin_car_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-car-button' data-id='" + val.id_car + "'>";
    	admin_car_html+="Pokaż";
    	admin_car_html+="</button>";
  
                 // edit button
    	admin_car_html+="<button class='m-r-10px btn-warning btn-xs' id='update-car-button' data-id='" + val.id_car + "'>";
    	admin_car_html+="Edytuj";
    	admin_car_html+="</button>";
  
                 // delete button
    	admin_car_html+="<button class='m-r-10px btn-danger btn-xs' id='delete-car-button' data-id='" + val.id_car + "'>";
    	admin_car_html+="Usuń";
    	admin_car_html+="</button>";
    	
        // add offer
    	admin_car_html+="<button class='m-r-10px btn-primary btn-xs' id='offer-car-button' data-id='" + val.id_car + "'>";
    	admin_car_html+="Przypisz ofertę";
    	admin_car_html+="</button>";
    	
    	admin_car_html+="</td>";
  
    	admin_car_html+="</tr>";       
 
    });
 
    // end table
    admin_car_html+="</table>";
    admin_car_html += "</div>";
    admin_car_html += "</div>";
    admin_car_html += "</section>";
    admin_car_html += "</main>";


    $("#page-content-main").html(admin_car_html);
}


