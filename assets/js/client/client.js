//wyswietla liste klientow
function readClientsTemplate(data, contentInfo = ""){
 
    var admin_client_html="";
 
    admin_client_html = "<main>";
    admin_client_html += "<section class='well1'>";
    admin_client_html += "<div class='container'>";
    admin_client_html += "<h2>Lista klientów</h2>";
    admin_client_html += "<div class='alert alert-info' id='info-sale'>"+contentInfo+"</div>";
    admin_client_html += "<a href='' class='btn btn-primary btn-sm active' id='create-client' >Dodaj nowego klienta</a><br/>";
 
    // start table
    admin_client_html+= "<div class='table-responsive'>"
    admin_client_html+= "<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    admin_client_html+="<tr>";
    admin_client_html+="<th class='w-25-pct'>Id</th>";
    admin_client_html+="<th class='w-25-pct'>Imie</th>";
    admin_client_html+="<th class='w-10-pct'>Nazwisko</th>";
    admin_client_html+="<th class='w-15-pct'>Adres</th>";
    admin_client_html+="<th class='w-15-pct'>Miasto</th>";
    admin_client_html+="<th class='w-15-pct'>Email</th>";
    admin_client_html+="<th class='w-15-pct'>Status</th>";
    admin_client_html+="<th class='w-15-pct'>Przedstawiciel</th>";
    admin_client_html+="<th class='w-25-pct text-align-center'>Action</th>";
    admin_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	admin_client_html+="<tr>";
    		 
    	admin_client_html+="<td>" + val.id_client + "</td>";
    	admin_client_html+="<td>" + val.name + "</td>";
    	admin_client_html+="<td>" + val.surname + "</td>";
    	admin_client_html+="<td>" + val.address + "</td>";
    	admin_client_html+="<td>" + val.city + "</td>";
    	admin_client_html+="<td>" + val.email + "</td>";
    	admin_client_html+="<td>" + val.status + "</td>";
    	admin_client_html+="<td>" + val.sal_name + " " + val.sal_surname + "</td>";
    	
  
             // 'action' buttons
    	admin_client_html+="<td>";
                 // read product button
    	admin_client_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-client-button' data-id='" + val.id_client + "'>";
    	admin_client_html+="Pokaż";
    	admin_client_html+="</button>";
  
                 // edit button
    	admin_client_html+="<button class='m-r-10px btn-warning btn-xs' id='update-client-button' data-id='" + val.id_client + "'>";
    	admin_client_html+="Edytuj";
    	admin_client_html+="</button>";
  
                 // delete button
    	admin_client_html+="<button class='m-r-10px btn-danger btn-xs' id='delete-client-button' data-id='" + val.id_client + "'>";
    	admin_client_html+="Usuń";
    	admin_client_html+="</button>";
    	

    	if(val.register){
    		// register button
        	admin_client_html+="<button class='m-r-10px btn-xs btn-primary ' id='register-client-button' data-id='" + val.id_client + "'>";
        	admin_client_html+="Zarejestruj";
        	admin_client_html+="</button>";
          	
     
      
    	}
    	
          	admin_client_html+="</td>";
  
    	admin_client_html+="</tr>";       
 
    });
 
    // end table
    admin_client_html+="</table>";
    admin_client_html += "</div>";
    admin_client_html += "</div>";
    admin_client_html += "</section>";
    admin_client_html += "</main>";

    $("#page-content-main").html(admin_client_html);
}


