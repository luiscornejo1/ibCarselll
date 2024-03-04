
/*El caso que estemos en la pagina de detalles*/
if($("#main_detallesAuto").length>0){

	/* procuramos que la página haya cargado en su totalidad incluido los llamados php*/
	window.addEventListener('load', function(){

		const image_profile = this.document.querySelector("#image__profile"),
		carousel_element = this.document.querySelectorAll(".carousel__element");
		/* Se pregunta si hay imagenes cargadas, verficando si hay imagenes en el carousel*/
		if(carousel_element.length==0){
			/*Solo se imprime la imagen de no existe foto*/
			// image_profile.style.backgroundImage = "url('views/images/imagenes_vehiculos/nofoto.jpg')";
			image_profile.innerHTML = `<img width='100%' height='100%' src='views/images/imagenes_vehiculos/nofoto.jpg'>`
		}else{
			/* Se crea el carousel*/
			new Glider(document.querySelector('.carousel__list'), {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: {
					prev: '.carousel__prev',
					next: '.carousel__next'
				},
				responsive: [
					{
					// screens greater than >= 775px
					breakpoint: 550,
					settings: {
						// Set to `auto` and provide item width to adjust to viewport
						slidesToShow: 2,
						slidesToScroll: 1
					}
					},{
					// screens greater than >= 1024px
					breakpoint: 775,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2
					}
					}
				]
			});
			
			
			const image_list = this.document.querySelectorAll(".element__image");
			// image_profile.style.backgroundImage = "url('"+image_list[0].src+"')";
			image_profile.innerHTML = `<img width='100%' height='100%' src=${image_list[0].src}>`
			
			image_list.forEach(image => {
				image.addEventListener("click",()=>{
					// image_profile.style.backgroundImage = "url('"+image.src+"')" 

					if(image.dataset.type === 'image') {
						image_profile.innerHTML = `<img width='100%' height='100%' src=${image.src}>`
					}
					else if(image.dataset.type === 'video'){
						const id = image.dataset.id
						const filename = image.dataset.filename
						image_profile.innerHTML = `<video width='100%' height='100%' controls autoplay loop><source src=views/videos/videos_vehiculos/${id}/${filename}></video>`
					}

					
					

				})
			})
		}
	});
};

const benefict_list = this.document.querySelectorAll(".section__options");
benefict_list.forEach( benefict =>{
	benefict.addEventListener("click",()=>{
		let template = '';
		let benefict_select = benefict.querySelector("span");
		
		benefict_list.forEach(div=>{
			if(div.classList.contains("active")){
				div.classList.remove("active");
			}
		})
		benefict.classList.add("active");
		switch(benefict_select.innerText){
			case "Elige el auto ideal":
				template += `
					<h2 class="beneficts__tittle" >Elige tu auto ideal</h2>
					<div class="beneficts__parrafo">
				  		<p>Pensando en ti, hemos recopilado los mejores autos seminuevos
					 	del mercado. Filtra por marca, modelo, precio, año y conoce el 
					 	portafolio de autos seleccionados.
						</p>
					</div>
				`;
				break;
			case "Asesoría personalizada":
				template += `
					<h2 class="beneficts__tittle" >Asesoría personalizada</h2>
					<div class="beneficts__parrafo">
				  		<p>Sabemos que no todos son expertos en autos. Por eso, en IBCARSELL 
						te asesoraremos para que puedas conseguir tu próximo auto seminuevo 
						de una manera fácil, rápida y transparente.
						</p>
					</div>
				`;
				break;
			case "Rapidez en el proceso":
				template += `
					<h2 class="beneficts__tittle" >Rapidez en el proceso</h2>
					<div class="beneficts__parrafo">
						<p>En IBCARSELL creemos que comprar un auto no tiene por qué ser una 
						tarea tediosa o complicada. Confía en nosotros y descubre la mejor forma 
						de comprar o vender un auto.
						</p>
					</div>
				`;
				break;
			case "Financiamiento vehicular":
				template += `
					<h2 class="beneficts__tittle" >Financiamiento vehicular</h2>
					<div class="beneficts__parrafo">
						<p>Si tu idea es comprar un auto, estás en el lugar correcto. Trabajamos 
						con las principales entidades financieras del mercado para poder brindarte 
						las mejores opciones que calcen contigo.
						</p>
					</div>
				`;	
				break;
		}
		$("#content-beneficts").html(template)
	})
		
})

if($("#vehiculos_lista").length>0){
window.addEventListener("load",()=>{
	var ancho = screen.width,
		default_limit = 6,
		funcion = "vista_inicio";
    if (ancho >= 1200){
        default_limit = 9;
        
    }else if(ancho >= 768 && ancho < 1200){
       
        default_limit = 6;
    }
	else if(ancho < 768){
       
        default_limit = 4;
    }
	const currency = function(number){
		return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
	};
	$.ajax({
		url: 'model/vehiculoList.php',
		type: 'POST',
		data: {
			default_limit : default_limit,
			funcion : funcion
		},
		success: function(response){
			let tasks = JSON.parse(response);
			let template = '';
			
			tasks.forEach(task => {
				template += `
				<div class="containerauto col-lg-4 col-md-6 col-12">
					<div class="card shadow-sm">
						
						<a href="detalles-auto-${task.id}?id=${task.id}" style="text-decoration:none;border:none;padding:0;margin:0" ><div class="imageninicio" style="background-image: url(${"views/images/imagenes_vehiculos/"+task.id+"/principal.jpg"}),
						url(${"views/images/imagenes_vehiculos/nofoto.jpg"})">
						</div></a>

						<div class="card-body">
							<div class="align-items-center d-flex col-12">
							<div class="col-8"><h5>${task.marca+" "+task.modelo+" "+task.fecha_fabricacion}</h5></div>
							<div class="align-items-center col-4"><p class="">${currency(task.precio)}</p></div>
							</div>
							<div class="d-flex col-12 justify-content-between">
							<div class="text-center col-4">
								<img class="col iconvista" src="views/images/velocimetro.png" alt="">
								<div class="col"><span class="card__span">${task.kilometraje+" km"}</span></div>
							</div>
							<div class="text-center col-4">
								<img class="col iconvista" src="views/images/bomba-de-gasolina.png" alt="">
								<div class="col"><span class="card__span">${task.combustible}</span></div>
							</div>
							<div class="text-center col-4">
								<img class="col-12 iconvista" src="views/images/caja-de-cambios.png" alt="">
								<div class="col"><span class="card__span">${task.transmision}</span></div>
							</div>
							</div>
						</div>
					</div>
				</div>
				`;
			})
			$('#vehiculos_lista').html(template);
		}
	}).then(()=>{
		const breakpoints =[window.matchMedia("(min-width: 1200px)"),window.matchMedia("(min-width: 768px)")];
		const containerautos = document.querySelectorAll(".containerauto");
		breakpoints.forEach(breakpoint => {breakpoint.addListener(e=>{
			var ancho = screen.width;
			if (ancho >= 1200){
				containerautos.forEach(auto =>{
					if(auto.classList.contains("d-none")){
						auto.classList.remove("d-none");
					}
				})
			}else if(ancho >= 768 && ancho < 1200){
				if(containerautos.length>6){
					for(x = 1; x < 6;x++){
						if(containerautos[x].classList.contains("d-none")){
							containerautos[x].classList.remove("d-none");
						}
					}
					for(x = 6; x < containerautos.length;x++){
						containerautos[x].classList.add("d-none");
					}
				}
			}
			else if(ancho < 768){
				if(containerautos.length>4){
					for(x = 4; x < containerautos.length;x++){
						containerautos[x].classList.add("d-none");
					}
				}
			}
			
		})})
	})
})


};


const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
	}
}

if($("#FormContacto").length>0){

	const inputs = document.querySelectorAll('#FormContacto .formulario__grupo-input');

	const expresiones = {
		nombres: /^[a-zA-Z]{1}[a-zA-Z\s]{3,36}$/, // Letras mayusculas, minusculas y espacios; no se puede iniciar con espacios
		telefono: /^[1-9]{1}\d{8}$/,// 9 digitos y no empiece por cero.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,// Validación simple de correo
		comentario: /^[a-zA-Z0-9,áéíóúÁÉÍÓÚñÑ\s]{100,500}$/ // comentarios que solo contengan letras, numeros y espacios
	}

	const validarFormulario = (e) => {
		switch (e.target.name) {
			case "nombres":
				validarCampo(expresiones.nombres, e.target, 'nombres');
			break;
			case "correo":
				validarCampo(expresiones.correo, e.target, 'correo');
			break;
			case "telefono":
				validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
			case "comentario":
				validarCampo(expresiones.comentario, e.target, 'comentario');
			break;
		}
	}

	inputs.forEach((input) => {
		input.addEventListener('keyup', validarFormulario);
		input.addEventListener('blur', validarFormulario);
	});


}


if($("#FormVenta").length>0){

	const inputs = document.querySelectorAll('#FormVenta .formulario__grupo-input');

	const expresiones = {
		nombres: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1}[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,36}$/, // Letras mayusculas, minusculas y espacios; no se puede iniciar con espacios
		apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1}[a-zA-ZáéíóúÁÉÍÓÚñÑ	\s]{2,36}$/, // Letras mayusculas, minusculas y espacios; no se puede iniciar con espacios
		telefono: /^[9]{1}\d{8}$/,// 9 digitos y no empiece por cero.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,// Validación simple de correo
		marca: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1}[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,36}$/, // Letras mayusculas, minusculas y espacios; no se puede iniciar con espacios,
		modelo: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{1}[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\-\s]{1,36}$/, // Letras mayusculas, minusculas y espacios; no se puede iniciar con espacios,
		kilometr: /^[1-5]{1}\d{0,5}$/,// máximo de 6 digitos y no empiece por cero.
		anio: /^[20]{2}\d{2}$/,// 9 digitos y no empiece por cero.
		placa: /^[A-Z0-9]{3}[\-]{1}[A-Z0-9]{3}$/, // Letras, numeros, guion y guion_bajo
		mensaje: /^[a-zA-Z0-9,áéíóúÁÉÍÓÚñÑ\s\:]{100,500}$/, // comentarios que solo contengan letras, numeros y espacios
		
	}

	const validarFormulario = (e) => {
		switch (e.target.name) {
			case "nombres":
				validarCampo(expresiones.nombres, e.target, 'nombres');
			break;
			case "apellidos":
				validarCampo(expresiones.apellidos, e.target, 'apellidos');
			break;
			case "correo":
				validarCampo(expresiones.correo, e.target, 'correo');
			break;
			case "telefono":
				validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
			case "marca":
				validarCampo(expresiones.marca, e.target, 'marca');
			break;
			case "modelo":
				validarCampo(expresiones.modelo, e.target, 'modelo');
			break;
			case "kilometr":
				validarCampo(expresiones.kilometr, e.target, 'kilometr');
			break;
			case "ano":
				validarCampo(expresiones.anio, e.target, 'anio');
			break;
			case "placa":
				validarCampo(expresiones.placa, e.target, 'placa');
			break;
			case "mensaje":
				validarCampo(expresiones.mensaje, e.target, 'mensaje');
			break;
		}
	}

	inputs.forEach((input) => {
		input.addEventListener('keyup', validarFormulario);
		input.addEventListener('blur', validarFormulario);
	});
	
}