import { obtenerInfoPagina, obtenerInfoPaginaIngles } from './api.js';

export function mostrarAnos(selector) {
  const fecha = new Date();
  const esteAno = fecha.getFullYear();
  const esHasta = selector.classList.contains('hasta');

  for (var i = 1960; i <= esteAno; i += 1) {
    const opcion = document.createElement('option');
    opcion.setAttribute('value', i)
    opcion.textContent = i;
    selector.appendChild(opcion);
    if (esHasta && i == esteAno) {
      opcion.setAttribute('selected', 'selected');
    }
  } 
}

export function mostrarGeneros(generosArray) {
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

export function mostrarPeliculas(peliculas) {
  const peliculasDOM = document.querySelector('#peliculas');
  peliculasDOM.innerHTML = '';

  peliculas.forEach((pelicula) => {
    const tapa = pelicula.poster_path;
    const titulo = pelicula.original_title;
    const idioma = pelicula.original_language;
    const puntaje = pelicula.vote_average;
    const resumen = pelicula.overview;
    const releaseEnglish = pelicula.release_date.split('-');
    const release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];

    //Crea la parte del contenedor de la imagen de la CARD
    const cardImgContainer = document.createElement('div');
    cardImgContainer.classList.add('card', 'mb-3');
    cardImgContainer.setAttribute('id', 'card');
    const cardRow = document.createElement('div');
    cardRow.classList.add('row', 'no-gutters');
    cardImgContainer.appendChild(cardRow);
    const cardImgColumna = document.createElement('div');
    cardImgColumna.classList.add('col-md-4', 'imagen-box');
    cardRow.appendChild(cardImgColumna);

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
    if (idioma == 'en' || idioma == 'es') {
      const fechaSalida = document.createElement('p');
      fechaSalida.classList.add('card-text', 'release');
      fechaSalida.setAttribute('id', 'release');
      fechaSalida.textContent = `Estreno: ${release}`; 
      cardTitulo.appendChild(fechaSalida);
    }
    const descripcion = document.createElement('p');
    descripcion.classList.add('card-text');
    descripcion.setAttribute('id', 'card-descripcion');
    descripcion.textContent = resumen;
    cardBody.appendChild(descripcion); 

    peliculasDOM.appendChild(cardImgContainer)
  })
}

export function mostrarNavegacionPaginas(url, pagina, paginasTotales) {
  const peliculasNav = document.querySelectorAll('.peliculas-nav');
  const peliculasNavNumero = document.querySelectorAll('.peliculas-nav-numero');
  peliculasNavNumero.forEach((nav) => {
    nav.textContent = pagina;
  });

  peliculasNav.forEach((nav) => {
    let urlNueva;
    let urlNuevaIngles;
    nav.addEventListener('click', (e) => {
      const boton = e.target.dataset.boton;
      
  
      if (boton == 'proxima' && pagina < paginasTotales) {
        pagina += 1;
        peliculasNavNumero.forEach((nav) => {
          nav.textContent = pagina;
        });
        urlNueva = url.replace('&page=1', '') + '&page=' + (pagina);
        urlNuevaIngles = urlNueva.replace('language=es', '') + '&language=en';
      } 
      else if (boton == 'anterior') {
        pagina -= 1;
        peliculasNavNumero.forEach((nav) => {
          nav.textContent = pagina;
        });
        urlNueva = url.replace('&page=2', '') + '&page=' + (pagina);
        urlNuevaIngles = urlNueva.replace('&language=es', '') + '&language=en';
      }
  
      obtenerInfoPagina(e, urlNueva).then(obtenerInfoPaginaIngles(urlNuevaIngles));
    });
  })

}

export function mostrarInfoIngles(peliculas) {
  const imagenBox = Array.from(document.querySelectorAll('.imagen-box'));
  imagenBox.innerHTML = '';
  const titulos = document.querySelectorAll('#card-titulo');

  for (var i = 0; i < peliculas.length; i += 1) {
    const tapa = peliculas[i].poster_path;
    const idioma = peliculas[i].original_language;
    const titulo = peliculas[i].title;
    const releaseEnglish = peliculas[i].release_date.split('-');
    const release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];

    //Crea la parte de la imagen de la CARD, con el poster en ingles (viene de otro fetch)
    const imagen = document.createElement('img');
    imagen.classList.add('card-img');
    imagen.setAttribute('src', `https://image.tmdb.org/t/p/w500${tapa}`)
    imagenBox[i].appendChild(imagen);

    //Agrega subtitulo si el titulo principal esta en algun idioma que no sea ingles o espaniol
    if (idioma != 'en' && idioma != 'es' && titulos[i].firstChild.textContent.toLowerCase() != titulo.toLowerCase()) {
        const tituloAlternativo = document.createElement('h4');
        tituloAlternativo.classList.add('card-title');
        tituloAlternativo.setAttribute('id', 'card-titulo-alternativo');
        tituloAlternativo.textContent = titulo;
        titulos[i].appendChild(tituloAlternativo);
        const fechaSalida = document.createElement('p');
        fechaSalida.classList.add('card-text', 'release');
        fechaSalida.setAttribute('id', 'release');
        fechaSalida.textContent = `Estreno: ${release}`; 
        tituloAlternativo.appendChild(fechaSalida);
    }
  }
}

