//lista raportow preferenci
function readReportsPreferencesTemplate(data){
 
    var report_preference_salesman_html="";

 

    report_preference_salesman_html = "<main>";
    report_preference_salesman_html += "<section class='well1'>";
    report_preference_salesman_html += "<div class='container'>";
    report_preference_salesman_html += "<h2>Lista raportów preferencji przedstawiciela</h2>";
    report_preference_salesman_html += "<a href='#' class='btn btn-primary btn-sm active marketing-admin'>POWRÓT  </a><br/>";
 
    // start table
    report_preference_salesman_html+="<div class='table-responsive'>"
    report_preference_salesman_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    report_preference_salesman_html+="<tr>";
    report_preference_salesman_html+="<th class='w-25-pct'><strong>Nazwa raportu</strong></th>";
    report_preference_salesman_html+="<th class='w-25-pct'><strong>Uwagi</strong></th>";
    report_preference_salesman_html+="<th class='w-10-pct'><strong>Data raportu</strong></th>";
    report_preference_salesman_html+="<th class='w-15-pct'><strong>Nazwa oferty</strong></th>";
    report_preference_salesman_html+="<th class='w-15-pct'><strong>Klient</strong></th>";
    report_preference_salesman_html+="<th class='w-25-pct text-align-center'><strong>Akcja</strong></th>";
    report_preference_salesman_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	report_preference_salesman_html+="<tr>";
    		 
    	report_preference_salesman_html+="<td>" + val.name_report + "</td>";
    	report_preference_salesman_html+="<td>" + val.comments + "</td>";
    	report_preference_salesman_html+="<td>" + val.date_report + "</td>";
    	report_preference_salesman_html+="<td>" + val.offer_name + "</td>";
    	report_preference_salesman_html+="<td>" + val.client_name + " " + val.client_surname + "</td>";
    
  
             // przycisk akcji
    	report_preference_salesman_html+="<td>";
  
           	// przycisk realizuj
    	report_preference_salesman_html+="<button class='m-r-10px btn-info btn-xs' id='send-email-button' data-id='"+val.id_report_preference+"'>";
    	report_preference_salesman_html+="Wyślij maila do klienta";
    	report_preference_salesman_html+="</button>";
    
    	report_preference_salesman_html+="</td>";
  
    	report_preference_salesman_html+="</tr>";       
 
    });
 
    // end table
    report_preference_salesman_html+="</table>";
    report_preference_salesman_html += "</div>";
    report_preference_salesman_html += "</div>";
    report_preference_salesman_html += "</section>";
    report_preference_salesman_html += "</main>";

    

    
    $("#page-content-main").html(report_preference_salesman_html);
}

