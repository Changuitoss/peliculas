import { obtenerInfoPagina, obtenerInfoPaginaIngles } from './api.js';

export function mostrarAnos(selector) {
  const fecha = new Date();
  const esteAno = fecha.getFullYear();
  const esHasta = selector.classList.contains('hasta');

  for (var i = 1960; i <= esteAno; i += 1) {
    const opcion = document.createElement('option');
    opcion.classList.add('formulario__opcion');
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
    opcion.classList.add('formulario__opcion')
    opcion.setAttribute('value', id);
    opcion.textContent = nombre;
    opcionesGeneros.appendChild(opcion);
  });
}

export function mostrarPeliculas(peliculas, tipo) {
  const peliculasContainer = document.querySelector('.peliculas-container');
  peliculasContainer.innerHTML = '';

  peliculas.forEach((pelicula) => {
    let titulo;
    let release;
    if (tipo == 'movie') {
      titulo = pelicula.original_title;
      let releaseEnglish = pelicula.release_date.split('-');
      release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];
    }
    else if (tipo == 'tv') {
      titulo = pelicula.original_name;
      let releaseEnglish = pelicula.first_air_date.split('-');
      release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];
    }
    const tapa = pelicula.poster_path;
    const idioma = pelicula.original_language;
    const puntaje = pelicula.vote_average;
    const resumen = pelicula.overview;

/*     <div class="peliculas-box">
    <h2 class="peliculas-box__titulo">Batman the dark Knight</h2>
    <h3 class="peliculas-box__subtitulo">Subtitulo</h3>
    <img src="./src/img/batman.jpg" alt="Poster" class="peliculas-box__imagen">
    <p class="peliculas-box__puntaje">8</p>
    <p class="peliculas-box__release"><span>Estreno: </span>23-02-1987</p>
    <p class="peliculas-box__descripcion">Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, y del cual Aragorn tendrá que reclamar el trono para ocupar su puesto de Rey. Pero las fuerzas de Sauron ya se preparan para lanzar el último y definitivo ataque contra el reino de Gondor, la batalla que decidirá el destino de todos. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, a la espera de que Sauron no repare en que dos pequeños Hobbits se acercan cada día más al final de su camino, el Monte del Destino.</p>
    <a href="#" class="peliculas-box__boton">Ver mas</a>
  </div> */

    //Crea la parte del contenedor de la imagen de la CARD
    const peliculasBox = document.createElement('div');
    peliculasBox.classList.add('peliculas-box');
    peliculasBox.setAttribute('id', 'card');
    peliculasContainer.appendChild(peliculasBox);


    //Crea la parte de la info de la CARD
    const peliculaTitulo = document.createElement('h2');
    peliculaTitulo.classList.add('peliculas-box__titulo');
    peliculaTitulo.setAttribute('id', 'card-titulo');
    peliculaTitulo.textContent = titulo;
    peliculasBox.appendChild(peliculaTitulo)


    const peliculaPuntaje = document.createElement('p');
    peliculaPuntaje.classList.add('peliculas-box__puntaje');
    peliculaPuntaje.textContent = puntaje;
    peliculasBox.appendChild(peliculaPuntaje);

    const peliculaImagen = document.createElement('img');
    peliculaImagen.classList.add('peliculas-box__imagen');
    peliculasBox.appendChild(peliculaImagen);

    if (idioma == 'en' || idioma == 'es') {
      const peliculaRelease = document.createElement('p');
      peliculaRelease.classList.add('peliculas-box__release');
      peliculaRelease.textContent = release;
      const peliculaReleaseSpan = document.createElement('span');
      peliculaRelease.appendChild(peliculaReleaseSpan); 
      peliculasBox.appendChild(peliculaRelease);
    }
    const peliculaDescripcion = document.createElement('p');
    peliculaDescripcion.classList.add('peliculas-box__descripcion');
    peliculaDescripcion.textContent = resumen;
    peliculasBox.appendChild(peliculaDescripcion); 
  })
}

export function mostrarNavegacionPaginas(url, pagina, paginasTotales, tipo) {
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
        obtenerInfoPagina(e, urlNueva, tipo).then(obtenerInfoPaginaIngles(urlNuevaIngles, tipo));

      } 
      else if (boton == 'anterior') {
        pagina -= 1;
        peliculasNavNumero.forEach((nav) => {
          nav.textContent = pagina;
        });
        urlNueva = url.replace('&page=2', '') + '&page=' + (pagina);
        urlNuevaIngles = urlNueva.replace('&language=es', '') + '&language=en';
        obtenerInfoPagina(e, urlNueva, tipo).then(obtenerInfoPaginaIngles(urlNuevaIngles, tipo));

      }
    });
  })

}

export function mostrarInfoIngles(peliculas, tipo) {
  const peliculasBox = Array.from(document.querySelectorAll('.peliculas-box'));
  //imagenBox.innerHTML = '';
  const titulos = document.querySelectorAll('.peliculas-box__titulo');

  for (var i = 0; i < peliculas.length; i += 1) {
    let titulo;
    let release;
    const tapa = peliculas[i].poster_path;
    const idioma = peliculas[i].original_language;

    if (tipo == 'movie') {
      titulo = peliculas[i].title;
      let releaseEnglish = peliculas[i].release_date.split('-');
      release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];
    }
    else if (tipo == 'tv') {
      titulo = peliculas[i].original_name;
      let releaseEnglish = peliculas[i].first_air_date.split('-');
      release = releaseEnglish[2] + '-' + releaseEnglish[1] + '-' + releaseEnglish[0];
    }

    //Crea la parte de la imagen de la CARD, con el poster en ingles (viene de otro fetch)
    //console.log('imagenbox: ', imagenBox[i]);
    const imagen = document.createElement('img');
    imagen.classList.add('peliculas-box__imagen');
    imagen.setAttribute('src', `https://image.tmdb.org/t/p/w500${tapa}`)
    peliculasBox[i].appendChild(imagen);

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

