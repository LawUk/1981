'use strict';

/**
 * Mobile Navbar Toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const header = document.querySelector("[data-header]");

if (navbar && navToggler && header) {
  navToggler.addEventListener("click", () => {
    navbar.classList.toggle("active");
    header.classList.toggle("nav-active");
  });
}

/**
 * Header Active
 */

if (header) {

  // --- INICIO DE LA MODIFICACIÓN ---

  // 1. Revisa si el header ya tiene la clase 'active' cuando carga la página
  //    (Esto será 'true' en lookbook.html, y 'false' en index.html)
  const isFixedActive = header.classList.contains("active");

  window.addEventListener("scroll", () => {
    
    if (isFixedActive) {
      // 2. Si la página cargó 'active' (como lookbook.html),
      //    NUNCA quites la clase. Solo asegúrate de que siempre esté.
      header.classList.add("active");
    } else {
      // 3. Si la página cargó normal (como index.html),
      //    usa la lógica de scroll que ya teníamos.
      header.classList.toggle("active", window.scrollY > 50);
    }

  });

  // --- FIN DE LA MODIFICACIÓN ---
}
