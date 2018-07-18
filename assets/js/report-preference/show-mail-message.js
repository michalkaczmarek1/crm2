//szablona maila
$(document).ready(function(){
 
    // handle 'read one' button click
    $(document).on('click', '#send-email-button', function(){

    	//ściezka
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	// get product id
    	var id_report = $(this).attr('data-id');
    	
    	// get product id
    	var mail = "send";
    	
    	
    	// read product record based on given ID
    	$.getJSON(route+"/crm2.0/resources/report-preference/message-mail.php?id-report=" + id_report, function(data){

          
    		var mail_message_html;


    		    
    		mail_message_html = "<main>";
    		mail_message_html += "<section class='well1'>";
    		mail_message_html += "<div class='container'>";
    		mail_message_html += "<h2>Dane zawarte w mailu</h2>";
    		mail_message_html += "<a href='#' class='btn btn-primary btn-sm active show-offers'>POWRÓT  </a><br/>";
    		mail_message_html += "<div class='table-responsive'>"
    		mail_message_html += "<table class='table table-bordered table-hover'>";
    		mail_message_html += "<tr>";
    		mail_message_html += "<td width='30%'><strong>Imie i nazwisko przedstawiciela</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.salesman_name + " " + data.data_mail.salesman_surname+"</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%'><strong>Adres mail przedstawiciela</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.salesman_mail + "</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%'><strong>Imie i nazwisko klienta</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.client_name + " " + data.data_mail.client_surname+"</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%'><strong>Adres mail klienta</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.client_mail + "</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%'><strong>Nazwa oferty</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.offer_name + "</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td><strong>Opis oferty</strong></td>";
    		mail_message_html += "<td colspan='5'>"+ data.data_mail.description +"</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%'><strong>Okres trwania oferty</strong></td>";
    		mail_message_html += "<td colspan='5'>" + "od " + data.data_mail.start_date + " do "+data.data_mail.end_date + "</td>";
    		mail_message_html += "</tr><tr>";
    		mail_message_html += "<td width='30%' colspan='6'><strong>Zawartość oferty</strong></td>";
    		
    		  $.each(data.data_mail_cars, function(key, val) {
    			  
    		        // creating new table row per record
    		    	
    			  mail_message_html+="<tr>";
    		    		 
    		    	mail_message_html+="<td>" + val.mark_car + "</td>";
    		    	mail_message_html+="<td>" + val.model_car + "</td>";
    		    	mail_message_html+="<td>" + val.truck_or_delivery + "</td>";
    		    	mail_message_html+="<td>" + val.price + " zł" + "</td>";
    		    	mail_message_html+="<td>" +  val.engine +" cm3"+"</td>";
    		    	mail_message_html+="<td>" + val.horsepower + " KM"+"</td>";
    		    	
    		    	mail_message_html += "</tr>";
    		    });
    		  
    		  
    		mail_message_html += "</tr></table>";
    		mail_message_html += "<a href='#' class='btn btn-primary' id='send-mail'>Wyslij mail</a><br/>";
    		mail_message_html += "</div>";
    		mail_message_html += "</div>";
    		mail_message_html += "</section>";
    		mail_message_html += "</main>";
    		

    		$("#page-content-main").html(mail_message_html);
    		 

    		
    		  
    		$(document).on("click","#send-mail", function(e){
    			
    			e.preventDefault();
    			//ściezka
    	    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	    	
    	    	// get product id
    	    	var mail = "send";
    	    	
    	    	// read product record based on given ID
    	    	$.getJSON(route+"/crm2.0/resources/report-preference/message-mail.php?id-report=" + id_report + "&mail=" + mail, function(data){
    	    		
    	    		if(!data.error_mess){
    	    			showInfoMarketingAdmin(data.successSend);
    	    		} else {
    	    			showInfoMarketingAdmin(data.error_mess);
    	    		}
    	    		
    	    		
    	    	});
    		});
    		
    		
    	});
    	
    });
 
});


     