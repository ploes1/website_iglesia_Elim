// 1. Lista de canciones (agrega aquí todas las que necesites)
const alabanzas = [
  {
    titulo: "Santo por Siempre (Versión)",
    artista: "Chris Tomlin & Miel San Marcos",
    url: "https://www.youtube.com/watch?v=5wAfWuKWKJw",
  },
  {
    titulo: "Purifícame (Versión)",
    artista: "Francheska Morales ft. Ricky & Ryan X Miel San Marcos",
    url: "https://www.youtube.com/watch?v=inWU1vzW2Ms",
  },
  {
    titulo: "Santo y Digno (Versión)",
    artista: "Johan y Sofi",
    url: "https://www.youtube.com/watch?v=qYDvR--_EqU",
  },
  {
    titulo: "Dios de lo imposible",
    artista: "Marco Barrientos",
    url: "https://www.youtube.com/watch?v=ZklsuEw8OOg",
  },
  {
    titulo: "Creo en Ti (Versión)",
    artista: "Julio Melgar & Marcela Gándara",
    url: "https://www.youtube.com/watch?v=8j069qJnAwM",
  },
  {
    titulo: "No hay lugar más alto",
    artista: "Miel San Marcos ft. Christine D'Clario",
    url: "https://www.youtube.com/watch?v=UbEUeFC3lh4",
  },
  {
    titulo: "Gracias",
    artista: "Marcos Witt",
    url: "https://www.youtube.com/watch?v=Y27WgAWYd3U",
  },
  {
    titulo: "Este es mi deseo",
    artista: "Claudio Freidzon",
    url: "https://www.youtube.com/watch?v=L2EqWBfFWXs",
  },
  {
    titulo: "Al Estar Ante Ti",
    artista: "Jesús Adrián Romero",
    url: "https://www.youtube.com/watch?v=TdpfjHeZLCk",
  },
  {
    titulo: "A Dios sea la Gloria (Versión)",
    artista: "Marcos Witt, Marcos Vidal & Marco Barrientos",
    url: "https://www.youtube.com/watch?v=OPXOuKy7ORo",
  },
  {
    titulo: "En Tu Presencia",
    artista: "Jaime Murrell",
    url: "https://www.youtube.com/watch?v=BE2Slnik1ug",
  },
  {
    titulo: "Con Tu Sangre",
    artista: "Marcos Witt",
    url: "https://www.youtube.com/watch?v=Q-mBhxGmpaA",
  },
  {
    titulo: "Sentado En Su Trono",
    artista: "Jesús Adrián Romero",
    url: "https://www.youtube.com/watch?v=PrNafmJNSmQ",
  },
  {
    titulo: "Dame De Beber",
    artista: "Marco Barrientos",
    url: "https://www.youtube.com/watch?v=3cSENmro9Hc",
  },
  {
    titulo: "Tu Fidelidad",
    artista: "Marcos Witt",
    url: "https://www.youtube.com/watch?v=4dB5PIdHoVY",
  },
  {
    titulo: "Levanto Mis Manos",
    artista: "Samuel Hernandez",
    url: "https://www.youtube.com/watch?v=iM49tkRfJZs",
  },
  {
    titulo: "El nombre de Jesús",
    artista: "José Ocampo",
    url: "https://www.youtube.com/watch?v=XNMfQuoIs6w",
  },
  {
    titulo: "Gracias Cristo (Versión)",
    artista: "Generación de Jesús",
    url: "https://www.youtube.com/watch?v=4QAJiLkf0I4",
  },
  {
    titulo: "Dios está aquí",
    artista: "Javier Gacías Mateo",
    url: "https://www.youtube.com/watch?v=-1lEvbddHD8",
  },
  {
    titulo: "Yo Sé Que Estás Aquí",
    artista: "Fernel Monroy",
    url: "https://www.youtube.com/watch?v=sg5KZwsLC7A",
  },
  {
    titulo: "Porque Tú Eres Rey de Reyes",
    artista: "Juan Carlos Alvarado",
    url: "https://www.youtube.com/watch?v=iv7xzjdH-HI",
  },
  {
    titulo: "Él Me Levantará",
    artista: "Tony Pérez",
    url: "https://www.youtube.com/watch?v=J1XnzpLqbG8",
  },
  {
    titulo: "Muévete En Mí (Versión)",
    artista: "Medley Propósito ft. Bryan Matos & April Grace Jaspe",
    url: "https://www.youtube.com/watch?v=bgJmmo1uV-I",
  },
  {
    titulo: "La Visión De La Cruz",
    artista: "Juan Carlos Alvarado",
    url: "https://www.youtube.com/watch?v=Rs-KfHvuHc8",
  },
  {
    titulo: "Maravilloso es el Señor Jesús (Versión)",
    artista: "Dominio público",
    url: "https://www.youtube.com/watch?v=J1yEsnCWvrE",
  },
  {
    titulo: "Estamos De Fiesta con Jesús (Versión)",
    artista: "Dominio público",
    url: "https://www.youtube.com/watch?v=M8K1vy4yRY0",
  },
  {
    titulo: "El Maestro de Galilea (Versión)",
    artista: "Dominio público",
    url: "https://www.youtube.com/watch?v=XjhnRerVFyE",
  },
  {
    titulo: "Si no hubiera sido por el Señor (Versión)",
    artista: "Dominio público",
    url: "https://www.youtube.com/watch?v=eQdw0SB0jOI",
  },
  {
    titulo: "Alabad a Jehová (Versión)",
    artista: "Dominio público",
    url: "https://www.youtube.com/watch?v=9UtpgAkBE6A",
  },
];

// 2. Función para renderizar las tarjetas en el HTML
const renderAlabanzas = (lista = alabanzas) => {
  const contenedor = document.getElementById("contenedor-alabanzas");
  const svgYouTube = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.117C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.569A2.994 2.994 0 00.502 6.186 31.26 31.26 0 000 12a31.26 31.26 0 00.502 5.814 2.994 2.994 0 002.107 2.117C4.495 20.5 12 20.5 12 20.5s7.505 0 9.391-.569a2.994 2.994 0 002.107-2.117A31.26 31.26 0 0024 12a31.26 31.26 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
    </svg>`;

  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="texto-parrafo">No se encontraron alabanzas.</p>`;
    return;
  }

  contenedor.innerHTML = lista
    .map(
      (item) => `
    <div class="card">
      <h3>${item.titulo}</h3>
      <p class="hora">${item.artista}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="youtube">
        ${svgYouTube}
        Ver en YT
      </a>
    </div>
  `,
    )
    .join("");
};

// 3. Inicialización y evento del buscador
document.addEventListener("DOMContentLoaded", () => {
  renderAlabanzas();

  const formBuscador = document.getElementById("form-buscador");
  const inputBuscador = document.getElementById("buscador");

  const ejecutarBusqueda = () => {
    const termino = inputBuscador.value.toLowerCase().trim();
    const filtradas = alabanzas.filter(
      (item) =>
        item.titulo.toLowerCase().includes(termino) ||
        item.artista.toLowerCase().includes(termino),
    );
    renderAlabanzas(filtradas);
  };

  if (inputBuscador) {
    inputBuscador.addEventListener("input", ejecutarBusqueda);
  }

  if (formBuscador) {
    formBuscador.addEventListener("submit", (e) => {
      e.preventDefault();
      ejecutarBusqueda();
    });
  }
});
