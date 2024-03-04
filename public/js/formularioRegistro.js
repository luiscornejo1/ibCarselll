const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario .formulario__grupo-input');

const expresiones = {
	placa: /^[A-Z0-9]{3}[\-]{1}[A-Z0-9]{3}$/, // Letras, numeros, guion y guion_bajo
	fecha: /^\d{4}$/,// 4 digitos.
	cantidad: /^\d{1,2}$/,// 1 a 2 digitos.
	cilindrada: /^\d{1,8}$/,// 1 a 8 digitos.
	precio: /^\-?[1-10]\d*\d+.?(\d{1,2})?$/,// 1 a 2 decimales.
	kilometraje: /^\d{1,6}$/, // 1 a 6 digitos.
	comentario: /^[a-zA-Z0-9]{0,250}$/

}

const campos = {
	placa: false,
	fecha_fabricacion: false, 
	fecha_modelo: false,
	cilindrada: false,
	cilindros: false,
	puertas: false,
	precio:false,
	kilometraje: false,
	comentario: true,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "placa":
			validarCampo(expresiones.placa, e.target, 'placa');
		break;
		case "fecha_fabricacion":
			validarCampo(expresiones.fecha, e.target, 'fecha_fabricacion');
		break;
		case "fecha_modelo":
			validarCampo(expresiones.fecha, e.target, 'fecha_modelo');
		break;
		case "cilindrada":
			validarCampo(expresiones.cilindrada, e.target, 'cilindrada');
		break;
		case "cilindros":
			validarCampo(expresiones.cantidad, e.target, 'cilindros');
		break;
		case "puertas":
			validarCampo(expresiones.cantidad, e.target, 'puertas');
		break;
		case "precio":
			validarCampo(expresiones.precio, e.target, 'precio');
		break;
		case "kilometraje":
			validarCampo(expresiones.kilometraje, e.target, 'kilometraje');
		break;
		case "comentario":
			validarCampo(expresiones.comentario, e.target, 'comentario');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	if(campos.placa && campos.fecha_fabricacion && campos.fecha_modelo && campos.cilindros && campos.puertas && campos.cilindrada && campos.precio && campos.kilometraje && campos.comentario){
		subirRegistro();		
	} else {	
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

function subirRegistro(){
    /*Datos de los inputs y selects en variables*/
	 const placa = document.getElementById("placa").value,
	 comentario = document.getElementById("comentario").value,
	 id_marca = document.getElementById("marca").value,
	 id_modelo = document.getElementById("modelo").value,
	 cilindros = document.getElementById("cilindros").value,
	 cilindrada = document.getElementById("cilindrada").value,
	 puertas = document.getElementById("puertas").value,
	 preciovista = document.getElementById("preciovista").value,
	 kilometrajevista = document.getElementById("kilometrajevista").value,
	 fecha_fabricacion = document.getElementById("fecha_fabricacion").value,
	 fecha_modelo = document.getElementById("fecha_modelo").value,
	 id_carroceria = document.getElementById("id_carroceria").value,
	 id_transmision = document.getElementById("id_transmision").value,
	 id_combustible = document.getElementById("id_combustible").value,
	 id_traccion = document.getElementById("id_traccion").value,
	 id_ubicacion = document.getElementById("id_ubicacion").value,
	 id_condicion = document.getElementById("id_condicion").value;
	
    $.ajax({
            url: '../../../model/vehiculoList.php',
            type: 'POST',
            data: {
				/*Datos de los inputs y selects en variables*/
                funcion : "subir_registro",
                placa : placa,
				comentario : comentario,
				id_marca : id_marca,
				id_modelo : id_modelo,
				cilindros : cilindros,
				cilindrada : cilindrada,
				puertas : puertas,
				preciovista : preciovista,
				kilometrajevista : kilometrajevista,
				fecha_fabricacion : fecha_fabricacion,
				fecha_modelo : fecha_modelo,
				id_carroceria : id_carroceria,
				id_transmision : id_transmision,
				id_combustible : id_combustible,
				id_traccion : id_traccion,
				id_ubicacion : id_ubicacion,
				id_condicion : id_condicion
            },
            success: function(response){
				console.log(response.status)
				try {
					console.log(response)
					let json_response = JSON.parse(response),
					status = json_response.status;
					if(status == 0){
						formulario.reset();
						if(document.getElementById('formulario__mensaje').classList.contains('formulario__mensaje-activo')){
							document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
						}
						document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
						setTimeout(() => {
							document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
						}, 5000);
						document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
							icono.classList.remove('formulario__grupo-correcto');
						});

					}else{
						document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
					}
				}catch(err){
					let template = 'Error al cargar datos, la placa ya existe';
					console.log(template,err);
					document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
				}
            },
			
            
    }) 
} 
