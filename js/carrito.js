/// index.js
// Este codigo implementa la simulación de un carrito de compras
// para el sitio de gatotips.net
//Beatriz Arenas 31/03/2023

/// declaracion de variables 

const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const titulo = document.getElementById("titulo");
const divProductos = document.getElementById("divProductos");
const carrito = [];
const butonFinalizar = document.querySelector("#finalizar");
const thead = document.querySelector("#thead");
const tbody = document.querySelector("#tbody");
const parrafoTotal = document.querySelector("#total");


class producto {
    constructor(id, nombre, precio, stock,) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
};


// arreglo para los productos del carrito
const productos = [
    new producto(1, "Croquetas", 200, 6,),
    new producto(2, "Lata", 30, 20),
    new producto(3, "Premios", 80, 8),
    new producto(4, "Shampoo", 100, 8),
    new producto(5, "Espuma", 180, 5),
    new producto(6, "Rascador", 1500, 2),
    new producto(7, "Cañas", 150, 20),
    new producto(8, "Laser", 180, 8),
    new producto(9, "Raton", 50, 10),
    new producto(10, "Cascabel", 25, 20)
];




//eventos

//Click sobre el boton ingresar
formulario.onsubmit = (e) => {
    e.preventDefault()
    const infoUsuario = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
    }

    // Cambiando el mensaje de bienvenida
    localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));
    formulario.remove();
    titulo.innerText = `Hola  ${infoUsuario.nombre} Estos son los articulos que tenemos en GatoTips`

    // mostrar los articulos 
    mostrarProductos();

}

//revisar en local storage
revisarInfoUsuario();


//funciones

function mostrarProductos() {

    divProductos.innerHTML = "";

    //formando card con ayuda de bootstrap

    productos.forEach(prod => {
        divProductos.innerHTML += `<div class="card cardProducto">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">${prod.precio}</p>
          <button id=${prod.id} class="btn btn-secondary">COMPRAR</button>
        </div>
        </div>`

    });

    //agregar evento clic a botones
    agregarClicBotonesCarrito();

}

function revisarInfoUsuario(){

    //Revisar si en el storage hay registros

    const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));

    if (infoUsuario) {
        formulario.remove()
        titulo.innerText = `Hola  ${infoUsuario.nombre} Estos son los articulos que tenemos en GatoTips`

        mostrarProductos();
    }
};

function agregarClicBotonesCarrito(){
    let botonesComprar = document.querySelectorAll(".btn-secondary");
    botonesComprar.forEach(boton => {
        boton.onclick = () => {
            const producto = productos.find(p => p.id === parseInt(boton.id));
    
            const prodCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
    
            }
            const prodEnCarrito = carrito.find(prod => prod.id === prodCarrito.id)
            if (!prodEnCarrito) {
                carrito.push(prodCarrito);
            } else {
                prodEnCarrito.cantidad++
            }

            butonFinalizar.classList.remove("d-none");
        }
    });
};


 //finalizar compra
   
butonFinalizar.onclick = () => {
    divProductos.remove();
    butonFinalizar.remove();
    thead.innerHTML = `<tr>
<th scope="col">Producto</th>
<th scope="col">Cantidad</th>
<th scope="col">Total</th>
</tr>`

    let totalCompra = 0
    carrito.forEach(prod => {
        totalCompra += prod.cantidad * prod.precio
        tbody.innerHTML += `
    <tr>
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td>${prod.cantidad * prod.precio}</td>
    </tr>`
    })

    parrafoTotal.innerHTML = `El total de tu compra es $ ${totalCompra}`
}