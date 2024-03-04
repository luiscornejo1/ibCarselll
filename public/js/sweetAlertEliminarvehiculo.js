Swal.fire(
    'Vehiculo eliminado',
      '',
      'success'
    )  .then(function() {
        window.location.href = "../views/modulos/system/iniciousuario.php";
    });