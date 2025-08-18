
// GALERÍA DE DIBUJOS

let ListaDeObras = [];
let idObra = 1;

// Función para agregar una obra a la galería
function agregarObra() {
    const titulo = document.getElementById("titulo").value;
    const tecnica = document.getElementById("tecnica").value;
    
    if (titulo && artista && tecnica) {
        document.getElementById("mensajeDeAlerta").innerText = "";
        ListaDeObras.push({ 
            id: idObra++, 
            titulo: titulo, 
            artista: artista, 
            tecnica: tecnica,
            valoracion: 0,
            visitas: 0
        });
        document.getElementById("formObra").reset();
    } else {
        document.getElementById("mensajeDeAlerta").innerText = "Por favor, completa todos los campos.";
        return;
    }
}

const botonAgregar = document.getElementById("agregarObra");
if (botonAgregar) {
    botonAgregar.onclick = () => {
        agregarObra();
        actualizarListaObras();
    }
}

// Función para eliminar todas las obras
function eliminarObras() {
    if (ListaDeObras.length === 0) {
        document.getElementById("mensajeDeAlerta").innerText = "No hay obras para eliminar.";
        return;
    }
    if (ListaDeObras.length >= 8) {
        localStorage.clear();
    }
    ListaDeObras = [];
    document.getElementById("formObra").reset();
    document.getElementById("mensajeDeAlerta").innerText = "Todas las obras han sido eliminadas.";
    
    const botonExposicion = document.getElementById("botonExposicion");
    if (botonExposicion) {
        formulario.removeChild(botonExposicion.parentElement);
    }
    
    if (botonAgregar && document.getElementById("borrarObras")) {
        formulario.insertBefore(botonAgregar, document.getElementById("borrarObras"));
    }
    
    actualizarListaObras();
}

const botonEliminar = document.getElementById("borrarObras");
if (botonEliminar) {
    botonEliminar.onclick = () => {
        eliminarObras();
    }
}

let formulario = document.getElementById("formObra");
let tituloObrasRegistradas = document.getElementById("tituloObrasRegistradas");
let listaDeObras = document.getElementById("listaObras");

// Función para actualizar la lista de obras
if (tituloObrasRegistradas) {
    function actualizarListaObras() {
        listaDeObras.textContent = "";
        
        ListaDeObras.forEach(obra => {
            let divObra = document.createElement("div");
            divObra.className = "obra-card";
            
            let titulo = document.createElement("h3");
            titulo.textContent = obra.titulo;
            
            let artista = document.createElement("p");
            artista.textContent = `Artista: ${obra.artista}`;
            
            let tecnica = document.createElement("p");
            tecnica.textContent = `Técnica: ${obra.tecnica}`;
            
            divObra.appendChild(titulo);
            divObra.appendChild(artista);
            divObra.appendChild(tecnica);
            
            let imgObra = document.createElement("img");
            imgObra.src = "https://placehold.co/300x200";
            imgObra.alt = `Obra "${obra.titulo}" por ${obra.artista}, técnica: ${obra.tecnica}`;
            imgObra.className = "obra-img";
            divObra.appendChild(imgObra);
            
            
            let btnValorar = document.createElement("button");
            btnValorar.textContent = "Valorar obra";
            btnValorar.onclick = () => valorarObra(obra.id);
            divObra.appendChild(btnValorar);
            
            let stats = document.createElement("p");
            stats.textContent = `Visitas: ${obra.visitas} | Valoración: ${obra.valoracion}`;
            divObra.appendChild(stats);
            
            listaDeObras.appendChild(divObra);
        });
        
        tituloObrasRegistradas.textContent = `Obras en Galería: ${ListaDeObras.length}`;
        
        if (ListaDeObras.length >= 8) {
            tituloObrasRegistradas.textContent += " - Exposición lista";
            
            let anchorBotonExposicion = document.createElement("a");
            anchorBotonExposicion.href = "./pages/exposicion.html";
            formulario.appendChild(anchorBotonExposicion);
            
            let botonExposicion = document.createElement("button");
            botonExposicion.id = "botonExposicion";
            botonExposicion.textContent = "Iniciar Exposición";
            botonExposicion.type = "button";
            anchorBotonExposicion.appendChild(botonExposicion);
            
            if (botonAgregar) {
                formulario.removeChild(botonAgregar);
            }
            
            ListaDeObras.sort((a, b) => a.id - b.id);
            localStorage.setItem("obras", JSON.stringify(ListaDeObras));
        }
    }
    
    // C
    const tecnicas = ["Lapiz", "Acuarela", "Acrílico", "Digital"];
    for (let i = 1; i <= 7; i++) {
        ListaDeObras.push({
            id: i,
            titulo: `Obra maestra ${i}`,
            artista: `Artista ${i}`,
            tecnica: tecnicas[i % tecnicas.length],
            valoracion: Math.floor(Math.random() * 5) + 1,
            visitas: Math.floor(Math.random() * 100)
        });
    }
    actualizarListaObras();
}

// Función para calificar
function valorarObra(id) {
    const obra = ListaDeObras.find(o => o.id === id);
    if (obra) {
        obra.valoracion += 1;
        obra.visitas += 1;
        actualizarListaObras();
    }
}


const obrasEnExposicion = JSON.parse(localStorage.getItem('obras'));
let container_exposicion = document.getElementById("container_exposicion");
let contenedorObras = document.getElementById("contenedorObras");

if (container_exposicion && obrasEnExposicion && contenedorObras) {
    obrasEnExposicion.forEach(obra => {
        let divObra = document.createElement("div");
        divObra.className = "obra-exposicion";
        
        let titulo = document.createElement("h3");
        titulo.textContent = obra.titulo;
        
        let artista = document.createElement("p");
        artista.textContent = `Artista: ${obra.artista}`;
        
        let tecnica = document.createElement("p");
        tecnica.textContent = `Técnica: ${obra.tecnica}`;
        
        let imgObra = document.createElement("img");
        imgObra.src = "https://placehold.co/400x300";
        imgObra.alt = `Obra "${obra.titulo}" en exposición`;
        imgObra.className = "obra-exposicion-img";
        
        let formValoracion = document.createElement("div");
        let labelValoracion = document.createElement("label");
        labelValoracion.textContent = "Valoración (1-5):";
        
        let inputValoracion = document.createElement("input");
        inputValoracion.type = "number";
        inputValoracion.min = 1;
        inputValoracion.max = 5;
        inputValoracion.id = `valoracion-${obra.id}`;
        
        let btnEnviarValoracion = document.createElement("button");
        btnEnviarValoracion.textContent = "Enviar valoración";
        btnEnviarValoracion.onclick = () => {
            const valor = parseInt(document.getElementById(`valoracion-${obra.id}`).value);
            if (valor >= 1 && valor <= 5) {
                obra.valoracion += valor;
                obra.visitas += 1;
                alert(`¡Gracias por valorar "${obra.titulo}"!`);
            }
        };
        
        formValoracion.appendChild(labelValoracion);
        formValoracion.appendChild(inputValoracion);
        formValoracion.appendChild(btnEnviarValoracion);
        
        divObra.appendChild(titulo);
        divObra.appendChild(artista);
        divObra.appendChild(tecnica);
        divObra.appendChild(imgObra);
        divObra.appendChild(formValoracion);
        
        contenedorObras.appendChild(divObra);
    });

    // Botón finalizar y mostrar ranking
    let botonFinalizarExposicion = document.getElementById("terminarExposicion");
    if (botonFinalizarExposicion) {
        botonFinalizarExposicion.onclick = () => {
    
            obrasEnExposicion.sort((a, b) => {
                if (b.valoracion === a.valoracion) {
                    return b.visitas - a.visitas;
                }
                return b.valoracion - a.valoracion;
            });

            // Aca hay masomenos lo que seria un rankin de los dibujos mas vendidos
            let contenedorResultados = document.getElementById("contenedorResultadosExposicion");
            contenedorResultados.textContent = "";
            
            let tituloRanking = document.createElement("h2");
            tituloRanking.textContent = "Ranking de Obras más Valoradas";
            contenedorResultados.appendChild(tituloRanking);
            
            obrasEnExposicion.forEach((obra, index) => {
                let divResultado = document.createElement("div");
                divResultado.className = "resultado-obra";
                
                let puesto = document.createElement("h3");
                puesto.textContent = `${index + 1}° Puesto`;
                
                let infoObra = document.createElement("p");
                infoObra.textContent = `"${obra.titulo}" - ${obra.artista} (Valoración: ${obra.valoracion}, Visitas: ${obra.visitas})`;
                
                divResultado.appendChild(puesto);
                divResultado.appendChild(infoObra);
                
                contenedorResultados.appendChild(divResultado);
            });
        };
    }
}
