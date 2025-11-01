'use strict';

/**
 * Mobile Navbar Toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const header = document.querySelector("[data-header]"); // MODIFICADO: Seleccionamos el header

// --- MEJORA: Comprobar si los elementos existen ---
if (navbar && navToggler && header) { // MODIFICADO: Comprobamos que exista el header
  navToggler.addEventListener("click", () => {
    navbar.classList.toggle("active");
    header.classList.toggle("nav-active"); // <-- NUEVO: Añade/quita clase al header
  });
}

/**
 * Header Active
 */

// const header = document.querySelector("[data-header]"); // Esta línea ya no es necesaria, la movimos arriba

// --- MEJORA: Comprobar si el header existe ---
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 50);
  });
}
