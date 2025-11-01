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
 * NUEVO: Lookbook Dinámico (MODIFICADO CON BOTÓN DE GUARDAR)
 */

const lookbookGrid = document.querySelector(".lookbook-grid");

if (lookbookGrid) {
  
  fetch('imagenes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar imagenes.json');
      }
      return response.json();
    })
    .then(imagenes => {
      // Para cada nombre de imagen en el JSON...
      imagenes.forEach(nombreImagen => {
        
        // --- INICIO DE MODIFICACIÓN ---
        
        // 1. Crea todos los elementos HTML necesarios
        const li = document.createElement('li');
        const container = document.createElement('div');
        const img = document.createElement('img');
        const downloadLink = document.createElement('a');
        const downloadIcon = document.createElement('ion-icon');
        const downloadSpan = document.createElement('span');

        const imagePath = `./assets/images/lookbook/${nombreImagen}`;
        
        // 2. Configura la imagen
        img.src = imagePath;
        img.alt = "Imagen del Lookbook";
        img.loading = "lazy";
        
        // 3. Configura el contenedor (el que faltaba)
        container.className = 'lookbook-item-container';
        
        // 4. Configura el botón de descarga
        downloadLink.href = imagePath;
        downloadLink.className = 'btn download-btn';
        downloadLink.setAttribute('download', ''); // Atributo download
        
        downloadIcon.setAttribute('name', 'download-outline');
        downloadIcon.setAttribute('aria-hidden', 'true');
        
        downloadSpan.textContent = 'Guardar';
        
        // 5. Ensambla el botón
        downloadLink.appendChild(downloadIcon);
        downloadLink.appendChild(downloadSpan);
        
        // 6. Ensambla el contenedor
        container.appendChild(img);
        container.appendChild(downloadLink);
        
        // 7. Añade todo a la página
        li.appendChild(container);
        lookbookGrid.appendChild(li);
        
        // --- FIN DE MODIFICACIÓN ---
      });
    })
    .catch(error => {
      console.error('Error al cargar el lookbook:', error);
      lookbookGrid.innerHTML = "<li><p>Error al cargar las imágenes.</p></li>";
    });
}
