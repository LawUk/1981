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
 * Compatible con DOS formatos de imagenes.json:
 *
 * Formato nuevo (con volúmenes):
 * [ { "volumen": "Vol. 1 — 2025", "carpeta": "lookbook/2025", "fotos": ["a.png"] } ]
 *
 * Formato antiguo (array plano, por si el repo aún lo tiene):
 * [ "foto3.png", "foto4.png" ]
 * → En este caso busca en assets/images/lookbook/
 */
const lookbookGrid = document.querySelector("#lookbook-grid");

if (lookbookGrid) {

  fetch(basePath('imagenes.json'))
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar imagenes.json');
      return response.json();
    })
    .then(data => {

      lookbookGrid.innerHTML = '';
      let totalFotos = 0;

      // Normalizar: si es array de strings (formato antiguo), convertir a volúmenes
      let volumenes;
      if (typeof data[0] === 'string') {
        volumenes = [{ volumen: null, carpeta: 'lookbook', fotos: data }];
      } else {
        volumenes = data;
      }

      volumenes.forEach(vol => {
        if (!vol.fotos || vol.fotos.length === 0) return;

        // Separador de volumen (solo si tiene nombre)
        if (vol.volumen) {
          const separator = document.createElement('li');
          separator.className = 'lookbook-volume-separator';
          separator.innerHTML = `<span class="title">${vol.volumen}</span>`;
          lookbookGrid.appendChild(separator);
        }

        vol.fotos.forEach(nombreImagen => {
          const li        = document.createElement('li');
          const container = document.createElement('div');
          const img       = document.createElement('img');
          const link      = document.createElement('a');
          const icon      = document.createElement('ion-icon');
          const span      = document.createElement('span');

          const imagePath = basePath(`assets/images/${vol.carpeta}/${nombreImagen}`);

          img.src     = imagePath;
          img.alt     = vol.volumen ? `Lookbook ${vol.volumen}` : 'Lookbook 1981.';
          img.loading = "lazy";
          img.onerror = () => { li.style.display = 'none'; };
          img.onload  = () => {
            totalFotos++;
            const counter = document.getElementById('lookbook-count');
            if (counter) counter.textContent = `${totalFotos} foto${totalFotos !== 1 ? 's' : ''}`;
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
      });

      if (lookbookGrid.children.length === 0) {
        lookbookGrid.innerHTML = "<li><p style='opacity:0.5'>No hay fotos todavía.</p></li>";
      }
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

        const linkHref = entrada.link || (basePath('entrada.html') + '?id=' + entrada.id);
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

        const linkHref  = entrada.link || (basePath('entrada.html') + '?id=' + entrada.id);
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


/**
 * Página de Entrada Individual
 * Lee ?id=slug de la URL, busca la entrada en blog.json y la renderiza
 * URL esperada: entrada.html?id=comprar-menos-usar-mas
 */
const entradaContenido = document.getElementById('entrada-contenido');
const entradaLoading   = document.getElementById('entrada-loading');
const entradaError     = document.getElementById('entrada-error');

if (entradaContenido) {

  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');

  if (!id) {
    // Sin ?id= → redirigir al blog
    window.location.replace(basePath('blog.html'));

  } else {

    fetch(basePath('blog.json'))
      .then(r => {
        if (!r.ok) throw new Error('No se pudo cargar blog.json');
        return r.json();
      })
      .then(entradas => {

        const entrada = entradas.find(e => e.id === id);

        if (!entrada) {
          // Entrada no encontrada → mostrar error
          entradaLoading.style.display = 'none';
          entradaError.style.display   = 'block';
          document.title = 'Entrada no encontrada - 1981.';
          return;
        }

        // --- Rellenar el contenido ---

        // Meta tags
        document.title = `${entrada.titulo} - 1981.`;
        document.querySelector('meta[name="description"]').content = entrada.resumen;

        // Hero
        document.getElementById('entrada-tag').textContent      = entrada.tag;
        document.getElementById('entrada-fecha').textContent    = entrada.fecha;
        document.getElementById('entrada-minutos').textContent  = `${entrada.minutos} min`;
        document.getElementById('entrada-titulo').textContent   = entrada.titulo;
        document.getElementById('entrada-resumen').textContent  = entrada.resumen;

        // Cuerpo: cada string del array = un párrafo
        const cuerpoEl = document.getElementById('entrada-cuerpo');
        entrada.cuerpo.forEach(parrafo => {
          const p = document.createElement('p');
          p.innerHTML = parrafo; // innerHTML para soportar <em> y <strong>
          cuerpoEl.appendChild(p);
        });

        // Link externo (ej. playlist)
        if (entrada.link) {
          const linkWrap = document.getElementById('entrada-link-wrap');
          const linkEl   = document.getElementById('entrada-link');
          const textoEl  = document.getElementById('entrada-link-texto');

          textoEl.textContent = entrada.link_texto || 'Ver más';
          linkEl.href         = entrada.link;

          // Si es link interno (no http), quitar target _blank
          if (!entrada.link.startsWith('http')) {
            linkEl.removeAttribute('target');
            linkEl.removeAttribute('rel');
          }

          linkWrap.style.display = 'block';
        }

        // Más entradas: las otras 3 (excluyendo la actual)
        const masGrid   = document.getElementById('entrada-mas-grid');
        const otras     = entradas.filter(e => e.id !== id).slice(0, 3);

        otras.forEach(otra => {
          const article = document.createElement('article');
          article.className = 'blog-card';

          article.innerHTML = `
            <div class="blog-card-top">
              <span class="blog-tag">${otra.tag}</span>
              <span class="blog-date">${otra.fecha}</span>
            </div>
            <h3 class="h3 title blog-card-title">${otra.titulo}</h3>
            <p class="blog-card-text">${otra.resumen}</p>
            <div class="blog-card-footer">
              <span class="blog-read-time">
                <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                ${otra.minutos} min
              </span>
              <a href="${basePath('entrada.html')}?id=${otra.id}" class="blog-card-link">
                Leer
                <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
              </a>
            </div>
          `;
          masGrid.appendChild(article);
        });

        // Mostrar contenido, ocultar skeleton
        entradaLoading.style.display  = 'none';
        entradaContenido.style.display = 'block';
      })
      .catch(err => {
        console.error('Error cargando entrada:', err);
        entradaLoading.style.display = 'none';
        entradaError.style.display   = 'block';
      });
  }
}
