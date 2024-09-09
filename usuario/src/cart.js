let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
function obtenerAlmacenamientoLocal(clave) {
  //Convierte la cadena de texto que recupera de localStorage de vuelta a su formato original y lo guarda en variable datos
  const datos = JSON.parse(localStorage.getItem(clave));
  return datos;
}
let productos = obtenerAlmacenamientoLocal("productos") || [];
let carrito = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cartIcon.innerHTML = carrito
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (carrito.length !== 0) {
    return (ShoppingCart.innerHTML = carrito
      .map((item) => {
        //let { id, item } = x;
        const producto = productos.find((x) => x.id === item.id);
        
        return `
      <div class="cart-item">
        <img width="90" src=${producto.imagen} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p class="cart-item-name">${producto.nombre}</p>
                <p class="cart-item-price">$ ${producto.valor}</p>
              </h4>
              <i onclick="removeItem(${producto.id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons-cart">
              <i onclick="decrement(${item.id})" class="bi bi-dash-lg"></i>
              <div id=${item.id} class="quantity">${item.item}</div>
              <i onclick="increment(${item.id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item.item * producto.valor}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="../index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(carrito));
};

let update = (id) => {
  let search = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};