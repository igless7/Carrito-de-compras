 
export const productos = [
  {
    id: 1,
    nombre: "Air Jordan 1 Low",
    precio: 115, // Corregido (antes era "valor")
    existencias: 9,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1fa458f5-efbb-48da-a668-7ec7da37154e/AIR+JORDAN+1+LOW.png",
  },
  {
    id: 2,
    nombre: 'Air Jordan 1 Low OG "Wolf Grey"',
    precio: 140,
    existencias: 15,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2723cf61-69b2-4ba7-b979-6b93d19afd53/AIR+JORDAN+1+RETRO+LOW+OG.png",
  },
  {
    id: 3,
    nombre: "Air Jordan 1 Low SE",
    precio: 455,
    existencias: 17,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/28ab012c-7c6d-4223-be61-644d3568b835/AIR+JORDAN+1+LOW+SE.png",
  },
  {
    id: 4,
    nombre: 'Air Jordan 1 High OG "Black and Gold"',
    precio: 140,
    existencias: 13,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9904a515-9702-4924-9f7f-7aa7377323bd/AIR+JORDAN+1+RETRO+HIGH+OG+GS.png",
  },
  {
    id: 5,
    nombre: "Air Jordan 1 Low SE Craft",
    precio: 110,
    existencias: 9,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/15144d1e-a84c-47a3-9098-ccb20708d83c/AIR+JORDAN+1+LOW+SE+CRAFT+%28GS%29.png",
  },
  {
    id: 6,
    nombre: "Nike Blazer Mid '77",
    precio: 105,
    existencias: 17,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7dcc6fd4-b41c-493e-85bd-58b8944b6b1d/W+BLAZER+MID+%2777.png",
  },
  {
    id: 7, 
    nombre: "Tatum 3",
    precio: 455,
    existencias: 7,
    imagen:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/55c97d23-da73-4d0a-af04-8ca5c40d9e84/JORDAN+TATUM+3.png",
  },
];
//boton abrir y cerrar de menu hamburguesa
// const button_cerrar = document.querySelector("#cerrar");
// const nav = document.querySelector("#nav");

// function abrirMenu() {
//   nav.classList.add("nav_visible");
// }

// button_cerrar.addEventListener("click", () => {
//   nav.classList.remove("nav_visible");
// });
// function guardarAlmacenamientoLocal(clave, dato) {
//   //JSON.stringify(): Convierte el 'dato' en una cadena de texto en formato JSON.
//   localStorage.setItem(clave, JSON.stringify(dato));
// }
// //Recupera un valor del localStorage usando la clave
// function obtenerAlmacenamientoLocal(clave) {
//   //Convierte la cadena de texto que recupera de localStorage de vuelta a su formato original y lo guarda en variable datos
//   const datos = JSON.parse(localStorage.getItem(clave));
//   return datos;
// }
const mostrarProductos = document.getElementById("mostrarProductos");

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
    if(productos[id-1].existencias > search.item){
      search.item += 1;
    } else {
      return;
    }
  }
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(carrito));
  calculation();
 
};
////funcion eliminar producto
let decrement = (id) => {
  let selectedItem = id;
  //Buscar si ya existe el producto en el carrito
  let search = carrito.find((x) => x.id == selectedItem);
  if (search.item === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItem);
  carrito = carrito.filter((x) => x.item !== 0);
  //console.log(carrito);
  localStorage.setItem("data", JSON.stringify(carrito));
  calculation();
};
console.log(localStorage.getItem("data"));
let update = (id) => {
  let search = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  
};
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};
window.addEventListener("load", () => {
  window.increment = increment;
  window.decrement = decrement;
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
      productos[i].precio
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
});