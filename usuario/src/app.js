//boton abrir y cerrar de menu hamburguesa
const button_cerrar = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");

function abrirMenu(){
    
    nav.classList.add("nav_visible");
}

button_cerrar.addEventListener("click", () =>{
    nav.classList.remove("nav_visible");
})

    function guardarAlmacenamientoLocal(clave, dato) {
      //JSON.stringify(): Convierte el 'dato' en una cadena de texto en formato JSON.
      localStorage.setItem(clave, JSON.stringify(dato));
    }
    //Recupera un valor del localStorage usando la clave
    function obtenerAlmacenamientoLocal(clave) {
      //Convierte la cadena de texto que recupera de localStorage de vuelta a su formato original y lo guarda en variable datos
      const datos = JSON.parse(localStorage.getItem(clave));
      return datos;
    }
    let productos = obtenerAlmacenamientoLocal("productos") || [];
    const mostrarProductos = document.getElementById("contenedor");

    let carrito = JSON.parse(localStorage.getItem("data")) || [];
        //funcion agregar producto
        let increment = (id) => {
          let selectedItem = id;
          //Buscar si ya existe el producto en el carrito
          let search = carrito.find((x) => x.id == selectedItem);
          if (search === undefined) {
            carrito.push({
              id: selectedItem,
              item: 1,
            });
          } else {
            search.item += 1;
          }
          //console.log(carrito);
          update(selectedItem);
           localStorage.setItem("data", JSON.stringify(carrito));
        }
        
        ////funcion eliminar producto
        let decrement = (id) => {
          let selectedItem = id;
          //Buscar si ya existe el producto en el carrito
          let search = carrito.find((x) => x.id == selectedItem);
          if(search.item === undefined) return;
          else if (search.item === 0) {
           return
          } else {
            search.item -= 1;
          }
          update(selectedItem);
          carrito = carrito.filter((x) => x.item !== 0);
          //console.log(carrito);
          localStorage.setItem("data", JSON.stringify(carrito));
          }

          let update = (id) => {
            let search = carrito.find((x) => x.id === id);
            document.getElementById(id).innerHTML = search.item;
            calculation()
          }
          let calculation = () => {
            let cartIcon = document.getElementById("cartAmount");
            cartIcon.innerHTML = cartIcon.innerHTML = carrito
              .map((x) => x.item)
              .reduce((x, y) => x + y, 0);;
          }
    window.addEventListener('load', () => {
        let mostrarProductos = document.getElementById("mostrarProductos");
        calculation();
        mostrarProductos.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
          let search = carrito.find((x) => x.id === productos[i].id) || [];
          console.log(productos[i]);
          mostrarProductos.innerHTML += `<div class="contenedorProducto"><img src="${
            productos[i].imagen
          }"  class="imagen-producto"><div class="informacion"><p>${
            productos[i].nombre
          }</p> Existencias: ${
            productos[i].existencias
          }<p class="precio"><span>Precio: $${
            productos[i].valor
          }</span></p><div class="buttons">
              <i onclick="decrement(${
                productos[i].id
              })" class="bi bi-dash-lg"></i>
              <div id=${productos[i].id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${productos[i].id})" id="increment-${
            productos[i].id
          }" class="bi bi-plus-lg"></i>
            </div>`;
        }
        
        
    })
    function visualizarproductos(){

    }
