// wyswietla liste reklamacji
function readComplaintsTemplate(data){
 
    var complaint_client_html="";
 
    complaint_client_html = "<main>";
    complaint_client_html += "<section class='well1'>";
    complaint_client_html += "<div class='container'>";
    complaint_client_html += "<h2>Lista reklamacji</h2>";
    complaint_client_html += "<a href='' class='btn btn-primary btn-sm active orders-client' >Wróc do zamówień</a><br/>";
 
    // start table
    complaint_client_html += "<div class='table-responsive'>"
    complaint_client_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    complaint_client_html+="<tr>";
    complaint_client_html+="<th class='w-25-pct'><strong>Nr reklamacji</strong></th>";
    complaint_client_html+="<th class='w-25-pct'><strong>Treść</strong></th>";
    complaint_client_html+="<th class='w-10-pct'><strong>Nr zamówienia</strong></th>";

    complaint_client_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	complaint_client_html+="<tr>";
    		 
    	complaint_client_html+="<td>" + val.nr_complaint + "</td>";
    	complaint_client_html+="<td>" + val.content + "</td>";
    	complaint_client_html+="<td>" + val.nr_order + "</td>";

    
  
 
    	complaint_client_html+="</tr>";       
 
    });
 
    // end table
    complaint_client_html+="</table>";
    complaint_client_html += "</div>";
    complaint_client_html += "</div>";
    complaint_client_html += "</section>";
    complaint_client_html += "</main>";


    $(".page-content-main").html(complaint_client_html);
}


