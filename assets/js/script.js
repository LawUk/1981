'use strict';

/**
 * Resuelve la ruta base del sitio para que los fetch funcionen
 * tanto en localhost como en GitHub Pages (ej: /1981/)
 */
function basePath(file) {
  // Toma la ruta del HTML actual y quita el nombre del archivo
  const path = window.location.pathname.replace(/\/[^/]*$/, '/');
  return path + file;
}

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
 * Header Active (scroll)
 */
if (header) {
  const isFixedActive = header.classList.contains("active");

  window.addEventListener("scroll", () => {
    if (isFixedActive) {
      header.classList.add("active");
    } else {
      header.classList.toggle("active", window.scrollY > 50);
    }
  });
}


/**
 * Lookbook Dinámico
 * Lee imagenes.json y renderiza la galería con botón de guardar
 */
const lookbookGrid = document.querySelector("#lookbook-grid");

if (lookbookGrid) {

  fetch(basePath('imagenes.json'))
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar imagenes.json');
      return response.json();
    })
    .then(imagenes => {

      // Quita los skeletons de carga
      lookbookGrid.innerHTML = '';

      let fotosVisibles = 0;

      imagenes.forEach(nombreImagen => {
        const li        = document.createElement('li');
        const container = document.createElement('div');
        const img       = document.createElement('img');
        const link      = document.createElement('a');
        const icon      = document.createElement('ion-icon');
        const span      = document.createElement('span');

        const imagePath = `./assets/images/lookbook/${nombreImagen}`;

        img.src     = imagePath;
        img.alt     = "Imagen del Lookbook";
        img.loading = "lazy";
        img.onerror = () => { li.style.display = 'none'; };
        img.onload  = () => {
          fotosVisibles++;
          const counter = document.getElementById('lookbook-count');
          if (counter) counter.textContent = `${fotosVisibles} foto${fotosVisibles !== 1 ? 's' : ''}`;
        };

        container.className = 'lookbook-item-container';

        link.href      = imagePath;
        link.className = 'btn download-btn';
        link.setAttribute('download', '');

        icon.setAttribute('name', 'download-outline');
        icon.setAttribute('aria-hidden', 'true');
        span.textContent = 'Guardar';

        link.appendChild(icon);
        link.appendChild(span);
        container.appendChild(img);
        container.appendChild(link);
        li.appendChild(container);
        lookbookGrid.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error al cargar el lookbook:', error);
      lookbookGrid.innerHTML = "<li><p>Error al cargar las imágenes.</p></li>";
    });
}


/**
 * Sección Blog en Lookbook
 * Lee blog.json y renderiza las primeras 3 entradas
 */
const lookbookBlogGrid = document.getElementById('lookbook-blog-grid');

if (lookbookBlogGrid) {

  fetch(basePath('blog.json'))
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar blog.json');
      return r.json();
    })
    .then(entradas => {

      // Solo mostramos las primeras 3
      const primeras = entradas.slice(0, 3);

      primeras.forEach(entrada => {
        const article = document.createElement('article');
        article.className = 'blog-card';

        const linkHref = entrada.link || `./blog.html#${entrada.id}`;
        const linkTexto = entrada.link_texto || 'Leer';

        article.innerHTML = `
          <div class="blog-card-top">
            <span class="blog-tag">${entrada.tag}</span>
            <span class="blog-date">${entrada.fecha}</span>
          </div>
          <h3 class="h3 title blog-card-title">${entrada.titulo}</h3>
          <p class="blog-card-text">${entrada.resumen}</p>
          <div class="blog-card-footer">
            <span class="blog-read-time">
              <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
              ${entrada.minutos} min
            </span>
            <a href="${linkHref}" class="blog-card-link" ${entrada.link && entrada.link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
              ${linkTexto}
              <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </a>
          </div>
        `;

        lookbookBlogGrid.appendChild(article);
      });
    })
    .catch(err => {
      console.error('Error al cargar blog.json:', err);
      lookbookBlogGrid.innerHTML = '<p style="opacity:0.5">No se pudieron cargar las entradas.</p>';
    });
}


/**
 * Blog Principal
 * Lee blog.json y renderiza TODAS las entradas en blog.html
 */
const blogMainGrid = document.getElementById('blog-main-grid');

if (blogMainGrid) {

  fetch(basePath('blog.json'))
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar blog.json');
      return r.json();
    })
    .then(entradas => {

      entradas.forEach(entrada => {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.id = entrada.id;

        const linkHref  = entrada.link || `#${entrada.id}`;
        const linkTexto = entrada.link_texto || 'Leer';
        const isExternal = entrada.link && entrada.link.startsWith('http');

        article.innerHTML = `
          <div class="blog-card-top">
            <span class="blog-tag">${entrada.tag}</span>
            <span class="blog-date">${entrada.fecha}</span>
          </div>
          <h3 class="h3 title blog-card-title">${entrada.titulo}</h3>
          <p class="blog-card-text">${entrada.resumen}</p>
          <div class="blog-card-footer">
            <span class="blog-read-time">
              <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
              ${entrada.minutos} min
            </span>
            <a href="${linkHref}" class="blog-card-link" ${isExternal ? 'target="_blank" rel="noopener"' : ''}>
              ${linkTexto}
              <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </a>
          </div>
        `;

        blogMainGrid.appendChild(article);
      });

      // Tarjeta CTA al final siempre
      const cta = document.createElement('article');
      cta.className = 'blog-card blog-card-cta';
      cta.innerHTML = `
        <div class="blog-card-cta-inner">
          <p class="title blog-card-cta-label">¿Tienes algo que decir?</p>
          <h3 class="h3 title">Escríbenos.</h3>
          <p>Si tienes una historia, una idea o simplemente quieres hablar de moda y café, la bandeja está abierta.</p>
          <a href="mailto:1981@support.com" class="btn btn-secondary">
            <span class="span">Mandar correo</span>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      `;
      blogMainGrid.appendChild(cta);
    })
    .catch(err => {
      console.error('Error al cargar blog.json:', err);
      blogMainGrid.innerHTML = '<p style="opacity:0.5">No se pudieron cargar las entradas.</p>';
    });
}
