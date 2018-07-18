//wyswietla liste spotkan

$(document).ready(function(){
	

	
	$(document).on('click', '.read-meetings', function(){

		showMeetings();
	  });
 
});
 

function showMeetings(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/meeting/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
    	readMeetingsTemplate(data);
 
 
    });
}


