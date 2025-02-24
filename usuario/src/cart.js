import { productos } from "./productos.js";
// Referencias a elementos del DOM
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let totalCart = document.getElementById("total-cart");
let facturaBtn = document.getElementById("factura-btn");

// Obtener datos del carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("data")) || [];
console.log(carrito);

// Función para calcular la cantidad total de productos en el carrito
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

// Generar los elementos del carrito en la interfaz
let generateCartItems = () => {
  if (carrito.length !== 0) {
    ShoppingCart.innerHTML = carrito
      .map((item) => {
        const producto = productos.find((x) => x.id === item.id);
        return `
          <div class="cart-item">
            <img width="90" src=${producto.imagen} alt="" />
            <div class="details">

              <div class="title-price-x">
                  <h4 class="title-price">
                    <p class="cart-item-name">${producto.nombre}</p>
                    <p class="cart-item-price">Precio unitario: $ ${
                      producto.precio
                    }</p>
                  </h4>
                  <i onclick="removeItem(${
                    producto.id
                  })" class="bi bi-x-lg"></i>
              </div>

              <div class="buttons-cart">
                  <i onclick="decrementCart(${
                    item.id
                  })" class="bi bi-dash-lg"></i>
                  <div id=${item.id} class="quantity">${item.item}</div>
                  <i onclick="incrementCart(${
                    item.id
                  })" class="bi bi-plus-lg"></i>
              </div>

              <h3 id="precio-item">$ ${item.item * producto.precio}</h3>
            </div>
          </div>
        `;
      })
      .join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>El carrito está vacío</h2>
      <a href="../index.html">
        <button class="HomeBtn">Volver a la tienda</button>
      </a>
    `;
  }
};
generateCartItems();

// Función para actualizar la cantidad de un producto en la interfaz
let updateCart = (id) => {
  let search = carrito.find((x) => x.id === id);
  if (!search) return;
  document.getElementById(id).innerHTML = search.item;
  calculation();
  generateCartItems();
  generateTotal();
};

// Función para calcular el total del carrito
let generateTotal = () => {
  let total = carrito.reduce(
    (acc, x) => acc + x.item * productos[x.id - 1].precio,
    0
  );
  totalCart.innerHTML = `<h3>Total: $ ${total}</h3>`;
};
generateTotal();

// Función para incrementar la cantidad de un producto en el carrito
window.incrementCart = (id) => {
  let search = carrito.find((x) => x.id == id);
  if (!search) {
    carrito.push({ id: id, item: 1 });
  } else {
    if (productos[id - 1].existencias > search.item) {
      search.item += 1;
    } else {
      return;
    }
  }
  updateCart(id);
  localStorage.setItem("data", JSON.stringify(carrito));
  updateFactura();
};

// Función para decrementar la cantidad de un producto en el carrito
window.decrementCart = (id) => {
  let search = carrito.find((x) => x.id == id);
  if (!search || search.item === 0) return;
  search.item -= 1;
  carrito = carrito.filter((x) => x.item !== 0);
  updateCart(id);
  localStorage.setItem("data", JSON.stringify(carrito));
  updateFactura();
};

// Función para eliminar un producto del carrito
window.removeItem = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("data", JSON.stringify(carrito));
  generateCartItems();
  calculation();
  generateTotal();
  updateFactura();
};
function removeFactura() {
  const facturaContainer = document.getElementById("factura");
  if (facturaContainer) {
    facturaContainer.remove();
  }
}

//Funcion para actualizar factura
function updateFactura() {
  const facturaContainer = document.getElementById("factura");
  if (facturaContainer) {
    generarFactura();
  }
}
//Función para generar factura
function generarFactura(event) {
  if (carrito.length === 0) {
    alert(
      "El carrito está vacío. Agrega productos antes de generar la factura."
    );
    return;
  }
  // Elimina la factura previa si existe
  removeFactura();

  const facturaContainer = document.createElement("div");
  facturaContainer.id = "factura";
  facturaContainer.className = "factura";

  let facturaHTML = `
    
      <div class="company-header">
      <h2 class="company-name">Lou Boutin</h2>
      <i id="cerrarFactura" class="bi bi-x-lg"></i>
      </div>
      <p class="invoice-details"><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
      <table class="product-table" border="1" width="100%">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
  `;

  let total = 0;
  carrito.forEach((item) => {
    let producto = productos.find((p) => p.id === item.id);
    let subtotal = item.item * producto.precio;
    total += subtotal;

    facturaHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${item.item}</td>
        <td>$${producto.precio}</td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  facturaHTML += `
        </tbody>
      </table>
      <div class="total-container">
      <h3 class="monto-total">Total a pagar: $${total.toFixed(2)}</h3>
      </div>
      <div class="action-buttons">
      <button class="button btn-imprimir" onclick="imprimirFactura()">Imprimir Factura</button>
      <button id = "btn-descargar" class="button btn-descargar" ">Descargar PDF</button>
      </div>
    
  `;
  // Asignamos el contenido a facturaContainer
  facturaContainer.innerHTML = facturaHTML;

  // Agregamos la factura al body
  document.body.appendChild(facturaContainer);

  // Agregar evento al botón de cerrar
  document
    .getElementById("cerrarFactura")
    .addEventListener("click", removeFactura);

  document
    .getElementById("btn-descargar")
    .addEventListener("click", descargarFacturaPDF);
  // Smooth scroll to the invoice with offset for fixed header
  const btn = event.currentTarget; // Get the clicked button from event 
  const headerHeight = document.querySelector("header").offsetHeight;

  // Calculate scroll position
  const btnPosition = btn.getBoundingClientRect().top + window.pageYOffset;
  const scrollToPosition = btnPosition - headerHeight - 20; // 20px spacing

  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth",
  });
}

facturaBtn.addEventListener("click", function (event) {
  generarFactura(event); // Pass the event object
});
// Función para descargar la factura como PDF

async function descargarFacturaPDF() {
  try {
    const originalInvoice = document.getElementById("factura");
    if (!originalInvoice) {
      alert("Primero genera la factura antes de descargar");
      return;
    }

    // Create clean clone and modify
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-9999px";
    document.body.appendChild(tempContainer);

    const invoiceClone = originalInvoice.cloneNode(true);
    tempContainer.appendChild(invoiceClone);

    // Remove interactive elements
    invoiceClone
      .querySelectorAll("#cerrarFactura, .action-buttons")
      .forEach((el) => el.remove());

    // Apply PDF-specific styling
    invoiceClone.classList.add("pdf-version");
    invoiceClone.style.width = originalInvoice.offsetWidth + "px";

    // Capture HTML as image
    const canvas = await html2canvas(invoiceClone, {
      logging: true,
      useCORS: true,
      scale: 2,
      allowTaint: true,
    });

    // Cleanup temporary elements
    tempContainer.remove();

    // PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    doc.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      imgWidth,
      imgHeight
    );

    // Add page breaks if needed
    if (imgHeight > pageHeight) {
      doc.addPage();
      doc.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        -((pageHeight * canvas.width) / imgWidth),
        imgWidth,
        imgHeight
      );
    }

    doc.save(`factura_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error al generar el PDF: " + error.message);
  }
}

// Función para imprimir la factura
window.imprimirFactura = () => {
  let factura = document.getElementById("factura");
  if (!factura) {
    alert("No hay una factura para imprimir.");
    return;
  }

  // Clonar la factura para modificarla sin afectar la original
  let facturaClone = factura.cloneNode(true);

  // Eliminar botones y elementos no deseados
  let elementosAEliminar = facturaClone.querySelectorAll(
    ".action-buttons, #cerrarFactura"
  );
  elementosAEliminar.forEach((el) => el.remove());

  // Crear una nueva ventana para imprimir solo la factura
  let ventana = window.open("", "", "width=800,height=600");

  // Escribir solo el contenido de la factura en la ventana de impresión
  ventana.document.write(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin: 20px; }
          .company-header { font-size: 20px; font-weight: bold; margin-bottom: 10px; }
          .invoice-details { margin-bottom: 10px; }
          .product-table { width: 100%; border-collapse: collapse; }
          .product-table th, .product-table td { border: 1px solid #000; padding: 8px; text-align: left; }
          .total-container { margin-top: 20px; font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        ${facturaClone.innerHTML}
      </body>
    </html>
  `);

  // Imprimir la ventana
    ventana.print();
    ventana.close();
  
};