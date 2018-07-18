// wyswietla liste wiadomosci
function readMessagesTemplate(data){
 
    var message_client_html="";
 

    message_client_html = "<main>";
    message_client_html += "<section class='well1'>";
    message_client_html += "<div class='container'>";
    message_client_html += "<h2>Lista wiadomości</h2>";
    message_client_html += "<a href='' class='btn btn-primary btn-sm active client' >Powrót</a><br/>";
 
    // start table
    message_client_html += "<div class='table-responsive'>"
    message_client_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    message_client_html+="<tr>";
    message_client_html+="<th class='w-25-pct'><strong>Nr wiadomości</strong></th>";
    message_client_html+="<th class='w-10-pct'><strong>Data</strong></th>";
    message_client_html+="<th class='w-25-pct'><strong>Treść</strong></th>";
    message_client_html+="<th class='w-10-pct'><strong>Klient</strong></th>";

    message_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 

   
    	
        // creating new table row per record
        
        message_client_html+="<tr>";
             
        message_client_html+="<td>" + val.id_message + "</td>";
        message_client_html+="<td>" + val.date_message + "</td>";
        message_client_html+="<td>" + val.content + "</td>";
        if(val.client_name && val.client_surname){
        	message_client_html+="<td>" + val.client_name + " "  + val.client_surname + "</td>";
        } else {
        	message_client_html+="<td>Wiadomosc od niestałego klienta</td>";
        }
        
        
        message_client_html+="</tr>";       
 
    });
 
    // end table
    message_client_html+="</table>";
    message_client_html += "</div>";
    message_client_html += "</div>";
    message_client_html += "</section>";
    message_client_html += "</main>";

    

    $(".page-content-main").html(message_client_html);
}


