
//odczyt jednego auto
$(document).ready(function(){
 

    $(document).on('click', '#read-one-car-button', function(){

        //ściezka
        var route = "http://pp42877.wsbpoz.solidhost.pl/";
        

        var id = $(this).attr('data-id');

        $.getJSON(route+"/crm2.0/resources/car/read-one.php?id=" + id, function(data){
            // start html
            
            var admin_car_show_html;

            admin_car_show_html = "<main>";
            admin_car_show_html += "<section class='well1'>";
            admin_car_show_html += "<div class='container'>";
            admin_car_show_html += "<h2>Szczegóły dotyczące samochodu</h2>";
            admin_car_show_html += "<a href='#' class='btn btn-primary btn-sm active show-cars' >POWRÓT  </a><br/>";
            admin_car_show_html += "<table id='lista'>";
            admin_car_show_html += "<tr>";
            admin_car_show_html += "<td width='30%'><strong>Marka</strong></td>";
            admin_car_show_html += "<td>"+ data.mark + "</td>";
            admin_car_show_html += "</tr><tr>";
            admin_car_show_html += "<td><strong>Model</strong></td>";
            admin_car_show_html += "<td>"+ data.model +"</td>";
            admin_car_show_html += "</tr>";
            admin_car_show_html += "<tr>";
            admin_car_show_html += "<td><strong>Silnik (cm3)</strong></td>";
            admin_car_show_html += "<td>"+ data.engine +"</td>";
            admin_car_show_html += "</tr>";
            admin_car_show_html += "<tr>";
            admin_car_show_html += "<td><strong>Moc silnika (KM)</strong></td>";
            admin_car_show_html += "<td>"+ data.horsepower +"</td>";
            admin_car_show_html += "</tr>";
            admin_car_show_html += "<tr>";
            admin_car_show_html += "<td><strong>Cena</strong></td>";
            admin_car_show_html += "<td>"+ data.price +"</td>";
            admin_car_show_html += "</tr>";
            admin_car_show_html += "<tr>";
            admin_car_show_html += "<td><strong>Samochód cięzarowy czy dostawczy</strong></td>";
            admin_car_show_html += "<td>"+ data.truck_or_delivery +"</td>";
            admin_car_show_html += "</tr></table>";
            admin_car_show_html += "</div>";
            admin_car_show_html += "</section>";
            admin_car_show_html += "</main>";
            

            $("#page-content-main").html(admin_car_show_html);
            changePageTitle("Szczegóły samochodu - admin");

        });
        
    });
 
});


     