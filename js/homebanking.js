//Declaración de variables
var nombreUsuario="Alejandro";
var clave="1234";
var saldoCuenta=10000;
var limiteExtraccion=2000;
var limiteTransferencias=5000; //variable para gestionar límites de transferencia
var usuarioHabilitado = false; // variable booleana a modo de bandera de habilitación de usuiario

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    actualizarLimiteTransferenciaEnPantalla();
    iniciarSesion();
}

//funciones agregadas por AA
function sumaSaldo(monto) { 
	saldoCuenta+=monto;
}
function restaSaldo(monto) {
	saldoCuenta-=monto;
}
function validaSaldoyPagaServicio(monto,servicio) {// funcion general para pago de cualquier servicio validando monto con saldo
	var saldoInicial = saldoCuenta;
	if(saldoCuenta<monto){
		alert("El saldo es insuficiente para el pago solicitado de $"+monto);
		}
		else {
			restaSaldo(monto);
			actualizarSaldoEnPantalla();		
			alert("Pago realizado con éxito \nServicio: "+servicio+"\nSaldo Anterior $"+saldoInicial+"\nMonto $"+monto+"\nSaldo Actual $"+saldoCuenta);
		}

}
function cerrarSesion() { //utilizando el refresco de la página como cierre de sesión
location.reload();
alert("Gracias por Utilizar HomeBanking\nLo esperamos para su próxima transacción!");
}

function iniciarSesion() { //función que pide un aclave y libera todas las funciones vía variable usuarioHabilitado
	do {
			var claveIngresada = prompt("Ingrese su clave personal");
			console.log("aquiestoy"+claveIngresada);
			console.log(usuarioHabilitado);
			if (claveIngresada == clave)
			{
				alert("Bienvenido "+nombreUsuario);
				usuarioHabilitado = true;
				cargarNombreEnPantalla();
			} else{
					alert("La clave ingresada es incorrecta");
					saldoCuenta=0;
					actualizarSaldoEnPantalla();
					}
		}
	while (usuarioHabilitado==false);
}

function cambiarLimiteDeTransferencias() { 
	if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}
	var limite = limiteTransferencias;
	var monto = parseInt(prompt("Ingrese el nuevo límite de transferencias"));
	if (isNaN(monto)) 
		 {
		 alert("Ingreso incorrecto");
		 return(0);
		}
	limiteTransferencias = monto;
	alert("Límite Transferencias anterior:  "+limite+"\nNuevo Límite de Transferencias:  "+limiteTransferencias);
	actualizarLimiteTransferenciaEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}
	var limite = limiteExtraccion;
	var monto = parseInt(prompt("Ingrese el nuevo límite de extracción"));
	if (isNaN(monto)) 
		 {
		 alert("Ingreso incorrecto");
		 return(0);
		}
	limiteExtraccion = monto;
	alert("Límite anterior:  "+limite+"\nNuevo Límite:  "+limiteExtraccion);
	actualizarLimiteEnPantalla();
}

function extraerDinero() {
	var saldo=saldoCuenta;
	var aprobado=true; //flag para aprobación de extracción
	if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}

	var monto = parseInt(prompt("Ingrese el monto a extraer"));
	if (isNaN(monto)) 
		 {
		 alert("Ingreso incorrecto");
		 return(0);
		}
	if(monto>saldoCuenta){ //monto mayor que saldo
		alert("El monto a extraer supera su saldo actual de $"+saldoCuenta);
		aprobado=false;
		}
	if(monto>limiteExtraccion){ // monto mayor al límite
		alert("El monto a extraer supera su límite de extracción de $"+limiteExtraccion);
		aprobado=false;
		}
	if((monto%100)!=0){ //multiplo de $100
		alert("El monto a extraer debe ser múltiplo de $100");
		aprobado=false;
		}
	if (aprobado){ //si todo está OK, recién ahí se realiza la extracción
		restaSaldo(monto);
		alert("Has extraido $"+monto+"\nSaldo Anterior $"+saldo+"\nSaldo Actual $"+saldoCuenta);
		actualizarSaldoEnPantalla();
		}
}

function depositarDinero() {
	if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}
	var saldo=saldoCuenta;
	var monto = parseInt(prompt("Ingrese el monto a depositar"));
	if (isNaN(monto)) 
		 {
		 alert("Ingreso incorrecto");
		 return(0);
		}
	sumaSaldo(monto);
	alert("Has depositado:  "+monto+"\nSaldo Anterior:  "+saldo+"\nSaldo Actual:  "+saldoCuenta);	
	actualizarSaldoEnPantalla();

}

function pagarServicio() {
	if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}
	var agua=350;
	var telefono=425;
	var luz=210;
	var internet=570;
	var opcion=parseInt(prompt("Ingrese el servicio que desea abonar:\n1-Agua\n2-Teléfono\n3-Luz\n4-Internet"));
	switch (opcion)
	{
		case 1:
				validaSaldoyPagaServicio(agua,"Agua");
				break;
		case 2:
				validaSaldoyPagaServicio(telefono,"Telefono");
				break;
		case 3:
				validaSaldoyPagaServicio(luz,"Luz");
				break;
		case 4:
				validaSaldoyPagaServicio(internet,"Internet");
				break;
		default:
				alert("Ingreso incorrecto");
	}
}

function transferirDinero() {
if (!usuarioHabilitado){
		alert("Usuario no habilitado para esta operación");
		return(0);
	}
var cuentaAmiga1=1234567;
var cuentaAmiga2=7654321;
var monto = parseInt(prompt("Ingrese el monto a transferir"));
if (isNaN(monto)) 
		 {   //verifica ingreso 
		 alert("Monto incorrecto");
		 return(0);
		}
if(monto>limiteTransferencias) //verifica límite
		 {
		 alert("El monto supera su límite de transferencias");
		 return(0);
		}
if(monto>saldoCuenta){ // falta de saldo
		alert("El monto ingresado supera el saldo actual de $"+saldoCuenta);
		} else { //pide cuenta destino
			var cuenta=parseInt(prompt("Ingrese la cuenta destino"));
			if((cuenta!=cuentaAmiga1) && (cuenta!=cuentaAmiga2)){ // cuenta incorrecta
				alert("La cuenta ingresada no está habilitada para transferencias");
				} else { // realiza transferencia
					restaSaldo(monto);
					alert("Se transfirieron $"+monto+"\nCuenta destino "+cuenta);
					actualizarSaldoEnPantalla();
						}
}
}




//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
function actualizarLimiteTransferenciaEnPantalla() {
    document.getElementById("limite-transferencias").innerHTML = "Tu límite de Transferencias es: $" + limiteTransferencias;
    }

