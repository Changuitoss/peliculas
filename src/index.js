import { mostrarAnos } from './ui.js';
import { obtenerGeneros, obtenerPeliculas, obtenerInfoIngles } from './api.js';

function configurarPagina() {
  const form = document.querySelector('form');
  const anoDesde = document.querySelector('#anodesde');
  const anoHasta = document.querySelector('#anohasta');
  mostrarAnos(anoDesde);
  mostrarAnos(anoHasta);
  obtenerGeneros();
  
  form.addEventListener('submit', (e) => {
    const peliculasNav = document.querySelectorAll('.peliculas-nav');

    peliculasNav.forEach((nav) => {
      nav.classList.remove('invisible');
    })
    obtenerPeliculas(e).then(obtenerInfoIngles(e))
  })
}

configurarPagina()
