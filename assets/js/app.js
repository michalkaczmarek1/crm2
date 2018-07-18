////obsluga przysku na stronie glownej Admin
$(document).ready(function(){

	
	
		$(document).on("click","#log-admin", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.get(route+"crm2.0/assets/actions/action-login.php", function(result){
				
				$("#page-content").html(result);
				changePageTitle("Logowanie - admin");
			});
		});
		
});

// info o bledach walidacji
function validInfo(contentInfo){
	
	$(".info-valid").html(contentInfo);
	
}

//pobranie danych przedstawiciela do formularza
function getDataSalesman(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/users/salesman/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_salesman_html;
        // html for listing products
    	
    	select_salesman_html ="<div class='form-group'>";
		 select_salesman_html +="<label for='salesmans' class='col-md-4'>";
		 select_salesman_html +="Wybierz&nbsp;przedstawiciela:";
		 select_salesman_html +="</label>";
		 select_salesman_html +="<div class='col-md-8'>";
		 select_salesman_html +="<select name='salesmans'class='form-control'>";
		 
        $.each(data.records, function (key, val){
        
        	
			 select_salesman_html +="<option value=" + val.id_salesman + ">" + val.name + " " + val.surname + "</option>";
			 var id_salesman = val.id_salesman;
        });
        
   	 select_salesman_html +="</select>";
	 select_salesman_html +="</div>";
	 select_salesman_html +="</div>";
	 
	 $(".select-salesman").html(select_salesman_html);
        

 
    });
}

//change page title
function changePageTitle(page_title){
 
    // change page title
    $('#page-title').text(page_title);
 
    // change title tag
    document.title=page_title;
}


