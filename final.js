'use strict';

/*
 *	CHIERICHETTI, NAHUEL NICOLÁS
 */


const d = document;

let aProductos = [
	{
		id: 1,
		nombre: 'Mate de calabaza',
		imagen: 'producto1.jpg',
		descripcion: 'Modelo "Torpedo" con virola lisa de acero inoxidable',
		precio: 2500,
	},
	{
		id: 2, 
		nombre: 'Mate de calabaza',
		imagen: 'producto2.jpg',
		descripcion: 'Modelo "Camionero" con virola lisa de acero inoxidable',
		precio: 2500,
	},
	{
		id: 3,
		nombre: 'Bombilla de alpaca',
		imagen: 'producto3.jpg',
		descripcion: 'Bombilla de alpaca con caño liso y pico curvo',
		precio: 1800,
	},
	{
		id: 4,
		nombre: 'Bombilla de acero inoxidable',
		imagen: 'producto4.jpg',
		descripcion: 'Bombilla de acero inoxidable con caño liso y pico curvo',
		precio: 1200,
	},
	{
		id: 5,
		nombre: 'Matera de cuero simil canasto',
		imagen: 'producto5.jpg',
		descripcion: 'Matera de cuero con división en el interior',
		precio: 2200,
	},
	{
		id: 6,
		nombre: 'Termo de acero inoxidable 1litro',
		imagen: 'producto6.jpg',
		descripcion: 'Termo de acero inoxidable con pico cebador y media manija. Capacidad de 1 litro',
		precio: 2500,
	},
];

let divProductos = d.querySelector('#productos');

for (let i = 0; i < aProductos.length; i++) {
	let div = d.createElement('div');
	divProductos.appendChild(div);
	
	let img = d.createElement('img');
	img.src = aProductos[i]['imagen'];
	img.alt = 'Foto de producto ' + aProductos[i];
	img.style.borderRadius = '1em';
	div.appendChild(img);

	let div1 = d.createElement('div');
	div.appendChild(div1);

	let h3 = d.createElement('h3');
	h3.innerHTML = aProductos[i]['nombre'];
	h3.style.fontSize = '2em';
	div.appendChild(h3);

	let precio = d.createElement('p');
	precio.innerHTML = '$ ' + aProductos[i]['precio'];
	precio.style.fontSize = '2.5em';
	div.appendChild(precio);

	let btn = d.createElement('button');
	btn.className = 'agregar';
	btn.innerHTML = 'Agregar al carrito';
	btn.dataset.id = aProductos[i]['id'];
	btn.dataset.valor = aProductos[i]['precio'];
	btn.style.backgroundColor = '#528D3A';
	btn.style.borderRadius = '20px';
	div.appendChild(btn);

	let btnAmpliar = d.createElement('button');
	btnAmpliar.className = 'ampliar';
	btnAmpliar.innerHTML = 'Ampliar información';
	btnAmpliar.dataset.id = aProductos[i]['id'];
	btnAmpliar.dataset.valor = aProductos[i]['precio'];
	btnAmpliar.style.backgroundColor = 'lightgrey';
	btnAmpliar.style.border = '1px solid #528D3A';
	btnAmpliar.style.color = '#528D3A';
	btnAmpliar.style.borderRadius = '20px';
	div.appendChild(btnAmpliar);
}

let agregarBtns = d.querySelectorAll('#productos button.agregar');
let ampliarBtns = d.querySelectorAll('#productos button.ampliar');
let minicarrito = d.querySelector('#minicarrito');


let carrito = {
	productos: [],
	cantidad: [],
	total: 0,
    
};

let p1 = d.createElement('p');
p1.innerHTML = `Cantidad: ${carrito.cantidad}`;
minicarrito.appendChild(p1);

let p2 = d.createElement('p');
p2.innerHTML = `Total: ${carrito.total}`;
minicarrito.appendChild(p2);

let btnVerCarrito = d.createElement('button');
btnVerCarrito.className = 'ver';
btnVerCarrito.innerHTML = 'Ver carrito';
minicarrito.appendChild(btnVerCarrito);


let cont = 0;

for (let btn of agregarBtns) {
	btn.onclick = function() {

	let identificador = parseInt(this.dataset.id);
	let valor = parseInt(this.dataset.valor);

	let indice = carrito.productos.indexOf(identificador);
	if(indice == -1) {
		carrito.productos.push(identificador);
		carrito.cantidad.push(1);
	} else {
		carrito.cantidad[indice]++;
	}
	carrito.total = parseInt(carrito.total) + valor;
	cont++;
	p1.innerHTML = `Cantidad: ${cont}`;
	p2.innerHTML = `Total: $${carrito.total}`;

	}	

}


for (let verCarritoBtn of d.querySelectorAll('button.ver')){
	verCarritoBtn.onclick = function() {
		
		let infoCarro = d.querySelector('#infocarrito');

		if(carrito.total == 0) {
			location.reload();
		}

		let divVer = d.createElement('div');
		divVer.style.width = '98%';
		divVer.style.margin = 'auto';
		divVer.style.backgroundColor = '#fff';
		infocarrito.appendChild(divVer);

		for (let i = 0; i < carrito.productos.length; i++) {
		let productoId = carrito.productos[i];
			for (let item of aProductos) {
				if (item.id == productoId) {

					let divProd = d.createElement('div');
					divProd.style.width = '100%';
					divProd.backgroundColor = '#fff';
					divVer.appendChild(divProd);

					let titulo = d.createElement('h3');
					titulo.innerHTML = `${item.nombre}`
					divProd.appendChild(titulo);

					let img = d.createElement('img');
					img.src = `${item.imagen}`;
					divProd.appendChild(img);

					let cant = d.createElement('p');
					cant.innerHTML = `Cantidad: ${carrito.cantidad[i]}`;
					divProd.appendChild(cant);

					let subtotal = d.createElement('p');
					subtotal.innerHTML = `Subtotal ${carrito.cantidad[i] * item.precio}`;
					divProd.appendChild(subtotal);

					let sumarProd = d.createElement('button');
					sumarProd.className = 'agregar';
					sumarProd.dataset.id = `${item.id}`;
					sumarProd.dataset.valor = `${item.precio}`;
					sumarProd.style.width = '100%';
					sumarProd.innerHTML = 'Agregar';
					sumarProd.onclick = function () {
						let identificador = parseInt(this.dataset.id);
						let valor = parseInt(this.dataset.valor);

						let indice = carrito.productos.indexOf(identificador);
						if(indice == -1) {
							carrito.productos.push(identificador);
							carrito.cantidad.push(1);
						} else {
							carrito.cantidad[indice]++;
						}
						carrito.total = parseInt(carrito.total) + valor;
						cont++;
						p1.innerHTML = `Cantidad: ${cont}`;
						p2.innerHTML = `Total: $${carrito.total}`;
						cant.innerHTML = `Cantidad: ${carrito.cantidad[i]}`;
						subtotal.innerHTML = `Subtotal: ${carrito.cantidad[i] * item.precio}`;
						tot.innerHTML = `Total: $${carrito.total}`;
					}
					divProd.appendChild(sumarProd);

					let quitarProd = d.createElement('button');
					quitarProd.className = 'quitar';
					quitarProd.dataset.id = `${item.id}`;
					quitarProd.dataset.valor = `${item.precio}`;
					quitarProd.style.width = '100%';
					quitarProd.style.backgroundColor = 'tomato';
					quitarProd.innerHTML = 'Quitar';
					quitarProd.onclick = function() {
						let identificador = parseInt(this.dataset.id);
						let valor = parseInt(this.dataset.valor);

						let indice = carrito.productos.indexOf(identificador);
						if (indice != -1) {
							if (carrito.cantidad[indice] > 0) {
								carrito.cantidad[indice]--;
								carrito.total = parseInt(carrito.total) - valor;
							}
						}
						cont--;
						p1.innerHTML = `Cantidad: ${cont}`;
						p2.innerHTML  = `Total: $${carrito.total}`;
						cant.innerHTML = `Cantidad: ${carrito.cantidad[i]}`;
						subtotal.innerHTML = `Subtotal: ${carrito.cantidad[i] * item.precio}`;
						tot.innerHTML = `Total: $${carrito.total}`;
					}
					divProd.appendChild(quitarProd);
				}

				
			}
		}

let aFormas = ['Efectivo', 'Débito', 'Crédito',];


		let tot = d.createElement('p');
		tot.innerHTML = `Total: $${carrito.total}`;
		tot.style.fontSize = '2em';
		tot.style.fontWeight = 'bold';
		divVer.appendChild(tot);


		let finalizarCompraBtn = d.createElement('button');
		finalizarCompraBtn.className = 'finalizar';
		finalizarCompraBtn.style.backgroundColor = 'green';
		finalizarCompraBtn.style.width = '100%';
		finalizarCompraBtn.innerHTML = 'Finalizar Compra';
		finalizarCompraBtn.onclick = function () {

			infoCarro.removeChild(divVer);

			
			let formulario = d.getElementById('formulariocompra');
			let form = d.createElement('form');
			form.className = 'formC';
			form.style.backgroundColor = '#fff';
			formulario.appendChild(form);

			let tituloForm = d.createElement('h3');
			tituloForm.innerHTML = 'Formulario de compra';
			form.appendChild(tituloForm);

			let divForm = d.createElement('fieldset');
			divForm.style.width = '100%';
			form.appendChild(divForm);

			let parrafoDatos = d.createElement('legend');
			parrafoDatos.innerHTML = 'Completar datos personales';
			divForm.appendChild(parrafoDatos);

			let parrafoNombre = d.createElement('label');
			parrafoNombre.innerHTML = 'Nombre y Apellido*';
			parrafoNombre.style.display = 'block';
			divForm.appendChild(parrafoNombre);

			let nombreApellido = d.createElement('input');
			nombreApellido.type = 'text';
			nombreApellido.placeholder = 'Juan Pérez';
			nombreApellido.name = 'Nombre y Apellido';
			nombreApellido.required = true;
			nombreApellido.style.width = '80%';
			nombreApellido.style.display = 'block';
			//nombreApellido.value = 'Nombre y Apellido';
			divForm.appendChild(nombreApellido);

			let parrafoNumero = d.createElement('label');
			parrafoNumero.innerHTML = 'Número Telefónico';
			parrafoNumero.style.display = 'block';
			divForm.appendChild(parrafoNumero);

			let numero = d.createElement('input');
			numero.type = 'text';
			numero.name = 'número';
			numero.placeholder = '1112345678';
			numero.style.width = '80%';
			numero.style.display = 'block';
			//numero.value = 'Número Telefónico';
			divForm.appendChild(numero);

			let parrafoEmail = d.createElement('label');
			parrafoEmail.innerHTML = 'Email';
			parrafoEmail.style.display = 'block';
			divForm.appendChild(parrafoEmail);

			let email = d.createElement('input');
			email.type = 'email';
			email.name = 'email';
			email.placeholder = 'juanperez@gmail.com';
			email.style.width = '80%';
			email.style.display = 'block';
			numero.value = '';
			divForm.appendChild(email);

			let parrafoCiudad = d.createElement('label');
			parrafoCiudad.innerHTML = 'Ciudad*';
			parrafoCiudad.style.display = 'block';
			divForm.appendChild(parrafoCiudad);

			let ciudad = d.createElement('input');
			ciudad.type = 'text';
			ciudad.name = 'Ciudad';
			ciudad.required = true;
			ciudad.placeholder = 'CABA';
			ciudad.style.width = '80%';
			ciudad.style.display = 'block';
			ciudad.style.display = 'block';
			divForm.appendChild(ciudad);


			let parrafoEntrega = d.createElement('label');
			parrafoEntrega.innerHTML = 'Dirección de Entrega*';
			parrafoEntrega.style.display = 'block';
			divForm.appendChild(parrafoEntrega);

			let direccion = d.createElement('input');
			direccion.type = 'text';
			direccion.name = 'dirección';
			direccion.required = true;
			direccion.placeholder = 'Segurola 4310';
			direccion.style.width = '80%';
			direccion.style.display = 'block';
			divForm.appendChild(direccion);

			let codigoP = d.createElement('label');
			codigoP.innerHTML = 'Código Postal*';
			codigoP.style.display = 'block';
			divForm.appendChild(codigoP);

			let codigoPostal = d.createElement('input');
			codigoPostal.type = 'text';
			codigoPostal.name = 'código postal';
			codigoPostal.required = true;
			codigoPostal.placeholder = 'Código Postal';
			codigoPostal.style.width = '80%';
			codigoPostal.style.display = 'block';
			divForm.appendChild(codigoPostal);

			let parrafoFecha = d.createElement('label');
			parrafoFecha.innerHTML = 'Fecha de Entrega';
			parrafoFecha.style.display = 'block';
			divForm.appendChild(parrafoFecha);

			let elegirFecha = d.createElement('input');
			elegirFecha.type = 'date';
			elegirFecha.name = 'fecha';
			elegirFecha.style.width = '80%';
			elegirFecha.style.display = 'block';
			divForm.appendChild(elegirFecha);

			let parrafoPago = d.createElement('label');
			parrafoPago.innerHTML = 'Forma de Págo';
			parrafoPago.style.display = 'block';
			divForm.appendChild(parrafoPago);

			let checkeo = 0;
			let borrarCredito = 0;
			let borrarDebito = 0;
			for (let pago of aFormas) {
				let opcion = null;
				let forma = d.createElement('label');
				let formaPago = d.createElement('input');
				formaPago.type = 'radio';
				//formaPago.style.display = 'inline-block';
				forma.style.display = 'block';
				forma.style.fontSize = '2em';
				formaPago.name = pago;
				formaPago.value = pago;
				formaPago.id = pago;
				forma.innerHTML = pago;
				formaPago.onclick = function() {
					if(formaPago.checked) {
						opcion = formaPago.value;
					}

					let eft = d.getElementById('Efectivo');
					let deb = d.getElementById('Débito');
					let cred = d.getElementById('Crédito');
					let cuot = d.getElementById('cuotas');
					let pTarjeta = d.getElementById('pTarjeta');
					let numT = d.getElementById('numT');
					let pTitular = d.getElementById('pTitular');
					let nomT = d.getElementById('nomT');
					let pVencimiento = d.getElementById('pVencimiento');
					let numV = d.getElementById('numV');
					let pCodigo = d.getElementById('pCodigo');
					let numC = d.getElementById('numC');
					let parTarjeta = d.getElementById('parTarjeta');
					let numeT = d.getElementById('numeT');
					let parTitular = d.getElementById('parTitular');
					let nombT = d.getElementById('nombT');
					let parVencimiento = d.getElementById('parVencimiento');
					let numeV = d.getElementById('numeV');
					let parCodigo = d.getElementById('parCodigo');
					let numeC = d.getElementById('numeC');
						 


					if(opcion == 'Crédito') {
						deb.checked = false;
						eft.checked = false;
						if(borrarDebito == 1) {
							parTarjeta.remove();
							numeT.remove();
							parTitular.remove();
							nombT.remove();
							parVencimiento.remove();
							numeV.remove();
							parCodigo.remove();
							numeC.remove();
							checkeo = 0;
							borrarDebito = 0;
						}

						if(checkeo == 0) {
							let parrafoCuotas = d.createElement('select');
							parrafoCuotas.id = 'cuotas';
							parrafoCuotas.innerHTML = 'Cuotas Disponibles';
							
						
							let c1 = d.createElement('option');
							c1.innerHTML = '3 cuotas sin interés';
							parrafoCuotas.appendChild(c1);

							let c2 = d.createElement('option');
							c2.innerHTML = '6 cuotas sin interés';
							parrafoCuotas.appendChild(c2);

							let c3 = d.createElement('option');
							c3.innerHTML = '9 cuotas sin interés';
							parrafoCuotas.appendChild(c3);

							let c4 = d.createElement('option');
							c4.innerHTML = '12 cuotas sin interés';
							parrafoCuotas.appendChild(c4);

							let c5 = d.createElement('option');
							c5.innerHTML = '18 cuotas sin interés';
							parrafoCuotas.appendChild(c5);

							divForm.appendChild(parrafoCuotas);

							let parrafoTarjeta = d.createElement('label');
							parrafoTarjeta.innerHTML = 'Número de Tarjeta';
							parrafoTarjeta.style.display = 'block';
							parrafoTarjeta.id = 'pTarjeta';
							divForm.appendChild(parrafoTarjeta);

							let numeroT = d.createElement('input');
							numeroT.type = 'text';
							numeroT.name = 'número tarjeta';
							numeroT.placeholder = '**** **** **** ****';
							numeroT.style.width = '80%';
							numeroT.required = true;
							numeroT.id = 'numT';
							numeroT.style.display = 'block';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroT);

							let parrafoTitular = d.createElement('label');
							parrafoTitular.innerHTML = 'Titular de la Tarjeta';
							parrafoTitular.style.display = 'block';
							parrafoTitular.required = true;
							parrafoTitular.id = 'pTitular';
							divForm.appendChild(parrafoTitular);

							let nombreT = d.createElement('input');
							nombreT.type = 'text';
							nombreT.name = 'nombre titular';
							nombreT.placeholder = 'PEREZ JUAN';
							nombreT.style.width = '80%';
							nombreT.required = true;
							nombreT.id = 'nomT';
							nombreT.style.display = 'block';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(nombreT);

							let parrafoVencimiento = d.createElement('label');
							parrafoVencimiento.innerHTML = 'Fecha de Vencimiento';
							parrafoVencimiento.style.display = 'block';
							parrafoVencimiento.required = true;
							parrafoVencimiento.id = 'pVencimiento';
							divForm.appendChild(parrafoVencimiento);

							let numeroV = d.createElement('input');
							numeroV.type = 'text';
							numeroV.name = 'fecha vencimiento';
							numeroV.placeholder = '04/24';
							numeroV.style.width = '40%';
							numeroV.required = true;
							numeroV.id = 'numV';
							numeroV.style.display = 'inline-block';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroV);

							let parrafoCodigo = d.createElement('label');
							parrafoCodigo.innerHTML = 'CVV';
							parrafoCodigo.style.display = 'block';
							parrafoCodigo.required = true;
							parrafoCodigo.id = 'pCodigo';
							divForm.appendChild(parrafoCodigo);

							let numeroC = d.createElement('input');
							numeroC.type = 'text';
							numeroC.name = 'codigo tarjeta';
							numeroC.placeholder = '***';
							numeroC.required = true;
							numeroC.style.width = '40%';
							numeroC.id = 'numC';
							numeroC.style.display = 'inline-block';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroC);
							checkeo = 1;	
							borrarCredito = 1;							
							console.log(checkeo + 'credito');
						}
					} else if(opcion == 'Débito') {
						cred.checked = false;
						eft.checked = false;
						if(borrarCredito == 1) {
							cuot.remove();//error
							pTarjeta.remove();
							numT.remove();
							pTitular.remove();
							nomT.remove();
							pVencimiento.remove();
							numV.remove();
							pCodigo.remove();
							numC.remove();
							checkeo = 0;
							console.log(checkeo + 'debito');
						}
						if(checkeo == 0) {
							let parrafoTarjeta = d.createElement('label');
							parrafoTarjeta.innerHTML = 'Número de Tarjeta';
							parrafoTarjeta.style.display = 'block';
							parrafoTarjeta.id = 'parTarjeta';
							divForm.appendChild(parrafoTarjeta);

							let numeroT = d.createElement('input');
							numeroT.type = 'text';
							numeroT.name = 'número tarjeta';
							numeroT.placeholder = '**** **** **** ****';
							numeroT.style.width = '80%';
							numeroT.required = true;
							numeroT.style.display = 'block';
							numeroT.id = 'numeT';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroT);

							let parrafoTitular = d.createElement('label');
							parrafoTitular.innerHTML = 'Titular de la Tarjeta';
							parrafoTitular.style.display = 'block';
							parrafoTitular.required = true;
							parrafoTitular.id = 'parTitular';
							divForm.appendChild(parrafoTitular);

							let nombreT = d.createElement('input');
							nombreT.type = 'text';
							nombreT.name = 'nombre titular';
							nombreT.placeholder = 'PEREZ JUAN';
							nombreT.required = true;
							nombreT.style.width = '80%';
							nombreT.style.display = 'block';
							nombreT.id = 'nombT';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(nombreT);

							let parrafoVencimiento = d.createElement('label');
							parrafoVencimiento.innerHTML = 'Fecha de Vencimiento';
							parrafoVencimiento.style.display = 'block';
							parrafoVencimiento.required = true;
							parrafoVencimiento.id = 'parVencimiento';
							divForm.appendChild(parrafoVencimiento);

							let numeroV = d.createElement('input');
							numeroV.type = 'text';
							numeroV.name = 'fecha vencimiento';
							numeroV.placeholder = '04/24';
							numeroV.style.width = '40%';
							numeroV.required = true;
							numeroV.style.display = 'inline-block';
							numeroV.id = 'numeV';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroV);

							let parrafoCodigo = d.createElement('label');
							parrafoCodigo.innerHTML = 'CVV';
							parrafoCodigo.style.display = 'block';
							parrafoCodigo.required = true;
							parrafoCodigo.id = 'parCodigo';
							divForm.appendChild(parrafoCodigo);

							let numeroC = d.createElement('input');
							numeroC.type = 'text';
							numeroC.name = 'codigo tarjeta';
							numeroC.placeholder = '***';
							numeroC.style.width = '40%';
							numeroC.required = true;
							numeroC.style.display = 'inline-block';
							numeroC.id = 'numeC';
							//numeroT.value = 'Número Tarjeta';
							divForm.appendChild(numeroC);
							checkeo = 1;
							borrarDebito = 1;
							console.log(checkeo + 'debito2');
						}
						
					} else if (opcion == 'Efectivo') {
						deb.checked = false;
						cred.checked = false;
						if(borrarDebito == 1) {
						
							//debito
							parTarjeta.remove();
							numeT.remove();
							parTitular.remove();
							nombT.remove();
							parVencimiento.remove();
							numeV.remove();
							parCodigo.remove();
							numeC.remove();
							checkeo = 0;
							borrarDebito = 0;
							console.log(checkeo + 'efectivo');
						}

						if(borrarCredito == 1) {
							cuot.remove();
							pTarjeta.remove();
							numT.remove();
							pTitular.remove();
							nomT.remove();
							pVencimiento.remove();
							numV.remove();
							pCodigo.remove();
							numC.remove();
							checkeo = 0;
							borrarCredito = 0;
						}
						console.log(checkeo + 'efectivo');
					}

				}
				forma.appendChild(formaPago);
				divForm.appendChild(forma);
			}

			let confirmarBtn = d.createElement('input');
			confirmarBtn.type = 'submit';
			confirmarBtn.style.display = 'block';
			confirmarBtn.value = 'Confirmar Compra';
			confirmarBtn.style.width = '100%';
			confirmarBtn.onsubmit = function() {
				let mandar = true;
				console.log(mandar);
				if (d.querySelector('[type=text]') == null) {
					let pError = d.createElement('p');
					pError.innerHTML = 'Por favor, complete los campos';
					pError.style.color = 'tomato';
					divProductos.appendChild('pError');
					console.log('El error funciona');
					mandar = false;
				} else {
					let pGracias = d.createElement('p');
					pGracias.innerHTML = 'Gracias por su compra';
					pGracias.style.color = 'green';
					divProductos.appendChild(pGracias);
					console.log('El gracias funciona');
					mandar = true;
				}
				return mandar;
			}
			form.appendChild(confirmarBtn);

			let cancelarCompraBtn = d.createElement('button');
			cancelarCompraBtn.className = 'cancelar';
			cancelarCompraBtn.style.backgroundColor = 'tomato';
			cancelarCompraBtn.style.width = '100%';
			cancelarCompraBtn.innerHTML = 'Cancelar Compra';
			cancelarCompraBtn.onclick = function () {
				location.reload();
			}
			form.appendChild(cancelarCompraBtn);
		}
		divVer.appendChild(finalizarCompraBtn);
	
		let vaciarCarritoBtn = d.createElement('button');
		vaciarCarritoBtn.className = 'vaciar';
		vaciarCarritoBtn.style.backgroundColor = '#fff';
		vaciarCarritoBtn.style.border = '1px solid green';
		vaciarCarritoBtn.style.color = 'green'
		vaciarCarritoBtn.style.width = '100%';
		vaciarCarritoBtn.innerHTML = 'Vaciar Carrito';
		vaciarCarritoBtn.onclick = function () {
			location.reload();
		}
		divVer.appendChild(vaciarCarritoBtn);

		let cerrarBtn = d.createElement('button');
		cerrarBtn.innerHTML = 'Seguir agregando productos';
		cerrarBtn.className = 'vaciar';
		cerrarBtn.style.backgroundColor = '#fff';
		cerrarBtn.style.border = '1px solid green';
		cerrarBtn.style.color = 'green';
		cerrarBtn.style.width = '100%';
		cerrarBtn.onclick = function(){
			infoCarro.removeChild(divVer);
		}
		divVer.appendChild(cerrarBtn);
	}
}




for (let ampliarBtn of d.querySelectorAll('button.ampliar')) {
	ampliarBtn.onclick = function() {

			let div = d.createElement('div');
			div.id = 'modalProducto';
			div.className = 'modal';
			d.querySelector('body').appendChild(div);

			let a = d.createElement('a');
			a.href = 'javascript:void(0)';
			a.innerHTML = 'X';
			a.type = 'button';
			a.onclick = function() {
				d.querySelector('body').removeChild(div);
			}
			div.appendChild(a);

	                                                                                                                       
		let id = parseInt(this.dataset.id);
		console.log(id);
		for (let i = 0; i < aProductos.length; i++) {
			if (id == aProductos[i]['id']) {

					let img = d.createElement('img');
					img.src = aProductos[i]['imagen'];
					img.alt = 'Foto de producto ' + aProductos[i];
					img.style.borderRadius = '1em';
					div.appendChild(img);

					let h3 = d.createElement('h3');
					h3.innerHTML = aProductos[i]['nombre'];
					div.appendChild(h3);

					let precio = d.createElement('p');
					precio.innerHTML = '$ ' + aProductos[i]['precio'];
					div.appendChild(precio);

					console.log(i);

					let descripcion = d.createElement('p');
					descripcion.innerHTML = aProductos[i]['descripcion'];
					div.appendChild(descripcion);

					let btn = d.createElement('button');
					btn.className = 'agregar';
					btn.dataset.valor = aProductos[i]['precio'];
					btn.innerHTML = 'Agregar';
					btn.onclick = function () {
							let valor = parseInt(this.dataset.valor)
							carrito.total = parseInt(carrito.total) + valor;
							cont++;
							p1.innerHTML = `Cantidad: ${cont}`;
							p2.innerHTML = `Total: $${carrito.total}`;
							console.log(carrito.total);
					}
					div.appendChild(btn);
			}
		}

	}
}
