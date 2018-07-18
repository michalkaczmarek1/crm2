
//skrypt usuwajacy auto
$(document).ready(function(){
 

    $(document).on('click', '#delete-car-button', function(){

    	
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	var id_car = $(this).attr('data-id');
    	

    	bootbox.confirm({
    	 
    	    message: "<h4>Czy jesteś pewien?</h4>",
    	    buttons: {
    	        confirm: {
    	            label: 'Tak',
    	            className: 'btn-danger'
   	        },
    	        cancel: {
    	            label: 'Nie',
    	            className: 'btn-primary'
    	        }
    	    },
    	    callback: function (result) {
    	    	if(result==true){
    	    		 
    	    	    // wysłanie zapytanie do serwera o usuniecie
    	    	    $.ajax({
    	    	        url: route+"crm2.0/resources/car/delete.php",
    	    	        type : "POST",
    	    	        dataType : 'json',
    	    	        data : JSON.stringify({ id: id_car }),
    	    	        success : function(result) {
    	    	 
    	    	            // przeładowanie listy samochodow
    	    	            showCars("", result.message);
    	    	        },
    	    	        error: function(xhr, resp, text) {
    	    	            console.log(xhr, resp, text);
    	    	        }
    	    	    });
    	    	 
    	    	}
    	    }
    	});
    });
});