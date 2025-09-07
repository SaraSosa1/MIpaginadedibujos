

const dibujosContainer = document.getElementById("dibujos-container"); 
cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-section") 
let cartDibujos = JSON.parse(localStorage.getItem("cartDibujos")) 



function renderDibujos(listaDibujos) {
   
   listaDibujos.forEach(dibujo => {
      const card = document.createElement("div");
      card.innerHTML = `
         <h3>${dibujo.nombre}</h3>
         <p>Precio: ${dibujo.precio}</p>
         <button class="dibujoAgregar" id="${dibujo.id}">Agregar</button>
      `;
      dibujosContainer.appendChild(card);
   });
   agregarAlCarrito(listaDibujos);
}

function agregarAlCarrito(listaDibujos) {
   const addButtons = document.querySelectorAll(".dibujoAgregar");
   addButtons.forEach(button => {
      button.onclick = (e) => {
         const dibujoId = e.currentTarget.id;
         const selectedDibujo = listaDibujos.find(dibujo => dibujo.id == dibujoId);
         if (selectedDibujo) {
            cartDibujos.push(selectedDibujo);
            localStorage.setItem("cartDibujos", JSON.stringify(cartDibujos));
            renderCarrito(cartDibujos); 
         }
      }
   });
}

function renderCarrito(cartItems) {
   (document.getElementById("cart-section"))
   cartItems.forEach(dibujo => {
      const cart = document.createElement("div");
      cart.innerHTML = `
         <h3>${dibujo.nombre}</h3>
         <p>Precio: ${dibujo.precio}</p>
      `;
      (document.getElementById("cart-section")).appendChild(cart);
   });
}


renderCarrito(cartDibujos);


obtenerDibujos();

function agregarAlCarrito(listaDibujos) {
   const addButtons = document.querySelectorAll(".dibujoAgregar");
   addButtons.forEach(button => {
      button.onclick = (e) => {
         const dibujoId = e.currentTarget.id;
         const selectedDibujo = listaDibujos.find(dibujo => dibujo.id == dibujoId);
         if (selectedDibujo) {
            Swal.fire({
               title: "¿Desea finalizar la compra?",
               showDenyButton: true,
               showCancelButton: true,
               confirmButtonText: "Si",
               denyButtonText: `No`
            }).then((result) => {
               if (result.isConfirmed) {
                  cartDibujos.push(selectedDibujo);
                  localStorage.setItem("cartDibujos", JSON.stringify(cartDibujos));
                  renderCarrito(cartDibujos);
                  Swal.fire("Compra confirmada", "", "success");
               } else if (result.isDenied) {
                  Swal.fire("Compra cancelada, podes seguir eligiendo ( ;", "", "info");
               }
            });
         }
      }
   });
}