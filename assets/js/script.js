'use strict';

/**
 * Mobile Navbar Toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/**
 * Header Active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 50);
});
