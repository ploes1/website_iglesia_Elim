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
/* -------------------------------------------------
   Contador de visitas – una visita por dispositivo
   ------------------------------------------------- */
(function () {
  const API_BASE = "https://visit-counter.ploes-3712.workers.dev/count";
  const contadorEl = document.getElementById("visit-count");
  const LOCAL_KEY = "has-visited"; // marca en localStorage

  // ¿Este dispositivo ya ha contado antes?
  const yaVisitado = localStorage.getItem(LOCAL_KEY) === "true";

  // Si es la primera visita, pedimos al Worker que incremente (inc=1);
  // si ya visitó antes, solo leemos (inc=0) para no sumar de nuevo.
  const apiUrl = yaVisitado ? `${API_BASE}?inc=0` : `${API_BASE}?inc=1`;

  fetch(apiUrl)
    .then((r) => r.json())
    .then((data) => {
      if (contadorEl)
        contadorEl.textContent = Number(data.value).toLocaleString();
      // Guardamos la marca después de la primera llamada exitosa
      if (!yaVisitado) localStorage.setItem(LOCAL_KEY, "true");
    })
    .catch((err) => {
      console.warn("Contador falló → fallback local", err);
      // Fallback sencillo: muestra un número local (no persiste en el servidor)
      const local = Number(localStorage.getItem("visit-count-fallback")) || 0;
      const nuevo = local + 1;
      localStorage.setItem("visit-count-fallback", nuevo);
      if (contadorEl)
        contadorEl.textContent = `${nuevo.toLocaleString()} (local)`;
    });
})();
// ============================================================
// MÓDULO DE DONACIONES (Selector de Pestañas y Copiar Cuenta)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Selector de Pestañas (Bancos / En Línea / Presencial)
  const tabBtns = document.querySelectorAll(".tab-btn");
  const paneles = document.querySelectorAll(".panel-metodo");

  if (tabBtns.length > 0 && paneles.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("activo"));
        paneles.forEach((p) => p.classList.remove("activo"));

        btn.classList.add("activo");
        const tabId = btn.getAttribute("data-tab");
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) targetPanel.classList.add("activo");
      });
    });
  }

  // 2. Copiar Números de Cuenta con retroalimentación visual moderna y fallback
  const botonesCopiar = document.querySelectorAll(".btn-copiar[data-target]");
  botonesCopiar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const targetId = boton.getAttribute("data-target");
      const elementoTexto = document.getElementById(targetId);

      if (elementoTexto) {
        const texto = elementoTexto.innerText.trim();
        const aplicarFeedbackVisual = () => {
          const originalHtml = boton.innerHTML;
          boton.innerHTML = "✅ ¡Copiado!";
          boton.style.background = "rgba(34, 197, 94, 0.25)";
          boton.style.borderColor = "#22c55e";
          boton.style.color = "#4ade80";
          boton.style.transform = "scale(1.05)";

          setTimeout(() => {
            boton.innerHTML = originalHtml;
            boton.style.background = "";
            boton.style.borderColor = "";
            boton.style.color = "";
            boton.style.transform = "";
          }, 2000);
        };

        navigator.clipboard
          .writeText(texto)
          .then(() => {
            aplicarFeedbackVisual();
          })
          .catch((err) => {
            console.error(
              "Error al copiar con Clipboard API, usando fallback: ",
              err,
            );
            // Métodos tradicionales para navegadores o entornos HTTP
            const textArea = document.createElement("textarea");
            textArea.value = texto;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            aplicarFeedbackVisual();
          });
      }
    });
  });
});
// ============================================================
// COMPONENTE INTERACTIVO: DodgeField (Esquivar cursor)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dodge-field");
  const mover = document.getElementById("dodge-mover");

  if (!container || !mover) return;

  const THRESHOLD = 120; // Distancia (px) a la que empieza a esquivar
  const MAX_OFFSET = 90; // Máximo desplazamiento (px)
  let animationFrameId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const updatePosition = () => {
    // Suavizado (interpolar movimiento)
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    mover.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (
      Math.abs(targetX - currentX) > 0.01 ||
      Math.abs(targetY - currentY) > 0.01
    ) {
      animationFrameId = requestAnimationFrame(updatePosition);
    } else {
      animationFrameId = null;
    }
  };

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < THRESHOLD) {
      // Calcular vector de huida (alejarse del puntero)
      const angle = Math.atan2(deltaY, deltaX);
      const force = (1 - distance / THRESHOLD) * MAX_OFFSET;

      targetX = -Math.cos(angle) * force;
      targetY = -Math.sin(angle) * force;
    } else {
      targetX = 0;
      targetY = 0;
    }

    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }
  });

  container.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }
  });
});

// ============================================================
// ANIMACIÓN: SPOTLIGHT CARDS (Efecto resplandor en tarjetas)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".spotlight-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});
