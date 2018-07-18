//wyswietla liste spotkan
function readMeetingsTemplate(data){
 
    var meetings_salesman_html="";
 

    meetings_salesman_html = "<main>";
    meetings_salesman_html += "<section class='well1'>";
    meetings_salesman_html += "<div class='container'>";
    meetings_salesman_html += "<h2>Twoja lista spotkań</h2>";
    meetings_salesman_html += "<a href='#' class='btn btn-primary btn-sm active client'>POWRÓT  </a><br/>";
 
    // start table
    meetings_salesman_html+="<div class='table-responsive'>"
    meetings_salesman_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
    meetings_salesman_html+="<tr>";
    
    meetings_salesman_html+="<th class='w-25-pct'><strong>Data spotkania</strong></th>";
    meetings_salesman_html+="<th class='w-10-pct'><strong>Uwagi</strong></th>";
    meetings_salesman_html+="<th class='w-15-pct'><strong>Klient</strong></th>";
    meetings_salesman_html+="</tr>";
 
    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
    	
    	meetings_salesman_html+="<tr>";
    		 
    	meetings_salesman_html+="<td>" + val.date_meeting + "</td>";
    	meetings_salesman_html+="<td>" + val.comments + "</td>";
    	meetings_salesman_html+="<td>" + val.client_name + " " + val.client_surname + "</td>";
  
    	meetings_salesman_html+="</tr>";       
 
    });
 
    // end table
    meetings_salesman_html+="</table>";
    meetings_salesman_html += "</div>";
    meetings_salesman_html += "</div>";
    meetings_salesman_html += "</section>";
    meetings_salesman_html += "</main>";


    
    $(".page-content-main").html(meetings_salesman_html);
}


