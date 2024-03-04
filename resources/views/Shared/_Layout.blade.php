<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>IbCarsell</title>
    
    <!-- slider stylesheet -->
    <link rel="stylesheet" type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css" />

    <!-- bootstrap core css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/bootstrap.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css" />

    <!-- fonts style -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,700|Roboto:400,700&display=swap" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="{{ asset('/css/style.css') }}" rel="stylesheet" />
    <!-- responsive style -->
    <link href="views/css/responsive.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1.7.7/glider.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous"/>
    <link href="views/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
    <link href="views/css/formstyle.css" media="all" rel="stylesheet" type="text/css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="{{ asset('/css/js/fileinput.min.js') }}" type="text/javascript"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://www.google.com/recaptcha/api.js"></script>

    <script>
        function solonumeros(e){
            key=e.keyCode || e.which;

            teclado=String.fromCharCode(key);

            numeros="0123456789"

            especiales="8-37-38-46"

            teclado_especial=false;

            for(var i in especiales){
                if(key==especiales[i]){
                    teclado_especial=true;
                }
            }
            if(numeros.indexOf(teclado)==-1 && !teclado_especial){
                return false;
            }
        }
    </script>
   
<?php $tag = "Google tag (gtag.js)";?>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TDZXPGDRC0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TDZXPGDRC0');
</script>

</head>

<body>

    @include('Shared.partials.header')

    <div class="container-fluid" style="flex: 1;">
        <main role="main">
            {!! $renderBody !!}
        </main>
    </div>

    @include('Shared.partials.footer')
    
    <div class="preloader hidden">
    
    <div class="lds-roller">
    </div>
</body>
</html>