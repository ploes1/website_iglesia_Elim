function buscar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  document.getElementById("mensajeBusqueda").textContent = "";
  if (texto.includes("horario")) {
    document.getElementById("horarios").scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("ubicacion") ||
    texto.includes("ubicación") ||
    texto.includes("mapa") ||
    texto.includes("lugar")
  ) {
    document.getElementById("ubicacion").scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("predica") ||
    texto.includes("prédica") ||
    texto.includes("youtube") ||
    texto.includes("video") ||
    texto.includes("transmision") ||
    texto.includes("transmisión")
  ) {
    document.getElementById("predicas").scrollIntoView({ behavior: "smooth" });
  } else if (
    texto.includes("jovenes") ||
    texto.includes("jóvenes") ||
    texto.includes("actividad") ||
    texto.includes("evento")
  ) {
    window.location.href = "actividades.html";
  } else {
    document.getElementById("mensajeBusqueda").textContent =
      "No encontramos esa sección. Intenta con 'horarios' o 'ubicación'.";
  }
}

document
  .getElementById("buscador")
  .addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      buscar();
    }
  });
