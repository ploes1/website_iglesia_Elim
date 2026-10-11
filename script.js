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

// --- CARRUSEL AUTOMÁTICO DE FONDOS (OPTIMIZADO) ---
document.addEventListener("DOMContentLoaded", () => {
  const tarjetasCarrusel = document.querySelectorAll(".tarjeta-evento");

  tarjetasCarrusel.forEach((tarjeta) => {
    const imagenesCarrusel = tarjeta.querySelectorAll(".carrusel-img");
    const puntosCarrusel = tarjeta.querySelectorAll(".carrusel-puntos .punto");

    if (imagenesCarrusel.length > 0) {
      let indiceActual = 0;
      let temporizador = null;
      const TIEMPO_FOTO = 3000;

      const cambiarFoto = (nuevoIndice) => {
        imagenesCarrusel.forEach((img) => img.classList.remove("activa"));
        puntosCarrusel.forEach((pto) => pto.classList.remove("activo"));

        indiceActual =
          (nuevoIndice + imagenesCarrusel.length) % imagenesCarrusel.length;

        if (imagenesCarrusel[indiceActual]) {
          imagenesCarrusel[indiceActual].classList.add("activa");
        }
        if (puntosCarrusel[indiceActual]) {
          puntosCarrusel[indiceActual].classList.add("activo");
        }
      };

      const siguienteFoto = () => cambiarFoto(indiceActual + 1);

      const iniciar = () => {
        if (!temporizador)
          temporizador = setInterval(siguienteFoto, TIEMPO_FOTO);
      };

      const detener = () => {
        if (temporizador) {
          clearInterval(temporizador);
          temporizador = null;
        }
      };

      // Solo gira si la tarjeta está visible en la pantalla
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              iniciar();
            } else {
              detener();
            }
          });
        },
        { threshold: 0.2 },
      );

      observer.observe(tarjeta);

      cambiarFoto(0);

      puntosCarrusel.forEach((punto, index) => {
        punto.addEventListener("click", (e) => {
          e.stopPropagation();
          cambiarFoto(index);
          detener();
          iniciar();
        });
      });
    }
  });
});

// -------------------------------------------------
// Contador de visitas permanente (Cloudflare Workers + KV)
// -------------------------------------------------
window.addEventListener("load", () => {
  const API_URL = "https://visit-counter.ploes-3712.workers.dev/count";
  const contadorEl = document.getElementById("visit-count");

  fetch(API_URL, {
    method: "POST",
  })
    .then((r) => {
      if (!r.ok) throw new Error(`Error en el servidor: ${r.status}`);
      return r.json();
    })
    .then((data) => {
      if (contadorEl) {
        contadorEl.textContent = Number(data.value).toLocaleString();
      }

      // Uso seguro de localStorage para guardar metadatos de última visita (modo privado amigable)
      try {
        localStorage.setItem("elim_last_visit", Date.now().toString());
      } catch (e) {
        // Ignorado si el navegador bloquea el almacenamiento local
      }
    })
    .catch((err) => {
      console.warn("No se pudo obtener el contador de visitas:", err);
      if (contadorEl) {
        contadorEl.textContent = "—"; // Fallo limpio sin datos inventados
      }
    });
});
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
