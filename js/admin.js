import {campoRequerido,validarNumeros,validarUrl,validarGeneral} from "./validaciones.js";
import {Producto} from "./productoClass.js";

// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoUrl = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");


campoCodigo.addEventListener("blur", () =>{ campoRequerido(campoCodigo)});
campoProducto.addEventListener("blur", () =>{ campoRequerido(campoProducto)});
campoDescripcion.addEventListener("blur", () =>{ campoRequerido(campoDescripcion)});
campoCantidad.addEventListener("blur", ()=>{validarNumeros(campoCantidad)});
campoUrl.addEventListener("blur", ()=>{validarUrl(campoUrl)});
formularioProducto.addEventListener("submit",guardarProducto);

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

}