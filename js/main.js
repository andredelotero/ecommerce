class servicio{
    constructor(id, nombre, descripcion, valor, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.valor = valor;
        this.imagen = "../img"+imagen;
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
}