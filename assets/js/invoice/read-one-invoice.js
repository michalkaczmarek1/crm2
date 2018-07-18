//wyswietla pojedyncza fakture
$(document).ready(function(){
 
    // handle 'read one' button click
    $(document).on('click', '#read-one-invoice-button', function(){

    	//ściezka
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	// get product id
    	var numberInvoice = $(this).attr('data-number');
    	// read product record based on given ID
    	$.getJSON(route+"/crm2.0/resources/invoice/read-one.php?number=" + numberInvoice, function(data){

            
    		var show_one_invoice_html;

    		show_one_invoice_html = "<main>";
    		show_one_invoice_html += "<section class='well1'>";
    		show_one_invoice_html += "<div class='container'>";
    		show_one_invoice_html += "<h2>Faktura nr "+data.nr_invoice+"</h2>";
    		show_one_invoice_html += "<a href='#' class='btn btn-primary btn-sm active show-invoices'>POWRÓT  </a><br/>";
    		show_one_invoice_html += "<table>";
    		show_one_invoice_html += "<tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Imie i nazwisko przedstawiciela</strong></td>";
    		show_one_invoice_html += "<td>"+ data.salesman_name + " " + data.salesman_surname+"</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Imie i nazwisko klienta</strong></td>";
    		show_one_invoice_html += "<td>"+ data.client_name + " " + data.client_surname+"</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Adres klienta</strong></td>";
    		show_one_invoice_html += "<td>"+ data.client_address + " " + data.client_city+"</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Email klienta</strong></td>";
    		show_one_invoice_html += "<td>"+ data.client_email + "</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<td><strong>Numer zamówienia</strong></td>";
    		show_one_invoice_html += "<td>"+ data.nr_order +"</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Data zamówienia</strong></td>";
    		show_one_invoice_html += "<td>"+ data.date_order +"</td>";
    		show_one_invoice_html += "</tr><tr>";
    		show_one_invoice_html += "<td width='30%'><strong>Treść zamówienia</strong></td>";
    		show_one_invoice_html += "<td>"+ data.content +"</td>";
    		show_one_invoice_html += "</tr>";
    		show_one_invoice_html += "<tr>";
    		show_one_invoice_html += "<td><strong>Wartośc netto</strong></td>";
    		show_one_invoice_html += "<td>"+ data.value_order_netto + " zł"+"</td>";
    		show_one_invoice_html += "</tr>";
    		show_one_invoice_html += "<tr>";
    		show_one_invoice_html += "<td><strong>Wartośc brutto</strong></td>";
    		show_one_invoice_html += "<td>"+ data.value_order_brutto + " zł (VAT 23%)"+"</td>";
    		show_one_invoice_html += "</tr></table>";
    		show_one_invoice_html += "</div>";
    		show_one_invoice_html += "</section>";
    		show_one_invoice_html += "</main>";
    		

    		$(".page-content-main").html(show_one_invoice_html);
    		 
    	});
    	
    });
 
});


     