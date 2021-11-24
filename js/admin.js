import {campoRequerido,validarNumeros,validarUrl,validarGeneral} from "./validaciones.js";
import {Producto} from "./productoClass.js";

// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoUrl = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");

// lista de productos
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || []; 


campoCodigo.addEventListener("blur", () =>{ campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", () =>{ campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", () =>{ campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoUrl.addEventListener("blur", ()=>{validarUrl(campoUrl)});
formularioProducto.addEventListener("submit",guardarProducto);

// llamar a la funcion cargaInicial
cargaInicial();

function guardarProducto(e){
    e.preventDefault()
    //validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto,campoDescripcion,campoCantidad,campoUrl)){
        // agregar o crear un producto
        crearProducto();
    }
    
}

function crearProducto(){
    console.log("aqui creo el producto")
    // crear el objeto producto
    let productoNuevo = new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoUrl.value);
    console.log(productoNuevo);
    // guardar el producto creado en el arreglo
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    // limpiar el formulario
    limpiarFormulario();
    // guardar en localStorage
    guardarLocalStorage();
    // mostrar un mensaje al usuario
    Swal.fire(
        'Producto creado',
        'Su producto fue correctamente creado!',
        'success'
      )
      // creo una nueva fila en la tabla
      crearFila(productoNuevo);
}

function limpiarFormulario(){
    // limpiar los value de todo el formulario
    formularioProducto.reset();
    // limpiar las clases
    campoCodigo.className = "form-control";
    campoProducto.className = "form-control";
    campoDescripcion.className = "form-control";
    campoCantidad.className = "form-control";
    campoUrl.className = "form-control";
}

function guardarLocalStorage(){
    localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto){
    let tabla = document.querySelector ("#tablaProductos");
    tabla.innerHTML += `<tr>
    <td>${producto.codigo}</td>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
      <button class="btn btn-danger" onclick="prepararEdicionProducto(${producto.codigo})">Editar</button>
      <button class="btn btn-warning">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial(){
    // si hay datos en localstorage o en listaproductos dibujo las filas
    if(listaProductos.length > 0){
        // dibujar fila
        listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)})
    }
}

function borrarTabla(){
    let tabla = document.querySelector ("#tablaProductos");
    tabla.innerHTML="";
}

window.prepararEdicionProducto = function(codigo){
    console.log(codigo)
    // obtener el objeto a modificar
    let productoBuscado = listaProductos.find((itemProducto)=>{return itemProducto.codigo == codigo})
    console.log(productoBuscado);
    //mostrar los datos en el form
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    campoUrl.value = productoBuscado.url;
}

