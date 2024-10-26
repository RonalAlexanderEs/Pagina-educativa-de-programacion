// Variable que mantiene el estado visible del carrito
var carritoVisible = false;



// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Asignamos los eventos a los botones y otros elementos
    asignarEventosBotones();
    asignarEventosPago();
}

// Asignar eventos de botones de eliminar, agregar al carrito, y pagar
function asignarEventosBotones() {
    // Botones eliminar
    agregarEventoAClase('btn-eliminar', eliminarItemCarrito);

    // Botones agregar al carrito
    agregarEventoAClase('boton-item', agregarAlCarritoClicked);

    // Botón pagar
    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

// Asignar eventos a los métodos de pago
function asignarEventosPago() {
    document.getElementById('pago-tarjeta').addEventListener('click', mostrarFormularioTarjeta);
    document.getElementById('pago-yape-plin').addEventListener('click', mostrarCampoCelular);
}

// Función auxiliar para agregar eventos a todos los elementos de una clase
function agregarEventoAClase(clase, funcion) {
    var elementos = document.getElementsByClassName(clase);
    Array.from(elementos).forEach(el => el.addEventListener('click', funcion));
}

// Mostrar el formulario de tarjeta de crédito/débito
function mostrarFormularioTarjeta() {
    alternarVisibilidad('formulario-tarjeta', 'campo-celular');
}

// Mostrar campo de celular para Yape o Plin
function mostrarCampoCelular() {
    alternarVisibilidad('campo-celular', 'formulario-tarjeta');
}

// Alternar la visibilidad de dos elementos
function alternarVisibilidad(mostrar, ocultar) {
    document.getElementById(mostrar).classList.remove('oculto');
    document.getElementById(ocultar).classList.add('oculto');
}

// Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    var item = obtenerDatosItem(event.target);
    agregarItemAlCarrito(item);
    hacerVisibleCarrito();
}

// Obtener datos del item
function obtenerDatosItem(boton) {
    var item = boton.parentElement;
    return {
        titulo: item.querySelector('.titulo-item').innerText,
        precio: item.querySelector('.precio-item').innerText,
        imagenSrc: item.querySelector('.img-item').src
    };
}

// Función que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    document.querySelector('.carrito').style.marginRight = '0';
    document.querySelector('.carrito').style.opacity = '1';
    document.querySelector('.contenedor-items').style.width = '60%';
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(item) {
    var itemsCarrito = document.querySelector('.carrito-items');

    // Controlamos que el item no se encuentre en el carrito
    if (itemYaEnCarrito(item.titulo)) {
        alert("El item ya se encuentra en el carrito");
        return;
    }

    // Crear el elemento del carrito
    var nuevoItem = crearElementoCarrito(item);
    itemsCarrito.append(nuevoItem);

    // Actualizar el total del carrito
    actualizarTotalCarrito();
}

// Verificar si el item ya está en el carrito
function itemYaEnCarrito(titulo) {
    return Array.from(document.querySelectorAll('.carrito-item-titulo')).some(el => el.innerText === titulo);
}

// Crear el elemento HTML del carrito
function crearElementoCarrito(item) {
    var itemCarrito = document.createElement('div');
    itemCarrito.classList.add('item');
    itemCarrito.innerHTML = `
        <div class="carrito-item">
            <img src="${item.imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${item.titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${item.precio.replace('$', 'S/')}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    
    // Asignar eventos al nuevo item
    itemCarrito.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    itemCarrito.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);
    itemCarrito.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

    return itemCarrito;
}

// Funciones para aumentar y reducir cantidades
function sumarCantidad(event) {
    modificarCantidad(event.target, 1);
}

function restarCantidad(event) {
    modificarCantidad(event.target, -1);
}

// Modificar la cantidad de un item
function modificarCantidad(elemento, delta) {
    var selector = elemento.parentElement;
    var cantidad = parseInt(selector.querySelector('.carrito-item-cantidad').value) + delta;
    if (cantidad >= 1) {
        selector.querySelector('.carrito-item-cantidad').value = cantidad;
        actualizarTotalCarrito();
    }
}

// Función que actualiza el total del carrito
function actualizarTotalCarrito() {
    var total = Array.from(document.querySelectorAll('.carrito-item')).reduce((acc, item) => {
        var precio = parseFloat(item.querySelector('.carrito-item-precio').innerText.replace('S/', '').replace('.', '').replace(',', '.').trim());
        var cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        return acc + (precio * cantidad);
    }, 0);

    total = Math.round(total * 100) / 10000;
    document.querySelector('.carrito-precio-total').innerText = `S/ ${total.toFixed(2).replace('.', ',')}`;
}

// Eliminar un item del carrito
function eliminarItemCarrito(event) {
    event.target.closest('.carrito-item').remove();
    actualizarTotalCarrito();
    ocultarCarritoSiVacio();
}

// Ocultar el carrito si está vacío
function ocultarCarritoSiVacio() {
    if (document.querySelector('.carrito-items').childElementCount === 0) {
        var carrito = document.querySelector('.carrito');
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
        document.querySelector('.contenedor-items').style.width = '100%';
    }
}

// Validar el pago y mostrar un mensaje de compra
function pagarClicked() {
    if (!document.querySelector('input[name="metodo-pago"]:checked')) {
        alert("Por favor, seleccione un método de pago.");
        return;
    }

    alert("Gracias por la compra");
    vaciarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
    var carritoItems = document.querySelector('.carrito-items');
    while (carritoItems.firstChild) {
        carritoItems.firstChild.remove();
    }
    actualizarTotalCarrito();
    ocultarCarritoSiVacio();
}


var nuevoItem = crearElementoCarrito(item);
// El error está aquí, debes usar `` (backticks)
var itemCarrito = document.createElement('div');
itemCarrito.classList.add('item');
itemCarrito.innerHTML = `
    <div class="carrito-item">
       <img src="${item.imagenSrc}" width="80px" alt="">
       <div class="carrito-item-detalles">
           <span class="carrito-item-titulo">${item.titulo}</span>
           <div class="selector-cantidad">
               <i class="fa-solid fa-minus restar-cantidad"></i>
               <input type="text" value="1" class="carrito-item-cantidad" disabled>
               <i class="fa-solid fa-plus sumar-cantidad"></i>
           </div>
           <span class="carrito-item-precio">${item.precio.replace('$', 'S/')}</span>
       </div>
       <button class="btn-eliminar">
           <i class="fa-solid fa-trash"></i>
       </button>
    </div>`;
    document.querySelector('.carrito-precio-total').innerText = `S/ ${total.toFixed(2).replace('.', ',')}`;
