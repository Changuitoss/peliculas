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
  const tipo = e.target.tipo.value;
  const genero = e.target.genero.value;
  const desdeAno = e.target.anodesde.value;
  const hastaAno = e.target.anohasta.value;
  const $votos = 500;

  const url =  `https://api.themoviedb.org/3/discover/${tipo}?api_key=e4c325cfe50ba68791f7165086f631e4&language=es&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_genres=${genero}&primary_release_date.gte=${desdeAno}-01-01&primary_release_date.lte=${hastaAno}-12-12&vote_count.gte=${$votos}&include_image_language=en`

  return fetch(url)
    .then((r) => r.json())
    .then((resultadoPeliculas) => mostrarPeliculas(resultadoPeliculas.results));
}

function mostrarPeliculas(peliculas) {
  console.log(peliculas);
  const peliculasDOM = document.querySelector('#peliculas');
  peliculasDOM.innerHTML = '';


  peliculas.forEach((pelicula) => {
    const tapa = pelicula.poster_path;
    const titulo = pelicula.original_title;
    const puntaje = pelicula.vote_average;
    const resumen = pelicula.overview;
    const releaseEnglish = pelicula.release_date.split('-');
    const release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];

    //Crea la parte de la imagen de la CARD
    const cardImgContainer = document.createElement('div');
    cardImgContainer.classList.add('card', 'mb-3');
    cardImgContainer.setAttribute('id', 'card');
    const cardRow = document.createElement('div');
    cardRow.classList.add('row', 'no-gutters');
    cardImgContainer.appendChild(cardRow);
    const cardImgColumna = document.createElement('div');
    cardImgColumna.classList.add('col-md-4');
    cardRow.appendChild(cardImgColumna);
    const imagen = document.createElement('img');
    imagen.classList.add('card-img');
    imagen.setAttribute('src', `https://image.tmdb.org/t/p/w500${tapa}`)
    cardImgColumna.appendChild(imagen);

    //Crea la parte de la info de la CARD
    const cardInfoColumna = document.createElement('div');
    cardInfoColumna.classList.add('col-md-8');
    cardRow.appendChild(cardInfoColumna);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardInfoColumna.appendChild(cardBody);
    const cardTitulo = document.createElement('h5');
    cardTitulo.classList.add('card-title');
    cardTitulo.setAttribute('id', 'card-titulo');
    cardTitulo.textContent = titulo;
    cardBody.appendChild(cardTitulo);
    const cardPuntaje = document.createElement('p');
    cardPuntaje.classList.add('badge', 'badge-warning', 'puntaje');
    cardPuntaje.textContent = puntaje;
    cardTitulo.appendChild(cardPuntaje);
    const descripcion = document.createElement('p');
    descripcion.classList.add('card-text');
    descripcion.setAttribute('id', 'card-descripcion');
    descripcion.textContent = resumen;
    cardBody.appendChild(descripcion); 
    const fechaSalida = document.createElement('p');
    fechaSalida.classList.add('card-text')
    fechaSalida.textContent = `Estreno: ${release}`; 
    cardBody.appendChild(fechaSalida);

    peliculasDOM.appendChild(cardImgContainer)
  })


}

function configurarPagina() {
  const form = document.querySelector('form');
  const anoDesde = document.querySelector('#anodesde');
  const anoHasta = document.querySelector('#anohasta');
  mostrarAnos(anoDesde);
  mostrarAnos(anoHasta);
  obtenerGeneros();
  
  form.addEventListener('submit', obtenerPeliculas)
}

configurarPagina()
