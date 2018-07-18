//wyswietla szczegoly klienta
$(document).ready(function(){
 
    // handle 'read one' button click
    $(document).on('click', '#read-one-salesman-client-button', function(){

        //ściezka
        var route = "http://pp42877.wsbpoz.solidhost.pl/";
        
        // get product id
        var id = $(this).attr('data-id');
        // read product record based on given ID
        $.getJSON(route+"/crm2.0/resources/users/client/read-one.php?id=" + id, function(data){
            // start html
            
            var salesman_client_show_html;

            salesman_client_show_html = "<main>";
            salesman_client_show_html += "<section class='well1'>";
            salesman_client_show_html += "<div class='container'>";
            salesman_client_show_html += "<h2>Szczegóły dotyczące klienta</h2>";
            salesman_client_show_html += "<a href='#' class='btn btn-primary btn-sm active show-client-salesman' >POWRÓT  </a><br/>";
            salesman_client_show_html += "<table>";
            salesman_client_show_html += "<tr>";
            salesman_client_show_html += "<td width='30%'><strong>Imie i nazwisko</strong></td>";
            salesman_client_show_html += "<td>"+ data.name + " " + data.surname+"</td>";
            salesman_client_show_html += "</tr><tr>";
            salesman_client_show_html += "<td><strong>Adres</strong></td>";
            salesman_client_show_html += "<td>"+ data.address +"</td>";
            salesman_client_show_html += "</tr>";
            salesman_client_show_html += "<tr>";
            salesman_client_show_html += "<td><strong>Email</strong></td>";
            salesman_client_show_html += "<td>"+ data.email +"</td>";
            salesman_client_show_html += "</tr>";
            salesman_client_show_html += "<tr>";
            salesman_client_show_html += "<td><strong>Miasto</strong></td>";
            salesman_client_show_html += "<td>"+ data.city +"</td>";
            salesman_client_show_html += "<tr>";
            salesman_client_show_html += "<td><strong>Status</strong></td>";
            salesman_client_show_html += "<td>"+ data.status +"</td>";
            salesman_client_show_html += "</tr>";
            salesman_client_show_html += "<tr>";
            salesman_client_show_html += "<td><strong>Przedstawiciel</strong></td>";
            salesman_client_show_html += "<td>"+ data.sal_name + " " + data.sal_surname + "</td>";
            salesman_client_show_html += "</tr></table>";
            salesman_client_show_html += "</div>";
            salesman_client_show_html += "</section>";
            salesman_client_show_html += "</main>";
            

            $(".page-content-main").html(salesman_client_show_html);

        });
        
    });
 
});


     