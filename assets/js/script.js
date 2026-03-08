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
 * Productos Home
 * Carga productos.json y llena #product-list-top (3 primeros)
 * y #product-list-feature (los 6 siguientes)
 */
const productListTop     = document.getElementById('product-list-top');
const productListFeature = document.getElementById('product-list-feature');

if (productListTop || productListFeature) {
  fetch(basePath('data/productos.json'))
    .then(r => { if (!r.ok) throw new Error('No se pudo cargar productos.json'); return r.json(); })
    .then(productos => {

      function crearCardProducto(p, esScrollbar) {
        const li  = document.createElement('li');
        if (esScrollbar) li.className = 'scrollbar-item';

        const productoUrl = basePath('producto.html') + '?id=' + p.id;
        const imgSrc      = basePath('assets/images/' + p.imagen_home);

        li.innerHTML = `
          <div class="product-card text-center">
            <div class="card-banner">
              <a href="${productoUrl}" class="product-card-img-link" tabindex="-1" aria-hidden="true"></a>
              <figure class="product-banner img-holder" style="--width: 448; --height: 470;">
                <img src="${imgSrc}" width="448" height="470" loading="lazy"
                  alt="${p.nombre}" class="img-cover"
                  onerror="this.style.display='none';this.parentElement.classList.add('img-missing')">
              </figure>
              <button class="btn product-btn" data-id="${p.id}">
                <ion-icon name="bag" aria-hidden="true"></ion-icon>
                <span class="span">Agregar al carrito</span>
              </button>
            </div>
            <div class="card-content">
              <h3 class="h4 title">
                <a href="${productoUrl}" class="card-title">${p.nombre}</a>
              </h3>
              <span class="price">${p.precio}</span>
            </div>
          </div>
        `;

        // Botón carrito
        const btn = li.querySelector('.product-btn');
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const tallas      = p.tallas || [];
          const disponibles = tallas.filter(t => t.stock);

          if (disponibles.length === 1) {
            carritoAgregar({
              id:     p.id,
              nombre: p.nombre,
              precio: p.precio_num,
              imagen: p.imagen_home,
              talla:  disponibles[0].nombre
            });
            btn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span class="span">¡Listo!</span>';
            setTimeout(() => {
              btn.innerHTML = '<ion-icon name="bag"></ion-icon><span class="span">Agregar al carrito</span>';
            }, 1800);
          } else {
            window.location.href = productoUrl;
          }
        });

        return li;
      }

      // Primeros 3 → sección top (scrollbar)
      productos.slice(0, 3).forEach(p => {
        if (productListTop) productListTop.appendChild(crearCardProducto(p, true));
      });

      // Siguientes 6 → sección feature
      productos.slice(3).forEach(p => {
        if (productListFeature) productListFeature.appendChild(crearCardProducto(p, false));
      });

    })
    .catch(err => {
      console.error('Error al cargar productos:', err);
    });
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

  fetch(basePath('data/imagenes.json'))
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar imagenes.json');
      return response.json();
    })
    .then(data => {

      lookbookGrid.innerHTML = '';

      // Normalizar: si es array de strings (formato antiguo), convertir a volúmenes
      let volumenes;
      if (typeof data[0] === 'string') {
        volumenes = [{ volumen: null, carpeta: 'lookbook', fotos: data }];
      } else {
        volumenes = data;
      }

      // Contar fotos esperadas desde el JSON (no esperar onload para evitar bug de caché)
      const totalEsperadas = volumenes.reduce((sum, v) => sum + (v.fotos ? v.fotos.length : 0), 0);
      let fotosError = 0;
      const counter = document.getElementById('lookbook-count');
      if (counter && totalEsperadas > 0) {
        counter.textContent = `${totalEsperadas} foto${totalEsperadas !== 1 ? 's' : ''}`;
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
          img.onerror = () => {
            li.style.display = 'none';
            // Si una foto no carga, descuenta del contador
            fotosError++;
            const real = totalEsperadas - fotosError;
            if (counter) counter.textContent = `${real} foto${real !== 1 ? 's' : ''}`;
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

  fetch(basePath('data/blog.json'))
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

  fetch(basePath('data/blog.json'))
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar blog.json');
      return r.json();
    })
    .then(entradas => {

      // Layouts disponibles para variedad visual
      const layouts = ['card-normal', 'card-wide', 'card-normal', 'card-tall'];

      entradas.forEach((entrada, index) => {
        const article = document.createElement('article');
        const layout  = layouts[index % layouts.length];
        article.className = `blog-card ${layout}`;
        article.id = entrada.id;

        const linkHref  = entrada.link || (basePath('entrada.html') + '?id=' + entrada.id);
        const linkTexto = entrada.link_texto || 'Leer';
        const isExternal = entrada.link && entrada.link.startsWith('http');

        // Si tiene imagen, la card lleva foto
        const imgHtml = entrada.imagen
          ? `<div class="blog-card-img-wrap">
               <img src="${basePath('assets/images/' + entrada.imagen)}" alt="${entrada.titulo}" loading="lazy" class="blog-card-img">
             </div>`
          : '';

        article.innerHTML = `
          ${imgHtml}
          <div class="blog-card-content">
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

    fetch(basePath('data/blog.json'))
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


/**
 * Tabs de Términos & Privacidad
 * Al hacer click en un tab: scroll suave a la sección + marca el tab activo
 */
const terminosNavLinks = document.querySelectorAll('.terminos-nav-link');

if (terminosNavLinks.length > 0) {

  terminosNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Marcar activo
      terminosNavLinks.forEach(l => l.classList.remove('active-tab'));
      this.classList.add('active-tab');

      // Scroll suave a la sección
      const targetId = this.getAttribute('href').replace('#', '');
      const target   = document.getElementById(targetId);
      if (target) {
        const offset = 90; // altura del header fijo
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Al hacer scroll, actualizar qué tab está activo
  window.addEventListener('scroll', () => {
    const sections = ['terminos', 'privacidad'].map(id => document.getElementById(id)).filter(Boolean);
    let current = sections[0];

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section;
      }
    });

    if (current) {
      terminosNavLinks.forEach(link => {
        link.classList.toggle('active-tab', link.getAttribute('href') === '#' + current.id);
      });
    }
  }, { passive: true });
}


/**
 * =========================================
 * CONTACTO — Formulario funcional (mailto)
 * =========================================
 */
const contactoForm = document.getElementById('contacto-form');

if (contactoForm) {

  // Mostrar sección eco cuando el asunto es "descuento"
  const asuntoSelect = document.getElementById('asunto');
  const ecoSection   = document.getElementById('form-eco-section');

  if (asuntoSelect && ecoSection) {
    asuntoSelect.addEventListener('change', () => {
      ecoSection.style.display = asuntoSelect.value === 'descuento' ? 'flex' : 'none';
    });
  }

  // Preview nombre del archivo
  const fotoInput     = document.getElementById('foto-eco');
  const fileLabelText = document.getElementById('file-label-text');
  if (fotoInput && fileLabelText) {
    fotoInput.addEventListener('change', () => {
      fileLabelText.textContent = fotoInput.files[0]
        ? fotoInput.files[0].name
        : 'Subir foto (JPG, PNG · máx. 5MB)';
    });
  }

  // Enviar: genera enlace mailto con los datos del formulario
  contactoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre  = document.getElementById('nombre')?.value.trim() || '';
    const correo  = document.getElementById('correo')?.value.trim() || '';
    const asunto  = document.getElementById('asunto')?.value || '';
    const mensaje = document.getElementById('mensaje')?.value.trim() || '';

    if (!correo || !mensaje) {
      alert('Por favor completa los campos obligatorios (correo y mensaje).');
      return;
    }

    const asuntoMap = {
      pedido:       'Pedido - 1981.',
      descuento:    'Descuento ecológico 13% - 1981.',
      colaboracion: 'Colaboración - 1981.',
      devolucion:   'Cambio o devolución - 1981.',
      otro:         'Contacto - 1981.'
    };

    const subject = encodeURIComponent(asuntoMap[asunto] || 'Contacto - 1981.');
    const body    = encodeURIComponent(
      `Hola, soy ${nombre || 'alguien'} (${correo}).\n\n${mensaje}\n\n---\nEnviado desde el formulario de 1981.`
    );

    const submitBtn  = document.getElementById('contacto-submit');
    const submitText = document.getElementById('submit-text');
    if (submitBtn) submitBtn.setAttribute('aria-busy', 'true');
    if (submitText) submitText.textContent = 'Enviando...';

    setTimeout(() => {
      window.location.href = `mailto:1981@support.com?subject=${subject}&body=${body}`;

      // Mostrar éxito
      setTimeout(() => {
        contactoForm.style.display = 'none';
        const success = document.getElementById('contacto-success');
        if (success) success.style.display = 'block';
      }, 800);
    }, 400);
  });
}

// Reset del formulario de contacto
function resetForm() {
  const form    = document.getElementById('contacto-form');
  const success = document.getElementById('contacto-success');
  if (form)    { form.reset(); form.style.display = 'flex'; }
  if (success) success.style.display = 'none';
}


/**
 * =========================================
 * PRODUCTO — Carga dinámica desde productos.json
 * =========================================
 * URL: producto.html?id=camiseta-lino
 * Define productos en productos.json o usa los de ejemplo abajo
 */
const productoContenido = document.getElementById('producto-contenido');
const productoLoading   = document.getElementById('producto-loading');
const productoError     = document.getElementById('producto-error');

if (productoContenido) {

  const params     = new URLSearchParams(window.location.search);
  const productoId = params.get('id');

  if (!productoId) {
    productoLoading.style.display = 'none';
    productoError.style.display   = 'block';
  } else {
    fetch(basePath('data/productos.json'))
      .then(r => { if (!r.ok) throw new Error('404'); return r.json(); })
      .then(productos => {
        const p = productos.find(x => x.id === productoId);
        if (!p) throw new Error('not found');
        renderProducto(p);
      })
      .catch(() => {
        productoLoading.style.display = 'none';
        productoError.style.display   = 'block';
      });
  }
}

function renderProducto(p) {
  // Breadcrumb
  const bcNombre = document.getElementById('breadcrumb-nombre');
  if (bcNombre) bcNombre.textContent = p.nombre;

  // Meta
  document.title = `${p.nombre} - 1981.`;

  // Hero imagen
  const mainImg = document.getElementById('producto-img-main');
  if (mainImg && p.imagenes && p.imagenes.length > 0) {
    mainImg.src = basePath('assets/images/' + p.imagenes[0]);
    mainImg.alt = p.nombre;
  }

  // Thumbnails
  const thumbsWrap = document.getElementById('producto-thumbs');
  if (thumbsWrap && p.imagenes) {
    p.imagenes.forEach((imgSrc, i) => {
      const btn = document.createElement('button');
      btn.className = `producto-thumb ${i === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `Ver imagen ${i + 1}`);
      const img = document.createElement('img');
      img.src = basePath('assets/images/' + imgSrc);
      img.alt = '';
      btn.appendChild(img);
      btn.addEventListener('click', () => {
        if (mainImg) { mainImg.src = basePath('assets/images/' + imgSrc); }
        thumbsWrap.querySelectorAll('.producto-thumb').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
      });
      thumbsWrap.appendChild(btn);
    });
  }

  // Info
  document.getElementById('producto-tag').textContent    = p.categoria || '';
  document.getElementById('producto-nombre').textContent = p.nombre;
  document.getElementById('producto-precio').textContent = p.precio;
  document.getElementById('producto-desc').textContent   = p.descripcion;

  const stockEl = document.getElementById('producto-stock');
  if (stockEl) {
    stockEl.textContent  = p.stock ? 'En stock' : 'Sin stock';
    stockEl.className    = 'producto-stock ' + (p.stock ? 'en-stock' : 'sin-stock');
  }

  // Tallas
  const tallasGrid = document.getElementById('producto-tallas-grid');
  if (tallasGrid && p.tallas) {
    let tallaSeleccionada = null;
    const btnAgregar = document.getElementById('btn-agregar-carrito');

    p.tallas.forEach(t => {
      const btn = document.createElement('button');
      btn.className = `talla-btn ${!t.stock ? 'sin-stock' : ''}`;
      btn.textContent = t.nombre;
      btn.disabled = !t.stock;
      btn.addEventListener('click', () => {
        tallasGrid.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tallaSeleccionada = t.nombre;
        if (btnAgregar) btnAgregar.disabled = false;
      });
      tallasGrid.appendChild(btn);
    });
  }

  // Botón agregar al carrito
  const btnAgregar = document.getElementById('btn-agregar-carrito');
  if (btnAgregar) {
    btnAgregar.addEventListener('click', () => {
      const talla = document.querySelector('.talla-btn.active')?.textContent;
      if (!talla) return;
      carritoAgregar({ id: p.id, nombre: p.nombre, precio: p.precio_num, imagen: p.imagenes?.[0] || null, talla });
      btnAgregar.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span class="span">¡Agregado!</span>';
      setTimeout(() => {
        btnAgregar.innerHTML = '<ion-icon name="bag-outline"></ion-icon><span class="span">Agregar al carrito</span>';
      }, 1800);
    });
  }

  // Detalles
  const detallesEl = document.getElementById('producto-detalles');
  if (detallesEl && p.detalles) {
    p.detalles.forEach(d => {
      const row = document.createElement('div');
      row.className = 'detalle-row';
      row.innerHTML = `<span class="detalle-label">${d.label}</span><span>${d.valor}</span>`;
      detallesEl.appendChild(row);
    });
  }

  // Mostrar
  productoLoading.style.display   = 'none';
  productoContenido.style.display = 'block';
}


/**
 * =========================================
 * CARRITO — Estado en memoria (sessionStorage fallback)
 * =========================================
 */

function carritoGetItems() {
  try {
    return JSON.parse(sessionStorage.getItem('carrito_1981') || '[]');
  } catch { return []; }
}

function carritoSetItems(items) {
  try { sessionStorage.setItem('carrito_1981', JSON.stringify(items)); } catch {}
  carritoActualizarBadge();
}

function carritoAgregar(item) {
  const items = carritoGetItems();
  const key   = item.id + '_' + item.talla;
  const exist = items.find(i => i.id + '_' + i.talla === key);
  if (exist) { exist.qty++; }
  else { items.push({ ...item, qty: 1 }); }
  carritoSetItems(items);
}

function carritoActualizarBadge() {
  const items = carritoGetItems();
  const total = items.reduce((s, i) => s + i.qty, 0);

  // Busca por id (navbar badge) y por data attribute (por si hay más)
  const badges = [
    document.getElementById('carrito-badge'),
    ...document.querySelectorAll('[data-carrito-badge]')
  ].filter(Boolean);

  badges.forEach(el => {
    el.textContent = total > 0 ? total : '';
    el.style.display = total > 0 ? 'inline-flex' : 'none';
  });
}

// Inicializar badge al cargar cualquier página
carritoActualizarBadge();


/**
 * CARRITO — Página carrito.html
 */
const carritoItemsEl = document.getElementById('carrito-items');

if (carritoItemsEl) {
  renderCarrito();

  document.getElementById('btn-aplicar-codigo')?.addEventListener('click', () => {
    const codigo    = document.getElementById('codigo-eco')?.value.trim().toUpperCase();
    const feedback  = document.getElementById('eco-feedback');
    const ecoRow    = document.getElementById('carrito-eco-row');

    if (codigo === 'ECO1981') {
      if (feedback) { feedback.textContent = '✓ Descuento aplicado'; feedback.className = 'carrito-eco-feedback ok'; }
      if (ecoRow)   ecoRow.style.display = 'flex';
      renderCarritoTotales(true);
    } else {
      if (feedback) { feedback.textContent = 'Código no válido'; feedback.className = 'carrito-eco-feedback err'; }
      if (ecoRow)   ecoRow.style.display = 'none';
      renderCarritoTotales(false);
    }
  });
}

function renderCarrito() {
  const items      = carritoGetItems();
  const layout     = document.getElementById('carrito-layout');
  const empty      = document.getElementById('carrito-empty');
  const countEl    = document.getElementById('carrito-count');
  const itemsEl    = document.getElementById('carrito-items');

  if (!itemsEl) return;

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  if (countEl) countEl.textContent = `${totalItems} producto${totalItems !== 1 ? 's' : ''}`;

  if (items.length === 0) {
    if (layout) layout.style.display = 'none';
    if (empty)  empty.style.display  = 'block';
    return;
  }

  if (layout) layout.style.display = '';
  if (empty)  empty.style.display  = 'none';
  itemsEl.innerHTML = '';

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'carrito-item';
    const imgSrc = item.imagen ? basePath('assets/images/' + item.imagen) : '';
    el.innerHTML = `
      <div class="carrito-item-img">
        ${imgSrc ? `<img src="${imgSrc}" alt="${item.nombre}" loading="lazy">` : ''}
      </div>
      <div class="carrito-item-info">
        <p class="carrito-item-name">${item.nombre}</p>
        <p class="carrito-item-meta">Talla: ${item.talla}</p>
        <div class="carrito-item-actions">
          <div class="carrito-qty">
            <button class="carrito-qty-btn" onclick="carritoModQty('${item.id}','${item.talla}',-1)">−</button>
            <span class="carrito-qty-val">${item.qty}</span>
            <button class="carrito-qty-btn" onclick="carritoModQty('${item.id}','${item.talla}',1)">+</button>
          </div>
          <button class="carrito-item-remove" onclick="carritoEliminar('${item.id}','${item.talla}')">Eliminar</button>
        </div>
      </div>
      <span class="carrito-item-price">$${(item.precio * item.qty).toLocaleString()}</span>
    `;
    itemsEl.appendChild(el);
  });

  renderCarritoTotales(false);
}

function carritoModQty(id, talla, delta) {
  const items = carritoGetItems();
  const item  = items.find(i => i.id === id && i.talla === talla);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  carritoSetItems(items);
  renderCarrito();
}

function carritoEliminar(id, talla) {
  const items = carritoGetItems().filter(i => !(i.id === id && i.talla === talla));
  carritoSetItems(items);
  renderCarrito();
}

function renderCarritoTotales(conDescuento) {
  const items    = carritoGetItems();
  const subtotal = items.reduce((s, i) => s + i.precio * i.qty, 0);
  const descuento = conDescuento ? Math.round(subtotal * 0.13) : 0;
  const total    = subtotal - descuento;

  const fmt = n => '$' + n.toLocaleString();
  const el  = s => document.getElementById(s);

  if (el('carrito-subtotal')) el('carrito-subtotal').textContent = fmt(subtotal);
  if (el('carrito-descuento')) el('carrito-descuento').textContent = '-' + fmt(descuento);
  if (el('carrito-total')) el('carrito-total').textContent = fmt(total);
}

function finalizarPedido() {
  const items = carritoGetItems();
  if (items.length === 0) return;

  const lineas = items.map(i => `- ${i.nombre} (Talla: ${i.talla}) x${i.qty} = $${(i.precio * i.qty).toLocaleString()}`).join('\n');
  const total  = items.reduce((s, i) => s + i.precio * i.qty, 0);

  const body = encodeURIComponent(`Hola, me gustaría hacer el siguiente pedido:\n\n${lineas}\n\nTotal: $${total.toLocaleString()}\n\n---\nEnviado desde el carrito de 1981.`);
  window.location.href = `mailto:1981@support.com?subject=${encodeURIComponent('Pedido - 1981.')}&body=${body}`;
}
