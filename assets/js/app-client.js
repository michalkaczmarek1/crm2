//obsluga przysku na stronie glownej Klient
$(document).ready(function(){
	
		$(document).on("click","#log-client", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.get(route+"crm2.0/assets/actions/action-login-client.php", function(result){
				
				$("#page-content").html(result);
				changePageTitle("Logowanie - klient");
			});
		});
		
});
		
