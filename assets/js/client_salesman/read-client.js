$(document).ready(function(){
	

	
	$(document).on('click', '#client', function(e){

		e.preventDefault();
		
      showClients();
  });
	

	$(document).on('click', '.read-clients', function(){

	      showClients();
	  });
 
});
 

//liste klientow wysywietla
function showClients(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	json_url = route+"/crm2.0/resources/users/client/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
        readClientsTemplate(data, "");
 

 
    });
}

//wyswietla liste klientow przedstawiciela
function showClientsSalesman(json_url, contentInfo=""){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	var salesman = "true"; 
		
	json_url = route+"/crm2.0/resources/users/client/read.php?salesman="+salesman;
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
        readClientsSalesmanTemplate(data, contentInfo);
 

 
    });
}




