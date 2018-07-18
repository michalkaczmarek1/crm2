//obsluga przysku na stronie glownej Przedstawiciel
$(document).ready(function(){
	
		$(document).on("click","#log-salesman", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.get(route+"crm2.0/assets/actions/action-login-salesman.php", function(result){
				
				$("#page-content").html(result);
				changePageTitle("Logowanie - przedstawiciel");
			});
		});
		
});
		
