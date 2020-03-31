import {  mostrarGeneros, 
          mostrarPeliculas, 
          mostrarNavegacionPaginas,
          mostrarInfoIngles } from './ui.js';

export function obtenerGeneros() {
  const $url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e4c325cfe50ba68791f7165086f631e4&language=es'
  fetch($url)
    .then((r) => r.json())
    .then((rjson) => mostrarGeneros(rjson.genres))
}

export function obtenerPeliculas(e) {
  e.preventDefault()
  const tipo = e.target.tipo.value;
  const genero = e.target.genero.value;
  const desdeAno = e.target.anodesde.value;
  const hastaAno = e.target.anohasta.value;
  const $votos = 200; // OJO que si lo cambias, tenes que cambiar EN y ES, sino se desfasan los resultados
  let url;

  tipo == 'movie' ? url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=e4c325cfe50ba68791f7165086f631e4&language=es&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_genres=${genero}&primary_release_date.gte=${desdeAno}-01-01&primary_release_date.lte=${hastaAno}-12-12&vote_count.gte=${$votos}&include_image_language=en` 
                  : url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=e4c325cfe50ba68791f7165086f631e4&language=es&sort_by=vote_average.desc&page=1&with_genres=${genero}&first_air_date.gte=${desdeAno}-01-01&first_air_date.lte=${hastaAno}-12-12&vote_count.gte=${$votos}&include_image_language=en`

  return fetch(url)
    .then((r) => r.json())
    .then((resultadoPeliculas) => {
      const { page: pagina, total_pages: paginasTotales, results: resultados} = resultadoPeliculas;
      mostrarPeliculas(resultados, tipo);
      mostrarNavegacionPaginas(url, pagina, paginasTotales, tipo);
    });
}

export function obtenerInfoIngles(e) {
  e.preventDefault()
  const tipo = e.target.tipo.value;
  const genero = e.target.genero.value;
  const desdeAno = e.target.anodesde.value;
  const hastaAno = e.target.anohasta.value;
  const $votos = 200;  // OJO que si lo cambias, tenes que cambiar EN y ES, sino se desfasan los resultados
  let url;

  tipo == 'movie' ? url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=e4c325cfe50ba68791f7165086f631e4&language=en&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_genres=${genero}&primary_release_date.gte=${desdeAno}-01-01&primary_release_date.lte=${hastaAno}-12-12&vote_count.gte=${$votos}&include_image_language=en` 
                  : url = `https://api.themoviedb.org/3/discover/${tipo}?api_key=e4c325cfe50ba68791f7165086f631e4&language=en&sort_by=vote_average.desc&page=1&with_genres=${genero}&first_air_date.gte=${desdeAno}-01-01&first_air_date.lte=${hastaAno}-12-12&vote_count.gte=${$votos}&include_image_language=en`

  return fetch(url)
    .then((r) => r.json())
    .then((resultadoPeliculas) => resultadoPeliculas.results)
    .then((results) => mostrarInfoIngles(results, tipo))
}

export function obtenerInfoPaginaIngles(url, tipo) {
  return fetch(url)
    .then((r) => r.json())
    .then((resultadoPeliculas) => mostrarInfoIngles(resultadoPeliculas.results, tipo));
}

export function obtenerInfoPagina(e, url, tipo) {
  console.log('url obtenerInfoPagina: ', url)
  return fetch(url)
  .then((r) => r.json())
  .then((resultadoPeliculas) => {
    const { page: pagina, total_pages: paginasTotales, results: resultados} = resultadoPeliculas;
    mostrarPeliculas(resultados, tipo);
  })
}