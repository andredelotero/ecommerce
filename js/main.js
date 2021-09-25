class servicios{
    constructor (id, nombre, descripcion, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = "./img/" + imagen;
        this.cantidadComprada = 0;
    }
}

//leer localstorage cuando se abre la pagina
let serviciosArr=JSON.parse(localStorage.getItem("arrayProductos")) || [];
let carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage")) || []; 
let cantidadProductos = 0;
if(JSON.parse(localStorage.getItem("productosEnStorage"))){
    cantidadProductos = JSON.parse(localStorage.getItem("productosEnStorage")).length;
}

// mostrar - ocultar contenido del carrito
cart.addEventListener("click", function(){

if (cart__contenido.style.display!="flex"){
    cart__contenido.style.display="flex"
}
else{
    cart__contenido.style.display="none";
}
});


//vaciar el carrito
function borrarLocalStorage(){
    localStorage.clear(); 
    renderCarrito();
    cantidadProductos=0;
    carritoEnStorage=[];
    serviciosArr=[];
    car.classList.add("noShow");
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    crearCardServicio();
    crearArrayProductos();
}

//agregar el eventListener al boton de limpiar
clear__localStorage.addEventListener("click", borrarLocalStorage);

//crear el array de productos
function crearArrayProductos(){
    if(serviciosArr.length==0){
        serviciosArr.push (new servicios(0, "Wireframe", "Basandonos en tus ideas, creamos una vista previa del sitio mediante programas de diseño.", 6500, "wireframe.svg"));
        serviciosArr.push (new servicios(1, "Wireframe a html", "Si ya dispones de wireframes, convertimos esas ideas en un sitio real.", 9800, "wireframe_to_html.svg"));
        serviciosArr.push (new servicios(2, "Responsive Design", "Adaptamos tu sitio para que se vea perfecto en dispositivos móviles", 12900, "responsive.svg"));
        serviciosArr.push (new servicios(3, "Optimización del sitio", "Mejoramos los tiempos de carga del sitio mediante optimizaciones varias.", 10200, "optimizacion.svg"));
        serviciosArr.push (new servicios(4, "Integración del staff", "Hacemos el puente de integración entre todos los miembros de tu proyecto.", 18200, "staff_integracion.svg"));
        serviciosArr.push (new servicios(5, "Seguridad del sitio", "Agregado de certificado SSL y verificación de vulnerabilidades en scripts.", 14200, "seguridad.svg"));
        localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    }
}

//crear las cards de los servicios
function crearCardServicio(){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"))||0;
    const padre = document.querySelector(".servicios");
    for (const serv of serviciosArr){
        let articulo = document.createElement("article");
        articulo.innerHTML=
            `<img src="${serv.imagen}"></img>
            <p class="titulo">${serv.nombre}</p>
            <p class="descripcion">${serv.descripcion}</p>
            <p class="precio">${serv.precio}</p>
            <p class="comprar" onclick="agregarAlCarrito(${serv.id})">agregar al carrito</p>`
            padre.appendChild(articulo);
            
        }
    if (cantidadProductos>0){
        car.classList.remove("noShow");
        car.innerHTML = cantidadProductos;
    }
}

//eliminar un elemento del carrito
function eliminar(idABorrar){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"));
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"));
    serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
    let aBorrar = carritoEnStorage.findIndex((el)=>el.id==idABorrar);
    let aBorrarEnArray = serviciosArr.findIndex((el)=>el.id==idABorrar);
    cantidadProductos -= carritoEnStorage[aBorrar].cantidadComprada;
    carritoEnStorage[aBorrar].cantidadComprada = 0;
    serviciosArr[aBorrarEnArray].cantidadComprada=0;
    carritoEnStorage = carritoEnStorage.filter((el)=>el.id!=idABorrar);
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    car.innerHTML = cantidadProductos;
    if (cantidadProductos<1){
        car.classList.add("noShow");
    }
    renderCarrito();
}

//renderizar el contenido del carrito
function renderCarrito(){
    let valorTotal=0;
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"))||[]; 
    if (cantidadProductos>0){
        wraper__cta.style.display="flex";
        wraper__titles.style.display="flex";
    }
    if (carritoEnStorage.length>0){
        padreCarrito.innerHTML="";
    for (let i of carritoEnStorage){
        
        let art = document.createElement("article");
        let precioParcial = i.precio * i.cantidadComprada;
        valorTotal+=precioParcial;
        art.innerHTML =
        `   
        <img src="${i.imagen}" alt="">  
        <p class="nombre">${i.nombre}</p>
        <p class="precio">${i.precio}</p>
        <p class="cantidad">${i.cantidadComprada}</p>
        <p>${precioParcial}</p>
        <p class="eliminar" onclick="eliminar(${i.id})">X</p>
        `
        padreCarrito.appendChild(art);
       
    }
    let artTotal = document.createElement("article");
    artTotal.innerHTML=
    `
   
    <p class="cantidad">Cantidad de productos: ${cantidadProductos}</p>
    <p>Valor total: ${valorTotal}</p>
    `
    padreCarrito.appendChild(artTotal);
    
        }
        else{
            padreCarrito.innerHTML="Carrito Vacio";
            wraper__cta.style.display="none";
            wraper__titles.style.display="none";
            
            setTimeout(()=>cart__contenido.style.display="none",1500);
            
        }
}

//agregar el producto seleccionado al carrito
function agregarAlCarrito(id){
    serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
    const el = serviciosArr.findIndex(j => j.id == id);
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"))||0;
    cantidadProductos++;
    if (cantidadProductos==1){
        car.classList.remove("noShow");
    }
    if (cantidadProductos>0){
        wraper__cta.style.display="flex";
        wraper__titles.style.display="flex";
    }
    car.classList.add("animSacudon");
    setTimeout(()=>car.classList.remove("animSacudon"),300);
    let duplicado = carritoEnStorage.find(buscado => buscado.id == serviciosArr[el].id);
    if (!duplicado){
    carritoEnStorage.push(serviciosArr[el]);
    serviciosArr[el].cantidadComprada++;
    }
    else{
        let donde =  carritoEnStorage.findIndex(where => where.id === serviciosArr[el].id);
        serviciosArr[el].cantidadComprada++;
        carritoEnStorage[donde].cantidadComprada++;
    }
    car.innerHTML = cantidadProductos;
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    renderCarrito();
}

//inicializar
crearArrayProductos();
crearCardServicio();
renderCarrito();
