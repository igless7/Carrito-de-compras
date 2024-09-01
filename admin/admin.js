
//document.addEventListener("DOMContentLoaded", function () {
  //Guardar datos en localStorage
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

  //busca en el localStorage el valor asociado a la clave 'productos', Si no existe, se inicializa como un array vacío.
  let productos = obtenerAlmacenamientoLocal("productos") || [];
  //Agregar
  btnAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    
    //Obtener el valor de los inputs using destructuring assignment to extract the values from the input elements
    const { value: productoAgregar } =
      document.querySelector("#productoAgregar");
    const { value: valorAgregar } = document.querySelector("#valorAgregar");
    const { value: existenciasAgregar } = document.querySelector(
      "#existenciasAgregar"
    );
    const { value: imagenAgregar } = document.querySelector("#imagenAgregar");

    let warning = true;
    //Si algun input esta vacia arrojamos un mensaje de error
    if (
      productoAgregar == "" ||
      valorAgregar == "" ||
      existenciasAgregar == "" ||
      imagenAgregar == ""
    ) {
      mensaje.classList.add("llenarCampos");
      //Despues de 2 seg quitamos el mensaje
      setTimeout(() => {
        mensaje.classList.remove("llenarCampos");
      }, 2500);
      warning = false;
    } else {
      productos.forEach((producto) => {
        if (producto.nombre == productoAgregar) {
          mensaje.classList.add("repetidoError");
          setTimeout(() => {
            mensaje.classList.remove("repetidoError");
          }, 2500);
          warning = false;
        }
      });
    }
    //Si no hay errores se agrega el producto y se muestra mensaje de realizado
    if (warning == true) {
      const id = productos.length + 1;
      productos.push({
        id: id,
        nombre: productoAgregar,
        valor: valorAgregar,
        existencias: existenciasAgregar,
        imagen: imagenAgregar,
      });
      mensaje.classList.add("realizado");
      setTimeout(() => {
        mensaje.classList.remove("realizado");
        //Recarga la pagina despues de 1.5 segs
        window.location.reload();
      }, 1500);
    }
    //se guarda los datos
    guardarAlmacenamientoLocal("productos", productos);
  });

  //Editar
  btnEditar.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(7);
    //Guardar valor
    const { value: productoEditar } = document.querySelector("#productoEditar");
    const { value: atributoEditar } = document.querySelector("#atributoEditar");
    const { value: nuevoAtributo } = document.querySelector("#nuevoAtributo");
    let van = false;
    //Verifica si algun valor esta vacio
    if (productoEditar == "" || atributoEditar == "" || nuevoAtributo == "") {
      mensaje.classList.add("llenarCampos");
      setTimeout(() => {
        mensaje.classList.remove("llenarCampos");
      }, 2500);
    } else {
      for (let i = 0; i < productos.length; i++) {
        //Verificar si el nombre del producto es igual al que se desea editar
        if (productos[i].nombre == productoEditar) {
          productos[i][atributoEditar] = nuevoAtributo;
          van = true;
        }
      }
    }
    if (van == true) {
      mensaje.classList.add("realizado");
      setTimeout(() => {
        mensaje.classList.remove("realizado");
        window.location.reload();
      }, 1500);
    } else {
      mensaje.classList.add("noExisteError");
      setTimeout(() => {
        mensaje.classList.remove("noExsiteError");
      }, 2500);
    }
    guardarAlmacenamientoLocal("productos", productos);
  });

  // Eliminar
  const productoE = document.getElementById("productoEliminar");

  document
    .getElementById("botonEliminar")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let productoEliminar = productoE.value;
      let van = false;

      for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == productoEliminar) {
          productos.splice(i, 1);
          van = true;
        }
      }

      if (van == false) {
        mensaje.classList.add("noExsiteError");
        setTimeout(() => {
          mensaje.classList.remove("noExsiteError");
        }, 2500);
      } else {
        mensaje.classList.add("realizado");
        setTimeout(() => {
          mensaje.classList.remove("realizado");
          window.location.reload();
        }, 1500);
      }
      guardarAlmacenamientoLocal("productos", productos);
    });


//})
    // mostrar productos
window.addEventListener("load", () => {
  const productoEd = document.getElementById("productoEditar");
  const productoEl = document.getElementById("productoEliminar");
  for (let i = 0; i < productos.length; i++) {
    productoEd.innerHTML += `<option>${productos[i].nombre}</option>`;
    productoEl.innerHTML += `<option>${productos[i].nombre}</option>`;
  }
  Object.keys(productos[0]).forEach((element) => {
    atributoEditar.innerHTML += `<option>${element}</option>`;
  });

  let mostrarProductos = document.getElementById("mostrarProductos");
  mostrarProductos.innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    
    mostrarProductos.innerHTML += `<div class="contenedorProducto"><img src="${productos[i].imagen}"  class="imagen-producto"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: $${productos[i].valor}</span></p> Existencia: ${productos[i].existencias}<p></p></div></div>`;
  }
});