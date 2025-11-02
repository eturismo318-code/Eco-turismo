// comunes.ts - Funciones compartidas entre páginas
// -----------------------------------------------

/**
 * Inicializa el modo oscuro/claro con persistencia local
 */
export function inicializarTema() {
  const botonAccesibilidad = document.getElementById('boton-accesibilidad') as HTMLButtonElement | null;
  let contrasteAlto = false;

  // Cargar preferencia guardada
  const guardado = localStorage.getItem('contrasteAlto');
  if (guardado === 'true') {
    contrasteAlto = true;
    document.documentElement.setAttribute('data-contraste', 'alto');
    if (botonAccesibilidad) botonAccesibilidad.textContent = 'Modo claro';
  }

  botonAccesibilidad?.addEventListener('click', () => {
    contrasteAlto = !contrasteAlto;
    document.documentElement.setAttribute('data-contraste', contrasteAlto ? 'alto' : 'normal');
    botonAccesibilidad!.textContent = contrasteAlto ? 'Modo claro' : 'Modo oscuro';
    localStorage.setItem('contrasteAlto', String(contrasteAlto));
  });
}

/**
 * Actualiza automáticamente el año del pie de página
 */
export function actualizarAnio() {
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());
}

/**
 * Inicializa el menú hamburguesa desplegable para móviles
 */
export function inicializarMenu() {
  const menuToggle = document.getElementById('menuToggle') as HTMLButtonElement | null;
  // Apuntamos al nuevo contenedor colapsable
  const menuContainer = document.getElementById('menu-colapsable') as HTMLElement | null;

  if (!menuToggle || !menuContainer) {
    console.warn('Elementos del menú (toggle o contenedor) no encontrados.');
    return;
  }
  
  // Escuchar clics para alternar el menú
  menuToggle.addEventListener('click', () => {
    // Comprobar el estado ARIA
    const menuAbierto = menuToggle.getAttribute('aria-expanded') === 'true';
    const nuevoEstado = !menuAbierto;

    if (nuevoEstado) {
      // Abrir menú
      menuContainer.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Cerrar menú');
    } else {
      // Cerrar menú
      menuContainer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    }
  });

  // Opcional: auto-resetear al cambiar tamaño a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      // Si estamos en desktop, resetear el estado
      menuContainer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    }
  });
}

/**
 * NUEVA FUNCIÓN: Inicializa los atajos de teclado globales
 */
export function inicializarAtajosTeclado() {
  window.addEventListener('keydown', (e) => {
    // Usar Ctrl en Windows/Linux y Meta (Cmd) en Mac
    if (e.ctrlKey || e.metaKey) {
      
      switch (e.key) {
        case 'i': // Ctrl + I (Iniciar Sesión)
          e.preventDefault(); // Prevenir acción por defecto del navegador (ej. Itálica)
          console.log('Atajo: Ir a Iniciar Sesión');
          window.location.href = '/pages/login.html';
          break;

        case 'b': // Ctrl + B (Buscar Rutas)
          e.preventDefault(); // Prevenir acción por defecto (ej. Negrita / Bookmarks)
          console.log('Atajo: Ir a Buscar Rutas');
          
          // Si ya estamos en rutas, enfocar el buscador. Si no, ir a la página.
          if (window.location.pathname.includes('/pages/rutas.html')) {
            const searchInput = document.getElementById('busqueda-rutas') as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
            }
          } else {
            window.location.href = '/pages/rutas.html';
          }
          break;
      }
    }
  });
}