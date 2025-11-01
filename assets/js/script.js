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
  // Revisa si el header ya tiene la clase 'active' cuando carga
  const isFixedActive = header.classList.contains("active");

  window.addEventListener("scroll", () => {
    if (isFixedActive) {
      // Si la página cargó 'active' (como lookbook.html), nunca quites la clase
      header.classList.add("active");
    } else {
      // Si la página cargó normal (como index.html), usa la lógica de scroll
      header.classList.toggle("active", window.scrollY > 50);
    }
  });
}

/**
 * NUEVO: Lookbook Dinámico
 * Esto se ejecutará solo si encuentra la rejilla del lookbook en la página.
 */

// 1. Busca la rejilla del lookbook
const lookbookGrid = document.querySelector(".lookbook-grid");

// 2. Si la encuentra en esta página...
if (lookbookGrid) {
  
  // 3. Busca el archivo JSON que creamos
  fetch('imagenes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar imagenes.json');
      }
      return response.json();
    })
    .then(imagenes => {
      // 4. Para cada nombre de imagen en el JSON...
      imagenes.forEach(nombreImagen => {
        
        // 5. Crea los elementos HTML
        const li = document.createElement('li');
        const img = document.createElement('img');
        
        // 6. Configura la imagen
        // (Asegúrate que tu carpeta de imágenes sea correcta)
        img.src = `./assets/images/lookbook/${nombreImagen}`;
        img.alt = "Imagen del Lookbook";
        img.loading = "lazy";
        
        // 7. Los añade a la página
        li.appendChild(img);
        lookbookGrid.appendChild(li);
      });
    })
    .catch(error => {
      // 8. Si algo sale mal, muestra un error
      console.error('Error al cargar el lookbook:', error);
      lookbookGrid.innerHTML = "<li><p>Error al cargar las imágenes.</p></li>";
    });
}
