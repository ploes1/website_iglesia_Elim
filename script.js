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
  } else if (
    texto.includes("alabanza") ||
    texto.includes("adoracion") ||
    texto.includes("adoración") ||
    texto.includes("canto") ||
    texto.includes("musica") ||
    texto.includes("música") ||
    texto.includes("himno") ||
    texto.includes("cancion") ||
    texto.includes("canción")
  ) {
    window.location.href = "alabanzas.html";
  } else if (
    texto.includes("confesion") ||
    texto.includes("confesión") ||
    texto.includes("fe") ||
    texto.includes("doctrina") ||
    texto.includes("creencias") ||
    texto.includes("creencia")
  ) {
    window.location.href = "confesion_de_fe.html";
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
