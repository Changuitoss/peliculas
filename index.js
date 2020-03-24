//const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=e4c325cfe50ba68791f7165086f631e4&language=en-US&page=1'

function obtenerGeneros() {
  const $url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e4c325cfe50ba68791f7165086f631e4&language=es'
  fetch($url)
    .then((r) => r.json())
    .then((rjson) => mostrarGeneros(rjson.genres))
}

function mostrarGeneros(generosArray) {
  const opcionesGeneros = document.querySelector('#genero');
  generosArray.forEach((genero) => {
    const nombre = genero.name;
    const id = genero.id;
    const opcion = document.createElement('option');
    opcion.setAttribute('value', id);
    opcion.textContent = nombre;
    opcionesGeneros.appendChild(opcion);
  });
}

function mostrarAnos(selector) {
  const fecha = new Date();
  const esteAno = fecha.getFullYear();

  for (var i = 1960; i <= esteAno; i += 1) {
    const opcion = document.createElement('option');
    opcion.setAttribute('value', i)
    opcion.textContent = i;
    selector.appendChild(opcion);
  } 
}




function limpiarHindis(peliculasTodas) {
  const peliculasLimpio = peliculasTodas.filter((peliculas) => {
    return peliculas.original_language != 'hi';
  })
  return peliculasLimpio;
}

function obtenerPeliculas(e) {
  e.preventDefault()
  const genero = e.target.genero.value
  const desdeAno = e.target.anodesde.value
  const hastaAno = e.target.anohasta.value
  const puntaje = e.target.puntajedesde.value

  const url =  `https://api.themoviedb.org/3/discover/movie?api_key=e4c325cfe50ba68791f7165086f631e4&
                sort_by=vote_average.desc&include_adult=false&include_video=false&
                page=1&
                ?with_genres=${genero}&
                primary_release_date.gte=${desdeAno}-01-01&
                primary_release_date.lte=${hastaAno}-12-12&
                vote_count.gte=1000&
                vote_average.gte=${puntaje}`
}

const form = document.querySelector('form');
form.addEventListener('submit', obtenerPeliculas)


function configurarPagina() {
  const anoDesde = document.querySelector('#anodesde');
  const anoHasta = document.querySelector('#anohasta');
  mostrarAnos(anoDesde);
  mostrarAnos(anoHasta);
  obtenerGeneros();
}

configurarPagina()
