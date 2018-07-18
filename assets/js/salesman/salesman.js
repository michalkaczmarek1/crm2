// lista przedstawicieli
function readSalesmansTemplate(data, contentInfo = ""){
 
    var admin_salesman_html="";
 

    admin_salesman_html = "<main>";
    admin_salesman_html += "<section class='well1'>";
    admin_salesman_html += "<div class='container'>";
    admin_salesman_html += "<h2>Lista przedstawicieli</h2>";
    admin_salesman_html += "<div class='alert alert-info' id='info-sale'>"+contentInfo+"</div>";
    admin_salesman_html += "<a href='' class='btn btn-primary btn-sm active' id='create-salesman' >Dodaj nowego przedstawiciela</a><br/>";
 
    // start table
    admin_salesman_html += "<div class='table-responsive'>"
    admin_salesman_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    admin_salesman_html+="<tr>";
    admin_salesman_html+="<th class='w-25-pct'>Id</th>";
    admin_salesman_html+="<th class='w-25-pct'>Imie</th>";
    admin_salesman_html+="<th class='w-10-pct'>Nazwisko</th>";
    admin_salesman_html+="<th class='w-15-pct'>Adres</th>";
    admin_salesman_html+="<th class='w-15-pct'>Miasto</th>";
    admin_salesman_html+="<th class='w-15-pct'>Email</th>";
    admin_salesman_html+="<th class='w-25-pct text-align-center'>Action</th>";
    admin_salesman_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	admin_salesman_html+="<tr>";
    		 
    	admin_salesman_html+="<td>" + val.id_salesman + "</td>";
    	admin_salesman_html+="<td>" + val.name + "</td>";
    	admin_salesman_html+="<td>" + val.surname + "</td>";
    	admin_salesman_html+="<td>" + val.address + "</td>";
    	admin_salesman_html+="<td>" + val.city + "</td>";
    	admin_salesman_html+="<td>" + val.email + "</td>";
    
  
             // 'action' buttons
    	admin_salesman_html+="<td>";
                 // read product button
    	admin_salesman_html+="<button class='m-r-10px btn-primary btn-xs' id='read-one-salesman-button' data-id='" + val.id_salesman + "'>";
    	admin_salesman_html+="Pokaż";
    	admin_salesman_html+="</button>";
  
                 // edit button
    	admin_salesman_html+="<button class='m-r-10px btn-warning btn-xs' id='update-salesman-button' data-id='" + val.id_salesman + "'>";
    	admin_salesman_html+="Edytuj";
    	admin_salesman_html+="</button>";
  
                 // delete button
    	admin_salesman_html+="<button class='m-r-10px btn-danger btn-xs' id='delete-salesman-button' data-id='" + val.id_salesman + "'>";
    	admin_salesman_html+="Usuń";
    	admin_salesman_html+="</button>";
    	
    	//register button
    	admin_salesman_html+="<button class='m-r-10px btn-primary btn-xs' id='register-salesman-button' data-id='" + val.id_salesman + "'>";
    	admin_salesman_html+="Zarejestruj";
    	admin_salesman_html+="</button>";
    	admin_salesman_html+="</td>";
  
    	admin_salesman_html+="</tr>";       
 
    });
 
    // end table
    admin_salesman_html+="</table>";
    admin_salesman_html += "</div>";
    admin_salesman_html += "</div>";
    admin_salesman_html += "</section>";
    admin_salesman_html += "</main>";


    $("#page-content-main").html(admin_salesman_html);
}

