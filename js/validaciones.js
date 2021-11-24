export function campoRequerido(input){
    if(input.value.trim().length > 0){
     //    console.log("paso la validacion")
        input.className = "form-control is-valid";
        return true;
    }else{
     //    console.log("no paso la validacion")
        input.className = "form-control is-invalid";
        return false
    }
 }
 
 export function validarNumeros(input){
      //crear una expresion regular
      let patron = /^[0-9]{1,3}$/;
      //probar el funcionamiento del patron o expresion regular
      if(patron.test(input.value)){
          //cumple la expresion regular
          input.className = "form-control is-valid";
          return true;
      }else{
          //si no cumple la expresion regular o patron
          input.className = "form-control is-invalid";
          return false;
      }
 }
 
 export function validarUrl(input){
     let patronUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
     if(patronUrl.test(input.value)){
         input.className = "form-control is-valid";
         return true;
     }else{
         input.className = "form-control is-invalid";
         return false;
     }
 }
 
 export function validarGeneral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoUrl){
     // console.log("aqui tengo que validar todo de nuevo");
     // volver a validar todos los campos
     // if( preguntar si el codigo es correcto && regunto si el producto es correcto)
     let alerta = document.querySelector("#msjAlerta");
     if(campoRequerido(campoCodigo) && campoRequerido(campoProducto) &&
     campoRequerido(campoDescripcion) &&
     validarNumeros(campoCantidad) &&
     validarUrl(campoUrl)){
         // console.log("si paso la validacion");
         alerta.className ="my-4 alert alert-danger d-none";
         return true;
     }else{
         // console.log("no paso la validacion");
         alerta.className ="my-4 alert alert-danger";
         return false;
     }
 }