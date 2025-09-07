

function dibujoChecker(dibujo) {
   return new Promise((resolve, reject) => {
     
      if (dibujo.posicion > 1) {
         return reject(`Todavía no tenemos stock de esta pieza "${dibujo.nombre}", pero la podes encargar.`);
      }
      setTimeout(() => {
         resolve({
            dibujo,
            result: "Sí, la tenemos"
         });
      }, 1000);
   });
}
(dibujoChecker(1)).then(data => console.log(data))

const dibujosContainer = document.getElementById("dibujos-container"); 
const cartContainer = document.getElementById("cart-section");
const URL = "./db/data.json";


let cartDibujos = JSON.parse(localStorage.getItem("cartDibujos"));

function obtenerDibujos() {
   fetch(URL)
   .then(response => response.json())
   .then(data => {
      renderDibujos(data);
   })
   .catch(err => console.error("Error al cargar dibujos:", err))
   .finally(() => console.log("Fin de la petición"));
}

function renderDibujos(listaDibujos) {
   dibujosContainer.innerHTML = "";
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
      button.onclick = async (e) => {
         const dibujoId = e.currentTarget.id;
         const selectedDibujo = listaDibujos.find(dibujo => dibujo.id == dibujoId);
         if (selectedDibujo) {
            try {
               await dibujoChecker(selectedDibujo);
               cartDibujos.push(selectedDibujo);
               localStorage.setItem("cartDibujos", JSON.stringify(cartDibujos));
               renderCarrito(cartDibujos);
               Swal.fire({
                  icon: 'success',
                  title: 'Agregado al carrito',
                  text: `"${selectedDibujo.nombre}" fue agregado correctamente.`,
                  timer: 1500,
                  showConfirmButton: false
               });
            } catch (error) {
               Swal.fire({
                  icon: 'error',
                  title: 'Sin stock',
                  text: error,
               });
            }
         }
      }
   });
}


function renderCarrito(cartItems) {
   cartContainer.innerHTML = ""; 
   cartItems.forEach(dibujo => {
      const div = document.createElement("div");
      div.innerHTML = `
         <h4>${dibujo.nombre}</h4>
         <p>Precio: ${dibujo.precio}</p>
      `;
      cartContainer.appendChild(div);
   });
}

obtenerDibujos();
renderCarrito(cartDibujos);