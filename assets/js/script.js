'use strict';

/**
 * Mobile Navbar Toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

// --- MEJORA: Comprobar si los elementos existen ---
if (navbar && navToggler) {
  navToggler.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

/**
 * Header Active
 */

const header = document.querySelector("[data-header]");

// --- MEJORA: Comprobar si el header existe ---
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 50);
  });
}
