
//przekierowanie po wylogowaniu
$(document).ready(function(){
	
	var index_html;
	
	index_html = '<div id="page-content">';
	index_html += '<div id="logout"><b>Zostałeś poprawnie wylogowany</b></div>';
	index_html += '<a class="btn btn-primary" href="http://pp42877.wsbpoz.solidhost.pl/crm2.0/">Przejdź do strony głównej</a>';
	index_html += '</div>';
	
	
	$("#page-content").html(index_html);

});