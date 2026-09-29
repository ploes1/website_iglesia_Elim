document.addEventListener("DOMContentLoaded", () => {
  // --- CONTROLADOR DEL MENÚ HAMBURGUESA DERECHO ---
  const btnMenu = document.getElementById("btn-menu");
  const drawerCerrar = document.getElementById("drawer-cerrar");
  const menuDrawer = document.getElementById("menu-drawer");
  const menuOverlay = document.getElementById("menu-overlay");

  if (btnMenu && menuDrawer && menuOverlay) {
    const abrirMenu = () => {
      btnMenu.classList.add("abierto");
      btnMenu.setAttribute("aria-expanded", "true");
      menuDrawer.classList.add("activo");
      menuOverlay.classList.add("activo");
      document.body.classList.add("menu-abierto");
    };

    const cerrarMenu = () => {
      btnMenu.classList.remove("abierto");
      btnMenu.setAttribute("aria-expanded", "false");
      menuDrawer.classList.remove("activo");
      menuOverlay.classList.remove("activo");
      document.body.classList.remove("menu-abierto");
    };

    btnMenu.addEventListener("click", () => {
      const estaAbierto = menuDrawer.classList.contains("activo");
      if (estaAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    if (drawerCerrar) drawerCerrar.addEventListener("click", cerrarMenu);
    menuOverlay.addEventListener("click", cerrarMenu);

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuDrawer.classList.contains("activo")) {
        cerrarMenu();
      }
    });

    // Cerrar al hacer clic en cualquier enlace dentro del menú
    menuDrawer.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", cerrarMenu);
    });
  }

  // --- BUSCADOR PRINCIPAL (index.html) ---
  const buscadorInput = document.getElementById("buscador");
  if (buscadorInput) {
    buscadorInput.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        buscar();
      }
    });
  }

  // --- BUSCADOR EN TIEMPO REAL (actividades.html) ---
  const inputActividades = document.getElementById("input-busqueda");
  const cardsActividades = document.querySelectorAll(
    ".cards-actividades .card, .cards .card",
  );
  const mensajeError = document.getElementById("mensaje-error");

  if (inputActividades) {
    inputActividades.addEventListener("input", (e) => {
      const texto = e.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

      let coincidencias = 0;

      cardsActividades.forEach((card) => {
        const contenido = card.textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (contenido.includes(texto)) {
          card.style.display = "";
          coincidencias++;
        } else {
          card.style.display = "none";
        }
      });

      // Mostrar mensaje de aviso si no hay resultados
      if (mensajeError) {
        if (coincidencias === 0 && texto !== "") {
          mensajeError.textContent =
            "No se encontraron actividades con esa búsqueda.";
        } else {
          mensajeError.textContent = "";
        }
      }
    });
  }

  // --- DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS (#) ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// --- FUNCIÓN DE BÚSQUEDA GENERAL (Navegación en index.html) ---
function buscar() {
  const input = document.getElementById("buscador");
  const mensaje = document.getElementById("mensajeBusqueda");

  if (!input) return;

  const texto = input.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (mensaje) mensaje.textContent = "";

  if (texto === "") return;

  if (texto.includes("horario")) {
    document.getElementById("horarios")?.scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("ubicacion") ||
    texto.includes("mapa") ||
    texto.includes("lugar")
  ) {
    document
      .getElementById("ubicacion")
      ?.scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("predica") ||
    texto.includes("youtube") ||
    texto.includes("video") ||
    texto.includes("transmision")
  ) {
    document.getElementById("predicas")?.scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("joven") ||
    texto.includes("actividad") ||
    texto.includes("evento")
  ) {
    window.location.href = "actividades.html";
  } else if (
    texto.includes("alabanza") ||
    texto.includes("adoracion") ||
    texto.includes("canto") ||
    texto.includes("musica") ||
    texto.includes("himno") ||
    texto.includes("cancion")
  ) {
    window.location.href = "alabanzas.html";
  } else if (
    texto.includes("confesion") ||
    texto.includes("fe") ||
    texto.includes("doctrina") ||
    texto.includes("creencia")
  ) {
    window.location.href = "confesion_de_fe.html";
  } else if (
    texto.includes("servicio") ||
    texto.includes("escuela bíblica") ||
    texto.includes("escuela dominical") ||
    texto.includes("servir")
  ) {
    window.location.href = "servicios.html";
  } else if (mensaje) {
    mensaje.textContent =
      "No encontramos esa sección. Intenta con 'horarios' o 'ubicación'.";
  }
}

// --- CARRUSEL AUTOMÁTICO DE FONDOS (actividades.html) ---
document.addEventListener("DOMContentLoaded", () => {
  const tarjetasCarrusel = document.querySelectorAll(".tarjeta-evento");

  tarjetasCarrusel.forEach((tarjeta) => {
    const imagenesCarrusel = tarjeta.querySelectorAll(".carrusel-img");
    const puntosCarrusel = tarjeta.querySelectorAll(".carrusel-puntos .punto");

    if (imagenesCarrusel.length > 0) {
      let indiceActual = 0;
      let temporizador = null;
      const TIEMPO_FOTO = 3000; // 3 segundos por foto

      const cambiarFoto = (nuevoIndice) => {
        // Apagar solo las fotos y puntos de ESTA tarjeta
        imagenesCarrusel.forEach((img) => img.classList.remove("activa"));
        puntosCarrusel.forEach((pto) => pto.classList.remove("activo"));

        // Calcular índice correcto (loop)
        indiceActual =
          (nuevoIndice + imagenesCarrusel.length) % imagenesCarrusel.length;

        // Activar la foto y el punto correspondiente
        if (imagenesCarrusel[indiceActual]) {
          imagenesCarrusel[indiceActual].classList.add("activa");
        }
        if (puntosCarrusel[indiceActual]) {
          puntosCarrusel[indiceActual].classList.add("activo");
        }
      };

      const siguienteFoto = () => {
        cambiarFoto(indiceActual + 1);
      };

      const reiniciarTemporizador = () => {
        if (temporizador) clearInterval(temporizador);
        temporizador = setInterval(siguienteFoto, TIEMPO_FOTO);
      };

      // Iniciar en la primera foto
      cambiarFoto(0);
      reiniciarTemporizador();

      // Clics en los puntitos de esta tarjeta
      puntosCarrusel.forEach((punto, index) => {
        punto.addEventListener("click", (e) => {
          e.stopPropagation();
          cambiarFoto(index);
          reiniciarTemporizador();
        });
      });
    }
  });
});

// -------------------------------------------------
// Contador de visitas permanente (Cloudflare Workers + KV)
// -------------------------------------------------
(function () {
  const apiUrl = "https://visit-counter.ploes-3712.workers.dev/count";
  const contadorEl = document.getElementById("visit-count");

  function usarLocal() {
    const local = Number(localStorage.getItem("visit-count")) || 0;
    const nuevo = local + 1;
    localStorage.setItem("visit-count", nuevo);
    if (contadorEl) contadorEl.textContent = nuevo.toLocaleString();
  }

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (contadorEl && data.value) {
        contadorEl.textContent = Number(data.value).toLocaleString();
      }
    })
    .catch((err) => {
      console.warn("Usando fallback local:", err);
      usarLocal();
    });
})();
