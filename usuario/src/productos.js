const productos = [
  {
    id: 1,
    nombre: "nike jordans",
    precio: 455,
    existencias: 7,
    imagen: "",
  },

  {
    id: 2,
    nombre: "nike jordans",
    precio: 455,
    existencias: 7,
    imagen: "",
  },
];

const mostrarProductos = document.getElementById("contenedor");

window.addEventListener("load", () => {
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
