import { mostrarAnos } from './ui.js';
import { obtenerGeneros, obtenerPeliculas, obtenerInfoIngles } from './api.js';

function configurarPagina() {
  const form = document.querySelector('form');
  const formPop = document.querySelector('.navegacion__formulario');
  const botonBusqueda = document.querySelector('.pop__checkbox');
  const anoDesde = document.querySelector('#anodesde');
  const anoHasta = document.querySelector('#anohasta');
  mostrarAnos(anoDesde);
  mostrarAnos(anoHasta);
  obtenerGeneros();
  
  form.addEventListener('submit', (e) => {
    const peliculasNav = document.querySelectorAll('.peliculas-nav');
    if (matchMedia('(max-width: 900px)').matches) {
      formPop.style.display = 'none';
    }
    
    if (botonBusqueda.checked) {
      botonBusqueda.checked = false;
    }

    peliculasNav.forEach((nav) => {
      nav.classList.remove('invisible');
      nav.classList.add('flex');
    })

    Promise.all([obtenerPeliculas(e)])
    .then(() => obtenerInfoIngles(e))
  })
}

configurarPagina()
