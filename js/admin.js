function campoRequerido(input){
   if(input.value.trim().length > 0){
       console.log("paso la validacion")
   }else{
       console.log("no paso la validacion")
   }
}

// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector("#codigo")

campoCodigo.addEventListener("blur", () =>{ campoRequerido(campoCodigo)});
