//realizacja zamowienia, usuniecie z tabeli
$(document).ready(function(){
 
    // will run if the delete button was clicked
    $(document).on('click', '#checkout-salesman-button', function(){
    	// pobranie id przedstawiciela
    	
    	var route = "http://pp42877.wsbpoz.solidhost.pl/";
    	
    	var order_id = $(this).attr('data-id');
    	
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
    	    	        url: route+"crm2.0/resources/order/checkout.php",
    	    	        type : "POST",
    	    	        dataType : 'json',
    	    	        data : JSON.stringify({ id: order_id }),
    	    	        success : function(result) {
    	    	 
    	    	            // przeładowanie listy przedstawicieli
    	    	            showOrders("", result.id_salesman);
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

//wyswietlenie listy zamowien przedtawiciela
function showOrders(json_url, id){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"crm2.0/resources/order/orders-list.php?id="+id;
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
        readOrdersTemplate(data);
 
        // chage page title
//        changePageTitle("Read Products");
 
    });
}



