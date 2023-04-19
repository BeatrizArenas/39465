/// index.js
// Este codigo implementa la simulación de un carrito de compras
// para el sitio de gatotips.net
//Beatriz Arenas 18/04/2023

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
let products = [];


class producto {
    constructor(id, nombre, precio,imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
};


//eventos

//revisar en local storage


//carga de pagina
 (function() {

    getProducts().then(data => {
        products = data;

        //revisar si hay información del usuario en el localstorage
        revisarInfoUsuario();
    });
 })();


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


//funciones

//funcion que ejecuta el fetch para recuperar el arreglo de productos
async function getProducts() {
    const productAPI = await fetch("./data/productos.json");
    const productsJson = await productAPI.json();
    return productsJson
};


//funcion que muestra los productos
function mostrarProductos() {
    
    products.forEach((prod) => {
        const { id, nombre, precio, imagen, categoria } = prod
        divProductos.innerHTML += `
        <div class="card cardProducto ">
        <div class="card-body">
        <img src="${imagen}" class="producto-imagen"> 
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">${precio}  ${categoria}</p>
          <button id="${id}-btn-comprar" prod-id=${id} class="btn btn-primary">AGREGAR</button>
          <button id="${id}-btn-eliminar" prod-id=${id} class="btn btn-secondary">ELIMINAR</button>
        </div>
        </div>`

    });

    //agregar evento clic a botones
    agregarClicBotonesCarrito();
}; 





function revisarInfoUsuario() {

    //Revisar si en el storage hay registros
    const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));

    if (infoUsuario) {
        formulario.remove()
        titulo.innerText = `Hola  ${infoUsuario.nombre} Estos son los articulos que tenemos en GatoTips`

        mostrarProductos();
    }
};

//agregar clics a los botones del carrito
function agregarClicBotonesCarrito() {
    
    //botones comprar
    let botonesComprar = document.querySelectorAll(".btn-primary");
    botonesComprar.forEach(boton => {
        boton.onclick = () => {
            const producto = products.find(p => p.id === parseInt(boton.attributes["prod-id"].value));

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

            messageAddProduc();

            butonFinalizar.classList.remove("d-none");
        }
    });

    //botones eliminar
    let botonesEliminar = document.querySelectorAll(".btn-secondary");
    botonesEliminar.forEach(boton => {
        boton.onclick = () => {

            const idProducto = parseInt(boton.attributes["prod-id"].value);

            const prodEnCarrito = carrito.find(p => p.id === idProducto);

            if (!prodEnCarrito) {
                alert("Ese producto no esta en tu carrito");
            } else {
                prodEnCarrito.cantidad--
                if (prodEnCarrito.cantidad === 0)
                {
                    const indexProd = carrito.indexOf(prodEnCarrito);
                    if (indexProd > -1)
                    {
                        carrito.splice(indexProd, 1);
                    }
                }
            }

            messageEliProduc();

            butonFinalizar.classList.remove("d-none");
        }
    });
};


//mensajes de alerta con sweet alert
const messageAddProduc = () => {
    Swal.fire({
        text: "Producto agregardo al carrito",
        timer: 2000
    });
}

const messageEliProduc = () => {
    Swal.fire({
        text: "Producto eleminado",
        timer: 2000
    });
}

//boton finalizar compra
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