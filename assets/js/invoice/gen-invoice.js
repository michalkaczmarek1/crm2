
//generuje fakture
$(document).ready(function(){

	
	
		$(document).on("click","#add-invoice", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.getJSON(route+"crm2.0/resources/invoice/gen-invoice.php", function(result){
				
				var successInfo = result.success
				if(result.success)
					$("#info-sale").html(successInfo);
				else if (result.fail) {
					$("#info-sale").html(result.fail);
				}
				
				
				
			});
		});
		
});
		
