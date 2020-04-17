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
  console.log('3')
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

    
    const peliculaRelease = document.createElement('p');
    peliculaRelease.classList.add('peliculas-box__release');
    peliculaRelease.innerHTML =  `<span>Estreno: </span>${release}`;
    peliculasBox.appendChild(peliculaRelease);
    
    const peliculaDescripcion = document.createElement('p');
    peliculaDescripcion.setAttribute('id', 'pelicula-descripcion');
    peliculaDescripcion.classList.add('peliculas-box__descripcion');
    peliculaDescripcion.textContent = resumen;
    peliculasBox.appendChild(peliculaDescripcion); 
  })
}

export function mostrarNavegacionPaginas(url, pagina, paginasTotales, tipo) {
  console.log('4')
  const peliculasNav = document.querySelectorAll('.peliculas-nav');
  const peliculasNavNumero = document.querySelectorAll('.peliculas-nav__numero');
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
        Promise.all([obtenerInfoPagina(e, urlNueva, tipo)])
        .then(() => obtenerInfoPaginaIngles(urlNuevaIngles, tipo));

      } 
      else if (boton == 'anterior') {
        pagina -= 1;
        peliculasNavNumero.forEach((nav) => {
          nav.textContent = pagina;
        });
        urlNueva = url.replace('&page=2', '') + '&page=' + (pagina);
        urlNuevaIngles = urlNueva.replace('&language=es', '') + '&language=en';
        Promise.all([obtenerInfoPagina(e, urlNueva, tipo)])
        .then(() => obtenerInfoPaginaIngles(urlNuevaIngles, tipo));

      }
    });
  })

}

export function mostrarInfoIngles(peliculas, tipo) {
  console.log('9')
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
        tituloAlternativo.classList.add('peliculas-box__subtitulo');
        tituloAlternativo.textContent = titulo;
        titulos[i].appendChild(tituloAlternativo);
    }
  }
}

function popUp(e) {
  const botonBusqueda = document.querySelector('.pop__checkbox');
  const formulario = document.querySelector('.navegacion__formulario');
  if (!botonBusqueda.checked) {
    setTimeout(() => formulario.style.display = "block", 200);
    
  }else {
    formulario.style.display = "none";
  }  
}

const popButton = document.querySelector('.pop__button');
popButton.addEventListener('click', popUp)

/* matchMedia('(max-width: 900px)').addEventListener('change', moverFormulario);

function moverFormulario(e) {
  console.log(e)
  const navegacion = document.querySelector('.navegacion');
  const formulario = document.querySelector('.navegacion__formulario');
  const pop = document.querySelector('.pop');

  if (e.matches) {
    pop.appendChild(formulario);
  } else {
    navegacion.appendChild(formulario);
  }
} */ 

