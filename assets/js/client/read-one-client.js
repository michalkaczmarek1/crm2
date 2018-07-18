
//wyswietla szczegoly klienta
$(document).ready(function(){
 
    
    $(document).on('click', '#read-one-client-button', function(){

    	//ściezka
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	

    	var id = $(this).attr('data-id');
 
    	$.getJSON(route+"/crm2.0/resources/users/client/read-one.php?id=" + id, function(data){
    		// start html
    		
    		var admin_client_show_html;

    		admin_client_show_html = "<main>";
    		admin_client_show_html += "<section class='well1'>";
    		admin_client_show_html += "<div class='container'>";
    		admin_client_show_html += "<h2>Szczegóły dotyczące klienta</h2>";
    		admin_client_show_html += "<a href='#' class='btn btn-primary btn-sm active read-clients' >POWRÓT  </a><br/>";
    		admin_client_show_html += "<table>";
    		admin_client_show_html += "<tr>";
    		admin_client_show_html += "<td width='30%'><strong>Imie i nazwisko</strong></td>";
    		admin_client_show_html += "<td>"+ data.name + " " + data.surname+"</td>";
    		admin_client_show_html += "</tr><tr>";
    		admin_client_show_html += "<td><strong>Adres</strong></td>";
    		admin_client_show_html += "<td>"+ data.address +"</td>";
    		admin_client_show_html += "</tr>";
    		admin_client_show_html += "<tr>";
    		admin_client_show_html += "<td><strong>Email</strong></td>";
    		admin_client_show_html += "<td>"+ data.email +"</td>";
    		admin_client_show_html += "</tr>";
    		admin_client_show_html += "<tr>";
    		admin_client_show_html += "<td><strong>Miasto</strong></td>";
    		admin_client_show_html += "<td>"+ data.city +"</td>";
    		admin_client_show_html += "<tr>";
    		admin_client_show_html += "<td><strong>Status</strong></td>";
    		admin_client_show_html += "<td>"+ data.status +"</td>";
    		admin_client_show_html += "</tr>";
    		admin_client_show_html += "<tr>";
    		admin_client_show_html += "<td><strong>Przedstawiciel</strong></td>";
    		admin_client_show_html += "<td>"+ data.sal_name + " " + data.sal_surname + "</td>";
    		admin_client_show_html += "</tr></table>";
    		admin_client_show_html += "</div>";
    		admin_client_show_html += "</section>";
    		admin_client_show_html += "</main>";
    		

    		$("#page-content-main").html(admin_client_show_html);
    		changePageTitle("Szczególy klienta - admin");

    	});
    	
    });
 
});


     