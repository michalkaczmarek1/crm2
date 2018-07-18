//odczyt przedstawicieli
$(document).ready(function(){
	
	

	
	$(document).on('click', '#salesman', function(e){

		e.preventDefault();
		
      showSalesmans();
      
      changePageTitle("Przedstawiciel - admin");
  });
	
	$(document).on('click', '.read-salesmans', function(){

	      showSalesmans();
	  });
 
});

 
// lista przedstawicieli
function showSalesmans(json_url, contentInfo = ""){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/salesman/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
        readSalesmansTemplate(data, contentInfo);
 

 
    });
}


