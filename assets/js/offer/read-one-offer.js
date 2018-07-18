//widok pojedynczej oferty
$(document).ready(function(){
 
    // handle 'read one' button click
    $(document).on('click', '#read-one-offer-button', function(){

    	//ściezka
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	// get product id
    	var id = $(this).attr('data-id');
    	// read product record based on given ID
    	$.getJSON(route+"/crm2.0/resources/offer/read-one.php?id=" + id, function(data){
    		// start html
    		
    		var admin_offer_show_html;

    		admin_offer_show_html = "<main>";
    		admin_offer_show_html += "<section class='well1'>";
    		admin_offer_show_html += "<div class='container'>";
    		admin_offer_show_html += "<h2>Szczegóły dotyczące oferty</h2>";
    		admin_offer_show_html += "<a href='#' class='btn btn-primary btn-sm active show-offers' >POWRÓT  </a><br/>";
    		admin_offer_show_html += "<table id='lista'>";
    		admin_offer_show_html += "<tr>";
    		admin_offer_show_html += "<td width='30%'><strong>Nazwa oferty</strong></td>";
    		admin_offer_show_html += "<td>"+ data.name + "</td>";
    		admin_offer_show_html += "</tr><tr>";
    		admin_offer_show_html += "<td><strong>Data wprowadzenia</strong></td>";
    		admin_offer_show_html += "<td>"+ data.date_offer +"</td>";
    		admin_offer_show_html += "</tr>";
    		admin_offer_show_html += "<tr>";
    		admin_offer_show_html += "<td><strong>Data początkowa</strong></td>";
    		admin_offer_show_html += "<td>"+ data.start_date +"</td>";
    		admin_offer_show_html += "</tr>";
    		admin_offer_show_html += "<tr>";
    		admin_offer_show_html += "<td><strong>Data końcowa</strong></td>";
    		admin_offer_show_html += "<td>"+ data.end_date +"</td>";
    		admin_offer_show_html += "<tr>";
    		admin_offer_show_html += "<td><strong>Opis</strong></td>";
    		admin_offer_show_html += "<td>"+ data.description +"</td>";
    		admin_offer_show_html += "</tr>";
    		admin_offer_show_html += "<tr>";
    		admin_offer_show_html += "<td><strong>Obniżka w % (na każdy produkt w ofercie)</strong></td>";
    		admin_offer_show_html += "<td>"+ data.reduction +"</td>";
    		admin_offer_show_html += "</tr>";
    		admin_offer_show_html += "</tr></table>";
    		admin_offer_show_html += "</div>";
    		admin_offer_show_html += "</section>";
    		admin_offer_show_html += "</main>";
    		

    		$("#page-content-main").html(admin_offer_show_html);
    		changePageTitle("Szczególy oferty - admin");

    	});
    	
    });
 
});


     