// traer los datos del localstorage
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || [];

listaProductos.forEach((producto)=>{ crearCard(producto)});

function crearCard(producto){
    let grilla = document.querySelector("#grillaPrincipal"); 
    grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
    <img src="${producto.url}" class="card-img-top" alt="${producto.producto}" />
    <div class="card-body">
      <h5 class="card-title">${producto.producto}</h5>
      <p class="card-text">
      ${producto.descripcion}
      </p>
    </div>
    </div>
  </div>`
}