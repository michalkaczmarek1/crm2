//usuwa klienta przedstawiciela
$(document).ready(function(){
 
    // will run if the delete button was clicked
    $(document).on('click', '#delete-salesman-client-button', function(){
    	// pobranie id klienta
    	
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	var client_id = $(this).attr('data-id');
    	
    	// bootbox for good looking 'confirm pop up'
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
    	    	        url: route+"crm2.0/resources/users/client/delete.php",
    	    	        type : "POST",
    	    	        dataType : 'json',
    	    	        data : JSON.stringify({ id: client_id }),
    	    	        success : function(result) {
    	    	 
    	    	            // przeładowanie listy klientów
    	    	        	showClientsSalesman(); 
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