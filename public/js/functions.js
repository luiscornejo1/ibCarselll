//Genera las previsualizaciones
function createPreview(file) {
    var imgCodified = URL.createObjectURL(file)
    var img = $(
        '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12" style="width: 300px"><div class="image-container"> <figure> <img src="' +
            imgCodified +
            '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>'
    )
    $(img).insertBefore('#add-photo-container')
}

export const sweetAlert = (message, redirect) => {
    Swal.fire(`${message}`, '', 'success').then(function () {
        window.location.href = `${redirect}`
    })
}
