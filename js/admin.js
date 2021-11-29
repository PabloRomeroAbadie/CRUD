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
let productoExistente = false; // si productoExistente es = false quiero crear un producto, caso contrario quiero modificar
let btnAgregar = document.querySelector("#botonNuevo")


campoCodigo.addEventListener("blur", () =>{ campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", () =>{ campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", () =>{ campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoUrl.addEventListener("blur", ()=>{validarUrl(campoUrl)});
formularioProducto.addEventListener("submit",guardarProducto);
btnAgregar.addEventListener("click", limpiarFormulario);

// llamar a la funcion cargaInicial
cargaInicial();

function guardarProducto(e){
    e.preventDefault()
    //validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto,campoDescripcion,campoCantidad,campoUrl)){
        if(productoExistente == false){
            // caso 1:agregar o crear un producto
            crearProducto();
        }else{
            // caso 2: el usuario quiere editar un producto
            modificarProducto();
        }
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
    //limpiar la variable booleana
    productoExistente=false;
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
      <button class="btn btn-warning" onclick="borrarProducto(${producto.codigo})">Borrar</button>
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
    // aqui modifico la variable booleana
    productoExistente=true;
}

function modificarProducto(){
    console.log("aqui quiero modificar este producto");
    // buscar la posicion de mi producto dentro del arreglo
    let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value}
    );
    console.log(posicionProducto);
    // modificar los datos de ese producto dentro del arreglo
    listaProductos[posicionProducto].producto = campoProducto.value;
    listaProductos[posicionProducto].descripcion = campoDescripcion.value;
    listaProductos[posicionProducto].cantidad = campoCantidad.value;
    listaProductos[posicionProducto].url = campoUrl.value;
    console.log(listaProductos);
    // actualizar los datos del localstorage
    guardarLocalStorage();
    // mostrar un cartel de modificacion de producto
    Swal.fire(
        'Producto Modificado',
        'Su producto fue correctamente editado',
        'success'
      )
    // limpiar los datos del formulario
    limpiarFormulario();
    // actualizar la tabla
    borrarTabla();
    // dibujar tabla
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
}

window.borrarProducto = function(codigo){
    console.log(codigo);
    // borro el producto del arreglo (con splice o con el siguiente metodo)
    let arregloProductoBorrado = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo})
    console.log(arregloProductoBorrado)
    // actualizo los datos en localstorage
    listaProductos = arregloProductoBorrado;
    guardarLocalStorage();
    //actualizar los datos de la tabla (borrar y volver a dibujar)
    borrarTabla();
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
    // mostrar mensaje
    Swal.fire(
        'Producto eliminado',
        'Su producto fue correctamente eliminado del sistema',
        'success'
      );
}
