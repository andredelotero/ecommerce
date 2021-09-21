class servicios{
    constructor (id, nombre, descripcion, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = "./img/" + imagen;
    }
}

const serviciosArr = [];

serviciosArr.push (new servicios(01, "Wireframe", "Basandonos en tus ideas, creamos una vista previa del sitio mediante programas de diseño.", 6500, "wireframe.svg"));
serviciosArr.push (new servicios(02, "Wireframe a html", "Si ya dispones de wireframes, convertimos esas ideas en un sitio real.", 9800, "wireframe_to_html.svg"));
serviciosArr.push (new servicios(03, "Responsive Design", "Adaptamos tu sitio para que se vea perfecto en dispositivos móviles", 12900, "responsive.svg"));
serviciosArr.push (new servicios(04, "Optimización del sitio", "Mejoramos los tiempos de carga del sitio mediante optimizaciones varias.", 10200, "optimizacion.svg"));
serviciosArr.push (new servicios(05, "Integración del staff", "Hacemos el puente de integración entre todos los miembros de tu proyecto.", 18200, "staff_integracion.svg"));
serviciosArr.push (new servicios(06, "Seguridad del sitio", "Agregado de certificado SSL y verificación de vulnerabilidades en scripts.", 14200, "seguridad.svg"));



function crear(){
    const padre = document.querySelector(".servicios");
    for (const serv of serviciosArr){
        let articulo = document.createElement("article");
        articulo.innerHTML=
            `<img src="${serv.imagen}"></img>
            <p class="titulo">${serv.nombre}</p>
            <p class="descripcion">${serv.descripcion}</p>
            <p class="precio">${serv.precio}</p>
            <p class="comprar" onclick="agregarAlCarrito()">agregar al carrito</p>`
        padre.appendChild(articulo)
}
}



let cantidadProductos=0;

function agregarAlCarrito(){
    const car = document.querySelector(".cantidad");
    if (cantidadProductos<1){
        car.classList.remove("noShow");
    }
    cantidadProductos++;
    car.style.animation= "sacudon 150ms";
    car.innerHTML = cantidadProductos;
    //localStorage.setItem("productosEnCarrito", JSON.stringify())
}


crear();