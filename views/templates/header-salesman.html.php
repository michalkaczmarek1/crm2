
     <header id="menu" class="navbar-fixed-top">
      <div class="container">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <nav class="navbar navbar-inverse" role="navigation">
                  <div class="container-fluid">
                      <div class="navbar-header">
                          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#my-menu">
                              <span class="sr-only"></span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                          </button>
                          <div id="logo">
                              <a href="index.php" class="navbar-brand">CRM 2.0 <p>System zarządzania klientami</p></a>
                          </div>
                      </div>
                      <div class="collapse navbar-collapse" id="my-menu">
                          <ul class="nav navbar-nav navbar-right">
                              <li><a href="#" class="dashboard-salesman">Kokpit</a></li>
                              <li><a href="#" class="client">Klient</a></li>
                              <li><a href="#" class="sale">Sprzedaż</a></li>
                              <li><a href="#" class="marketing" >Marketing</a></li>
                          	  <li id="login"><a href="">Wyloguj</a></li>
                          </ul>
                      </div>
                  </div>
              </nav>
          </div>
      </div>
  </header>
<script>

//klasa active
    $(document).ready(function($) {
    	
    	$(".nav a").on("click", function(){
    		   $(".nav").find(".active").removeClass("active");
    		   $(this).parent().addClass("active");
    	});
    	
	});

</script>



	
	

