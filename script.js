document.addEventListener("DOMContentLoaded", () => {
  const buscadorInput = document.getElementById("buscador");

  if (buscadorInput) {
    buscadorInput.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        buscar();
      }
    });
  }
  // Buscador en tiempo real para actividades.html
  const inputActividades = document.getElementById("input-busqueda");
  const cardsActividades = document.querySelectorAll(".cards .card");
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
  } else if (mensaje) {
    mensaje.textContent =
      "No encontramos esa sección. Intenta con 'horarios' o 'ubicación'.";
  }
}
