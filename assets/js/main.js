//skrypt grupujaca wiekoszosc obslugi przyciskow i funkcji
$(document).ready(function(){
	
		
		$(document).on("click",".dashboard-salesman", function(e){
				
			e.preventDefault();
			
			var info = "<div class='alert alert-info' id='info-sale'><h3>Witaj w panelu kokpit</h3></div>";
			var changeDataSalesman = "<a class='btn btn-primary' id='change-personal-salesman'>Zmień swoje dane</a>";
			var changePassword = "<a class='btn btn-primary' id='change-pass-salesman'>Zmień hasło</a>";
			var createClient = "<a class='btn btn-primary' id='create-client-salesman'>Dodaj klienta</a>";
			var addMeeting = "<a class='btn btn-primary' id='add-meeting' >Dodaj spotkanie</a>";
			var readMeetings = "<a class='btn btn-primary read-meetings' >Zobacz swoje spotkania</a>";
			var readInvoices = "<a class='btn btn-primary show-invoices' >Zobacz swoje faktury</a>";
			
			$(".page-content-main").html(info+changeDataSalesman+changePassword+createClient+addMeeting+readMeetings+readInvoices);
			
			changePageTitle("Kokpit - przedstawiciel");
		});	
	
		$(document).on("click",".sale", function(e){
			
				e.preventDefault();
				
				var info = "<div class='alert alert-info' id='info-sale' ><h3>Witaj w panelu sprzedaż</h3></div>"
				var addOrder = "<a class='btn btn-primary' id='add-order' title='Najpierw musisz wygenerować fakture' disabled>Dodaj zamówienie</a>";
				var addInvoice = "<a class='btn btn-primary' href='#' title='Najpierw nalezy wygenerowac fakture aby moc dodac zamowienie' id='add-invoice'>Generuj fakture</a>";
				var showInvoices = "<a class='btn btn-primary show-invoices' href='#' >Zobacz zrealizowane faktury</a>";
				$(".page-content-main").html(info+addInvoice+addOrder+showInvoices);
				
				changePageTitle("Sprzedaż - przedstawiciel");
			
		});
		
		$(document).on("click",".client", function(e){
			
			e.preventDefault();
			
			var info = "<div class='alert alert-info' id='info-client'><h3>Witaj w panelu klient</h3></div>"
			var addMetting = "<a class='btn btn-primary' id='add-meeting'>Dodaj spotkanie</a>";
			var showMettings = "<a class='btn btn-primary read-meetings'>Zobacz swoje spotkania</a>";
			var showSalesmans = "<a class='btn btn-primary show-client-salesman'>Zobacz swoich klientów</a>";
			var showMessage = "<a class='btn btn-primary show-message'>Zobacz swoje wiadomości</a>";
			$(".page-content-main").html(info+showSalesmans+showMessage+addMetting+showMettings);
			
			changePageTitle("Klient - przedstawiciel");
		});
		
	
		
		$(document).on("click",".marketing", function(e){
			
			e.preventDefault();
			
			var info = "<div class='alert alert-info' id='info-marketing'><h3>Witaj w panelu marketing</h3></div>";
			var addReportPreference = "<a class='btn btn-primary' id='add-report-preference'>Generuj raport preferencji</a>";
			$(".page-content-main").html(info+addReportPreference);
			
			changePageTitle("Marketing - przedstawiciel");
		});
		
		$(document).on("click",".dashboard-admin", function(e){
			
			e.preventDefault();
	
			var info = "<div class='alert alert-info info-admin'><h3>Witaj w panelu kokpit</h3></div>";
			var changePassword = "<a class='btn btn-primary' id='change-pass-admin'>Zmień hasło</a>";
			var addSalesman = "<a class='btn btn-primary' id='create-salesman'>Dodaj przedstawiciela</a>";
			var addClient = "<a class='btn btn-primary' id='create-client'>Dodaj klienta</a>";
			var addCar = "<a class='btn btn-primary' id='create-car'>Dodaj samochód</a>";
			var addOffer = "<a class='btn btn-primary' id='create-offer'>Dodaj ofertę</a>";
			var checkoutOrderDashboard = "<a class='btn btn-primary' id='checkout-order'>Realizuj zamówienia</a>";
			 	
			$("#page-content-main").html(info+changePassword+addSalesman+addClient+addCar+addOffer+checkoutOrderDashboard);
			
			changePageTitle("Kokpit - administrator");
			
		});	
		
		$(document).on("click",".marketing-admin", function(e){
			
			e.preventDefault();
			
			var info = "<div class='alert alert-info' id='info-marketing-admin'><h3>Witaj w panelu marketing</h3></div>"
			var getReportPreference = "<a class='btn btn-primary' id='get-report-preference'>Pobierz raporty preferencji</a>";
			var showOffers = "<a class='btn btn-primary show-offers'>Zobacz oferty</a>";
			$("#page-content-main").html(info+getReportPreference+showOffers);
			
			changePageTitle("Marketing - administrator");
		});
		
	
		$(document).on("click",".sale-admin", function(e){
			
			e.preventDefault();
			
			showInfoAdmin();
			
			
		
		});
	
		$(document).on("click","#sale-admin", function(e){
			
			e.preventDefault();
			
			showInfoAdmin();
		
		});
		
		$(document).on("click","#add-invoice", function(e){
			e.preventDefault();
			
			if(e.target){
				$('#add-order').removeAttr("disabled");
			}
		});
		
		//pokaz faktury zrealizowane
		$(document).on("click",".show-invoices", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.getJSON(route+"crm2.0/resources/invoice/read-invoices.php", function(data){
				
				
				readInvoicesTemplate(data)
				
				changePageTitle("Lista faktur - przedstawiciel");
				
			});
		});
		
		//pokaz oferty
		$(document).on("click",".show-offers", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.getJSON(route+"crm2.0/resources/offer/read.php", function(data){
				
				
				readOffersTemplate(data);
				
				changePageTitle("Lista ofert - administrator");
			});
		});
		
		//pokaz samochody
		$(document).on("click",".show-cars", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			$.getJSON(route+"crm2.0/resources/car/read.php", function(data){
				
			
					readCarsTemplate(data);
			
			
				
				changePageTitle("Lista samochodów - administrator");
				
			});
		});
		
		//pokaz klientów przedstawiciela
		$(document).on("click",".show-client-salesman", function(e){
			
			e.preventDefault();
			
			var route = "http://pp42877.wsbpoz.solidhost.pl/";
			
			var salesman = "true";
			
			$.getJSON(route+"crm2.0/resources/users/client/read.php?salesman="+salesman, function(data){
				
				if(data.message){
					$("#info-client").html(data.message);
				} else {
					readClientsSalesmanTemplate(data);
				}
				
				
				changePageTitle("Lista klientów - przedstawiciel");
				
			});
		});
		
		$(document).on("click",".dashboard-client", function(e){
			
			e.preventDefault();
			
			var info = "<div class='alert alert-info' id='info-sale'><h3>Witaj w panelu kokpit</h3></div>";
			var changeDataClient = "<a class='btn btn-primary' id='change-personal-client'>Zmień swoje dane</a>";
			var changePassword = "<a class='btn btn-primary' id='change-pass-client'>Zmień hasło</a>";
			var showComplaints= "<a class='btn btn-primary show-complaints'>Zobacz swoje reklamacje</a>";
			var getOrderCompl= "<a class='btn btn-primary orders-compl-client'>Pobierz zamówenia zrealizowane</a>";
			$(".page-content-main").html(info+changeDataClient+changePassword+showComplaints+getOrderCompl);
			
			changePageTitle("Kokpit - klient");
			
		});	
		
		//pokaz zamóienia klienta
		$(document).on("click",".orders-client", function(e){
			
			e.preventDefault();
			
			showOrdersClientPanel()
			
			changePageTitle("Lista zamówień - klient");
			
		});
		
		//pokaz zamóienia zrealizowane klienta
		$(document).on("click",".orders-compl-client", function(e){
			
			e.preventDefault();
			
			showOrdersComplClientPanel()
			
			changePageTitle("Lista zrealizowanych zamówień - klient");
		});
		
		//pokaz oferty dla klienta
		$(document).on("click",".offers-client", function(e){
			
			e.preventDefault();
			
			showOffersClient();
			
			changePageTitle("Lista ofert - klient");
			
		});
		

		
		
		//pokaz reklamacje klienta
		$(document).on("click",".show-complaints", function(e){
			
			e.preventDefault();
			
			showComplaintsClient()
			
			changePageTitle("Lista reklamacji - klient");
			
		});
		
	
		//pokaz wiadomosci przedstawiciela
		$(document).on("click",".show-message", function(e){
			
			e.preventDefault();
			
			showMessages()
			
			changePageTitle("Lista wiadomosci - przedstawiciel");
			
		});
		
		
});

function showInfo(contentInfo){
	
	
	
	
	var addOrder = "<a class='btn btn-primary' title='Wygeneruj najpierw fakture' id='add-order' disabled>Dodaj zamówienie</a>";
	var addInvoice = "<a class='btn btn-primary' href='#' title='Najpierw nalezy wygenerowac fakture aby moc dodac zamowienie' id='add-invoice'>Generuj fakture</a>";
	var backSale = "<a class='btn btn-primary active sale' href='#'>Powrót</a>";
	var infoOrder = "<div class='alert alert-info' id='info-sale'>" + contentInfo + "</div>";
		
	
	$(".page-content-main").html(infoOrder+addInvoice+addOrder+backSale);
	
	changePageTitle("Sprzedaż - przedstawiciel");
	

	
	
}

function showInfoClient(contentInfo){
	
	
	
	
	var info = "<div class='alert alert-primary' id='info-client'><h3>"+contentInfo+"</h3></div>"
	var addMetting = "<a class='btn btn-primary' id='add-meeting'>Dodaj spotkanie</a>";
	var showMettings = "<a class='btn btn-primary read-meetings' >Zobacz swoje spotkania</a>";
	var showSalesmans = "<a class='btn btn-primary show-client-salesman'>Zobacz swoich klientów</a>";
	var showMessage = "<a class='btn btn-primary show-message'>Zobacz swoje wiadomości</a>";
	$(".page-content-main").html(info+addMetting+showMettings+showSalesmans+showMessage);
	
	changePageTitle("Klient - przedstawiciel");

	
	
}

function showInfoMarketing(contentInfo){
	
	
	
	
	var info = "<div class='alert alert-info' id='info-marketing'><h3>"+contentInfo+"</h3></div>"
	var backMarketing = "<a class='btn btn-primary active marketing' href='#'>Powrót</a>";
	var addReportPreference = "<a class='btn btn-primary' id='add-report-preference'>Generuj raport preferencji</a>";
	$(".page-content-main").html(info+addReportPreference+backMarketing);
	
	changePageTitle("Marketing - przedstawiciel");

	
	
}

function showDashboard(contentInfo=""){
	
	if(contentInfo != ""){
		var info = "<div class='alert alert-info' id='info-sale'>"+contentInfo+"</div>";
	} else {
		var info = "<div class='alert alert-info' id='info-sale'><h3>Witaj w panelu kokpit</h3></div>";
	}
	var changeDataSalesman = "<a class='btn btn-primary' id='change-personal-salesman'>Zmień swoje dane</a>";
	var changePassword = "<a class='btn btn-primary' id='change-pass-salesman'>Zmień hasło</a>";
	var createClient = "<a class='btn btn-primary' id='create-client-salesman'>Dodaj klienta</a>";
	var addMeeting = "<a class='btn btn-primary' id='add-meeting' >Dodaj spotkanie</a>";
	var readMeetings = "<a class='btn btn-primary read-meetings' >Zobacz swoje spotkania</a>";
	var readInvoices = "<a class='btn btn-primary show-invoices' >Zobacz swoje faktury</a>";
	
	$(".page-content-main").html(info+changeDataSalesman+changePassword+createClient+addMeeting+readMeetings+readInvoices);
	
	changePageTitle("Kokpit - przedstawiciel");
}



function showDashboardClient(contentInfo=""){
	
	if(contentInfo != ""){
		var info = "<div class='alert alert-info' id='info-sale'>"+contentInfo+"</div>";
	} else {
		var info = "<div class='alert alert-info' id='info-sale'><h3>Witaj w panelu kokpit</h3></div>";
	}
	
	
	var changeDataClient = "<a class='btn btn-primary' id='change-personal-client'>Zmień swoje dane</a>";
	var changePassword = "<a class='btn btn-primary' id='change-pass-client'>Zmień hasło</a>";
	var showComplaints= "<a class='btn btn-primary show-complaints'>Zobacz swoje reklamacje</a>";
	var getOrderCompl= "<a class='btn btn-primary orders-compl-client'>Pobierz zamówenia zrealizowane</a>";
	$(".page-content-main").html(info+changeDataClient+changePassword+showComplaints+getOrderCompl);
	
	changePageTitle("Kokpit - klient");
	
}

function showDashboardAdmin(contentInfo){
	
	
	var info = "<div class='alert alert-info info-admin'><h3>Witaj w panelu kokpit</h3></div>";
	var changePassword = "<a class='btn btn-primary' id='change-pass-admin'>Zmień hasło</a>";
	var addSalesman = "<a class='btn btn-primary' id='create-salesman'>Dodaj przedstawiciela</a>";
	var addClient = "<a class='btn btn-primary' id='create-client'>Dodaj klienta</a>";
	var addCar = "<a class='btn btn-primary' id='create-car'>Dodaj samochód</a>";
	var addOffer = "<a class='btn btn-primary' id='create-offer'>Dodaj ofertę</a>";
	var checkoutOrderDashboard = "<a class='btn btn-primary' id='checkout-order'>Realizuj zamówienia</a>";
	 	
	$("#page-content-main").html(info+changePassword+addSalesman+addClient+addCar+addOffer+checkoutOrderDashboard);
	
	changePageTitle("Kokpit - administrator");
	
}

function showContactClient(contentInfo){
	
	
	
	var info = "<div class='alert alert-info' id='info-sale'><h3>" + contentInfo + "</h3></div>";
	var contact = "<div class='btn btn-primary contact-client'>Powrót</div>";
	
	$(".page-content-main").html(info+contact);
	
	changePageTitle("Kontakt - klient");
	 
}



function showInfoAdmin(contentInfo){
	
	
	if(contentInfo){
		var info = "<div class='alert alert-info' id='info-sale-admin'>"+contentInfo+"</div>";
	}
	var info = "<div class='alert alert-info' id='info-sale-admin'><h3>Witaj w panelu sprzedaż</h3></div>";
	var addReportSale = "<a class='btn btn-primary' href='#' id='add-report-sale'>Generuj raport sprzedaży</a>";
	
	var checkoutOrder = "<a class='btn btn-primary' href='#' id='checkout-order'>Realizuj zamówienia</a>";
	var showCars = "<a class='btn btn-primary show-cars' href='#' >Zobacz asortyment</a>";
	
	$("#page-content-main").html(info+addReportSale+checkoutOrder+showCars);
	
	changePageTitle("Sprzedaż - administrator");
	
}

function showInfoMarketingAdmin(contentInfo=""){
	
	var info = "<div class='alert alert-info' id='info-marketing-admin'>"+contentInfo+"</div>"
	var addReportPreference = "<a class='btn btn-primary' id='get-report-preference'>Pobierz raporty preferencji</a>";
	var showOffers = "<a class='btn btn-primary show-offers'>Zobacz oferty</a>";
	$("#page-content-main").html(info+addReportPreference+showOffers);
	
	changePageTitle("Marketing - administrator");

}

//lista ofert
function showOffers(json_url, contentInfo = ""){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/offer/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
        readOffersTemplate(data, contentInfo);
 

        changePageTitle("Lista ofert - administrator");
    });
}



//lista wiadomosci
function showMessages(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/message/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
    	readMessagesTemplate(data);
 
        // chage page title
//        changePageTitle("Read Products");
    	changePageTitle("Lista wiadomości - przedstawiciel");
    });
}

//lista ofert dla klienta
function showOffersClient(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/offer/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
    	readOffersClientTemplate(data);
 
        // chage page title
//        changePageTitle("Read Products");
    	changePageTitle("Lista ofert - klient");
    });
}

//lista samochodow
function showCars(json_url, contentInfo = ""){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/car/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
        // html for listing products
    	
        readCarsTemplate(data, contentInfo);
 
        // chage page title
//        changePageTitle("Read Products");
        changePageTitle("Lista samochodów - administrator");
    });
}

//lista zamowien zrealizowanych
function showOrdersClientPanel(){
	
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	var client = "true";
	
	$.getJSON(route+"crm2.0/resources/order/orders-list.php?client="+client, function(data){
		
		
		readOrdersClientTemplate(data)
		
		changePageTitle("Lista zamówień - klient");
		
	});

}

//lista zamowien zrealizowanych
function showOrdersComplClientPanel(json_url="", contentInfo=""){
	
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	
	var client = "true";
	
	$.getJSON(route+"crm2.0/resources/order/read-orders-completed.php?client="+client, function(data){
		
		
		readOrdersComplClientTemplate(data, contentInfo)
		
		changePageTitle("Lista zamówień zrealizowanych - klient");
		
	});

}

//lista reklamacji
function showComplaintsClient(){
	
	
	var route = "http://pp42877.wsbpoz.solidhost.pl/";

	$.getJSON(route+"crm2.0/resources/complaint/read.php", function(data){
		
		
			readComplaintsTemplate(data)
		
			changePageTitle("Lista reklamacji - klient");
		
	});

}




//pobranie ofert do formularza
function getDataOffer(json_url){
	var route = "http://pp42877.wsbpoz.solidhost.pl/";
	json_url = route+"/crm2.0/resources/offer/read.php";
    // get list of products from the API
    $.getJSON(json_url, function(data){
    	
    	var select_offer_html;
        // html for listing products
    	
    	select_offer_html ="<div class='form-group'>";
		 select_offer_html +="<label for='offer' class='col-md-4'>";
		 select_offer_html +="Wybierz&nbsp;oferte:";
		 select_offer_html +="</label>";
		 select_offer_html +="<div class='col-md-8'>";
		 select_offer_html +="<select name='offer'class='form-control'>";
		 
        $.each(data.records, function (key, val){
        
        	
			 select_offer_html +="<option value=" + val.id_offer + ">" + val.name +"</option>";
			 
        });
        
   	 select_offer_html +="</select>";
	 select_offer_html +="</div>";
	 select_offer_html +="</div>";
	 
	 $(".select-offer").html(select_offer_html);
        
    
    });
}

//change page title
function changePageTitle(page_title){
 
    // change page title
    $('#page-title').text(page_title);
 
    // change title tag
    document.title=page_title;
}