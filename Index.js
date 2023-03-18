/// index.js
// Este codigo implementa la simulación de un carrito de compras
// para el sitio de gatotips.net


/// declaracion de variables



/// arreglo para los productos de comida para gatos
const comida = [
    {producto: "Croquetas", precio: 200},
    {producto: "Lata", precio: 25}    
];


// arreglo para los productos de higiene
const higiene = [
    {producto: "Shampoo", precio: 100},
    {producto: "Espuma", precio: 180}
]


/// arreglo para los productos de juguetes

const juguetes = [{producto: "rascador", precio:100},
    {producto:"cañas", precio:150},
    {producto:"laser", precio:180},
    {producto:"raton", precio:50}];

/// variables de carrito
let carrito = [];

/// funciones

function iniciarCarrito(){
    let respuesta1 = prompt("Estas en el carrito de compras, ¿Deseas comprar algo ? si o no:");
    

    //Convertir a minusculas
    respuesta1 = respuesta1.toLowerCase();
    let continuar = "si";

    if (respuesta1 == "si"){
        //ejectua mientras continuar sea "si"
        while(continuar == "si"){
            // mostrar tipos de productos
            let respuesta2 = prompt("Estos son los tipos de productos que tenemos:\n" + 
            " (1) Comida\n"+
            " (2)Higiene\n"+
            " (3)Juguetes\n"+
            " Ingresa el número de tu interés");

            continuar = mostrarProductos(respuesta2);  
        }
          
    };
    
    alert ("Gracias por tu visita");
};

function mostrarProductos(tipoProducto){
    let continuarComprando = "si";

        //mostrar productos de acuerdo a la categoria
        switch(tipoProducto){
            case "1":
                {
                    // mostrar productos de la categoria
                    let strProductos = "Los productos de esta categoría son estos:\n";

                    for(let i = 0; i < comida.length; i++){
                        strProductos += "(" + (i+1) + ") " + comida[i].producto + " $" + comida[i].precio + "\n";
                    }
                    
                    let respuesta3 = prompt(strProductos);
                    let intproducto = parseInt (respuesta3);
                    carrito.push( comida [intproducto-1]);
                    continuarComprando = mostrarCarrito();
                }
                
                break;
            case "2":
                {
                    let strProductos = "Los productos de esta categoría son estos:\n";
                for(let i = 0; i < higiene.length; i++){
                    strProductos += "(" + (i+1) + ") " + higiene[i].producto + " $" + higiene[i].precio + "\n";
                }
                let respuesta4 = prompt(strProductos);
                let intproducto = parseInt (respuesta4);
                carrito.push(higiene [intproducto-1]);
                continuarComprando = mostrarCarrito();
                }
                
            break;
            case "3":
                {
                let strProductos = "Los productos de esta categoría son estos:\n";
                for(let i = 0; i < juguetes.length; i++){
                    strProductos += "(" + (i+1) + ") " + juguetes[i].producto + " $" + juguetes[i].precio + "\n";
                }
                let respuesta5 = prompt(strProductos);
                let intproducto = parseInt (respuesta5);
                carrito.push(juguetes [intproducto-1]);
                continuarComprando = mostrarCarrito();
            }
            
                break;
            default:
                alert("Tu selección no es válida");
                break;
        };
    return continuarComprando;
};

// mostrar articulos en el carrito
function mostrarCarrito(){
    let strCarrito = "Los productos en tu carrito son:\n";
    let totalCarrito = 0;
    for(let i = 0; i < carrito.length; i++){
        strCarrito += carrito[i].producto + " : $" + carrito[i].precio + "\n";
        totalCarrito += carrito[i].precio;
    }

    strCarrito += "total del carrito: $" + totalCarrito + "\n\n";
    strCarrito += "¿Deseas agregar algo más a tu carrito? (si/no)";
    let respuesta6 = prompt(strCarrito);
    respuesta6 = respuesta6.toLowerCase();

    return respuesta6;
}


/// eventos

iniciarCarrito();