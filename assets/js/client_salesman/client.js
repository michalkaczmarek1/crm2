
//wyswietla liste klietnow dla przedstawiciela
function readClientsSalesmanTemplate(data, contentInfo=""){
 
	var salesman_client_html="";
	 

    salesman_client_html = "<main>";
    salesman_client_html += "<section class='well1'>";
    salesman_client_html += "<div class='container'>";
    salesman_client_html += "<h2>Lista klientów</h2>";
    salesman_client_html += "<div class='alert alert-info' id='info-sale'>"+contentInfo+"</div>";
    salesman_client_html += "<a href='#' class='btn btn-primary btn-sm active client'>powrót</a>";
    salesman_client_html += "<a href='' class='btn btn-primary btn-sm active' id='create-client-salesman' >Dodaj nowego klienta</a><br/>";
 
    // start table
    salesman_client_html+= "<div class='table-responsive'>"
    salesman_client_html+= "<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    salesman_client_html+="<tr>";
    salesman_client_html+="<th class='w-25-pct'>Id</th>";
    salesman_client_html+="<th class='w-25-pct'>Imie</th>";
    salesman_client_html+="<th class='w-10-pct'>Nazwisko</th>";
    salesman_client_html+="<th class='w-15-pct'>Adres</th>";
    salesman_client_html+="<th class='w-15-pct'>Miasto</th>";
    salesman_client_html+="<th class='w-15-pct'>Email</th>";
    salesman_client_html+="<th class='w-15-pct'>Status</th>";
    salesman_client_html+="<th class='w-25-pct text-align-center'>Akcje</th>";
    salesman_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
        
        salesman_client_html+="<tr>";
             
        salesman_client_html+="<td>" + val.id_client + "</td>";
        salesman_client_html+="<td>" + val.name + "</td>";
        salesman_client_html+="<td>" + val.surname + "</td>";
        salesman_client_html+="<td>" + val.address + "</td>";
        salesman_client_html+="<td>" + val.city + "</td>";
        salesman_client_html+="<td>" + val.email + "</td>";
        salesman_client_html+="<td>" + val.status + "</td>";
        
        
  
             // 'action' buttons
        salesman_client_html+="<td>";
                 // read product button
        salesman_client_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-salesman-client-button' data-id='" + val.id_client + "'>";
        salesman_client_html+="Pokaż";
        salesman_client_html+="</button>";
  
                 // edit button
        salesman_client_html+="<button class='m-r-10px btn-warning btn-xs' id='update-salesman-client-button' data-id='" + val.id_client + "'>";
        salesman_client_html+="Edytuj";
        salesman_client_html+="</button>";
  
                 // delete button
        salesman_client_html+="<button class='m-r-10px btn-danger btn-xs' id='delete-salesman-client-button' data-id='" + val.id_client + "'>";
        salesman_client_html+="Usuń";
        salesman_client_html+="</button>";
        salesman_client_html+="</td>";
  
        salesman_client_html+="</tr>";       
 
    });
 
    // end table
    salesman_client_html+="</table>";
    salesman_client_html += "</div>";
    salesman_client_html += "</div>";
    salesman_client_html += "</section>";
    salesman_client_html += "</main>";


    $(".page-content-main").html(salesman_client_html);
}

