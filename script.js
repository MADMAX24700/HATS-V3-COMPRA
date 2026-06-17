
// Agregamos la propiedad 'precio' a cada objeto de tu lista de gorras
const listaGorras = [
    { id: 1, nombre: "Gorra Sky Classic", img: "img/gorra-azul.png", colorFondo: "#0044aa", precio: 500 },
    { id: 2, nombre: "Gorra white Turquesa ", img: "img/gorra-blanca.png", colorFondo: "#06af99", precio: 600 },
    { id: 3, nombre: "Gorra Grey Blue", img: "img/gorra-gris.png", colorFondo: "#b6b6b6", precio: 450 },
    { id: 4, nombre: "Gorra Purple Classic", img: "img/gorra-morado.png", colorFondo: "#5d1ba8", precio: 500 },
    { id: 5, nombre: "Gorra Black Classic", img: "img/gorra-negra.png", colorFondo: "#333333", precio: 600 },
    { id: 6, nombre: "Gorra Turquoise Blue", img: "img/gorra-turquesa.png", colorFondo: "#33a0e9", precio: 500 }
    // Cuando agregues las demás, solo ponle su precio: , precio: 350
];

// Configura aquí tu número de WhatsApp de ventas (Código de México '52' + tus 10 números)
const numeroTelefono = "520000000000"; 

const mainCap = document.querySelector('.main-cap');
const container = document.querySelector('.container');
const thumbContainer = document.querySelector('.thumb');
const tituloGorra = document.querySelector('#titulo-gorra');
const precioGorra = document.querySelector('#precio-gorra');
const btnComprar = document.querySelector('#btn-comprar');

function cargarMiniaturas() {
    thumbContainer.innerHTML = ""; 

    listaGorras.forEach(gorra => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${gorra.img}" alt="${gorra.nombre}">`;
        
        li.addEventListener('click', () => {
            cambiarProducto(gorra); // Pasamos todo el objeto de la gorra completa
        });

        thumbContainer.appendChild(li);
    });
}

function cambiarProducto(gorra) {
    mainCap.src = gorra.img;
    container.style.background = `radial-gradient(circle at center, ${gorra.colorFondo} 0%, #0a0a0a 100%)`;
    
    if(tituloGorra) tituloGorra.textContent = gorra.nombre;
    if(precioGorra) precioGorra.textContent = `$${gorra.precio}.00 MXN`;
    
    // TRUCO DE LA API DE WHATSAPP:
    // Creamos el mensaje reemplazando espacios con %20 para que internet lo entienda bien
    const mensajeBase = `Hola! Me interesa comprar la gorra *${gorra.nombre}* que vi en el catálogo web. Tiene un costo de $${gorra.precio}.00 MXN. ¿Sigue disponible?`;
    const mensajeEncriptado = encodeURIComponent(mensajeBase);
    
    // Le inyectamos el enlace final al botón de "Comprar esta"
    btnComprar.href = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${mensajeEncriptado}`;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMiniaturas();
    
    if(listaGorras.length > 0) {
        cambiarProducto(listaGorras[0]);
    }
});
