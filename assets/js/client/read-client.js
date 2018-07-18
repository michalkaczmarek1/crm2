
// wyswietla liste klientow dla admina
$(document).ready(function(){
	
		
	$(document).on('click', '#client', function(e){
   
		e.preventDefault();
		
      showClients();
      
      changePageTitle("Klient - admin");
  });
	

	$(document).on('click', '.read-clients', function(){
	      showClients();
	  });
 
});
 
 
//pobiera klientow
function showClients(json_url, contentInfo = ""){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/client/read.php";

    $.getJSON(json_url, function(data){
    	

        readClientsTemplate(data, contentInfo);
 

 
    });
}




