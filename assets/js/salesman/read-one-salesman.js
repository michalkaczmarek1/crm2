//szczegoly jednego przedstawiciela
$(document).ready(function(){
 
    // handle 'read one' button click
    $(document).on('click', '#read-one-salesman-button', function(){

    	//ściezka
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	// get product id
    	var id = $(this).attr('data-id');
    	// read product record based on given ID
    	$.getJSON(route+"/crm2.0/resources/users/salesman/read-one.php?id=" + id, function(data){
    		// start html
    		
    		var admin_salesman_show_html;

    		admin_salesman_show_html = "<main>";
    		admin_salesman_show_html += "<section class='well1'>";
    		admin_salesman_show_html += "<div class='container'>";
    		admin_salesman_show_html += "<h2>Szczegóły dotyczące przedstawiciela</h2>";
    		admin_salesman_show_html += "<a href='#' class='btn btn-primary btn-sm active read-salesmans' >POWRÓT  </a><br/>";
    		admin_salesman_show_html += "<table id='lista'>";
    		admin_salesman_show_html += "<tr>";
    		admin_salesman_show_html += "<td width='30%'><strong>Imie i nazwisko</strong></td>";
    		admin_salesman_show_html += "<td>"+ data.name + " " + data.surname+"</td>";
    		admin_salesman_show_html += "</tr><tr>";
    		admin_salesman_show_html += "<td><strong>Adres</strong></td>";
    		admin_salesman_show_html += "<td>"+ data.address +"</td>";
    		admin_salesman_show_html += "</tr>";
    		admin_salesman_show_html += "<tr>";
    		admin_salesman_show_html += "<td><strong>Email</strong></td>";
    		admin_salesman_show_html += "<td>"+ data.email +"</td>";
    		admin_salesman_show_html += "</tr>";
    		admin_salesman_show_html += "<tr>";
    		admin_salesman_show_html += "<td><strong>Miasto</strong></td>";
    		admin_salesman_show_html += "<td>"+ data.city +"</td>";
    		admin_salesman_show_html += "</tr></table>";
    		admin_salesman_show_html += "</div>";
    		admin_salesman_show_html += "</section>";
    		admin_salesman_show_html += "</main>";
    		

    		$("#page-content-main").html(admin_salesman_show_html);
    		changePageTitle("Szczegóły przedstawiciela - admin");

    	});
    	
    });
 
});


     