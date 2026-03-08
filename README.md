<div align="center">

# 1981.

**Clothing for the 20s**

*Moda ecológica · underground · Y2K · un poco de café y poesía*

---

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-blue)](#)
[![Páginas](https://img.shields.io/badge/páginas-3-green)](#estructura-del-proyecto)
[![Licencia](https://img.shields.io/badge/licencia-personal-lightgrey)](#)

</div>

---

## ¿Qué es esto?

Sitio web oficial de **1981.**, una marca de ropa creada por hobbie que mezcla estética Y2K, diseño underground y principios ecológicos. El sitio está construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin dependencias pesadas.

---

## Estructura del proyecto

```
1981-main/
│
├── index.html              # Página principal (home)
├── lookbook.html           # Galería del lookbook (carga imágenes desde JSON)
├── blog.html               # Blog de la marca
├── imagenes.json           # Lista de imágenes del lookbook (se carga dinámicamente)
├── favicon.svg             # Ícono del sitio
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos globales, variables, componentes reutilizables
│   │   └── blog.css        # Estilos específicos para la página del blog
│   │
│   ├── js/
│   │   └── script.js       # Navbar toggle, scroll header, lookbook dinámico
│   │
│   ├── fonts/
│   │   ├── font.css        # Declaraciones @font-face
│   │   ├── ClashDisplay-Semibold.woff2   # Fuente para títulos
│   │   └── lookbook.ttf    # Fuente decorativa para el título del lookbook
│   │
│   └── images/
│       ├── logo.svg
│       ├── hero-banner.png
│       ├── hero-shape-1.png
│       ├── hero-shape-2.png
│       ├── offer-bg.png
│       ├── footer-shape-1.png
│       ├── footer-shape-2.png
│       ├── footer-shape-3.png
│       ├── product-1.png … product-9.png   # Imágenes de productos
│       │
│       └── lookbook/
│           ├── foto3.png
│           ├── foto4.png
│           └── foto5.png   # Las fotos del lookbook van aquí
│
└── README.md
```

---

## Páginas

| Archivo | Descripción |
|---|---|
| `index.html` | Home: hero, productos top, sección "New", oferta del 13% |
| `lookbook.html` | Galería masonry cargada dinámicamente desde `imagenes.json` |
| `blog.html` | Entradas del blog: cultura, moda, ecología |

---

## Cómo agregar fotos al Lookbook

El lookbook carga sus imágenes de forma dinámica — no hay que tocar el HTML.

1. Copia la imagen a `assets/images/lookbook/`
2. Abre `imagenes.json` y agrega el nombre del archivo:

```json
[
  "foto3.png",
  "foto4.png",
  "foto5.png",
  "tu-nueva-foto.png"
]
```

3. Listo. La foto aparece automáticamente en el lookbook con el botón de guardar.

> **Nota:** Las imágenes deben estar en formato `.png`, `.jpg` o `.webp`. Si una imagen no existe, el script la oculta automáticamente sin romper la página.

---

## Cómo correr el proyecto localmente

El sitio es HTML estático puro. La única consideración es que el lookbook usa `fetch()` para leer `imagenes.json`, por lo que necesita un servidor local (no funciona abriendo el archivo directamente en el navegador).

**Opción A — VS Code (recomendado):**
Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) y haz clic en "Go Live".

**Opción B — Python:**
```bash
# Desde la carpeta del proyecto:
python -m http.server 3000
# Luego abre http://localhost:3000
```

**Opción C — Node.js:**
```bash
npx serve .
```

---

## Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--bg-deep-sea` | `hsl(210, 25%, 35%)` | Hero, botones secundarios, header del blog |
| `--bg-light-sand` | `hsl(38, 40%, 95%)` | Fondo principal del sitio |
| `--bg-sky-blue` | `hsl(190, 20%, 55%)` | Botones primarios |
| `--bg-accent-gold` | `hsl(35, 30%, 70%)` | Hover states, acentos |
| `--bg-stone-gray` | `hsl(210, 5%, 80%)` | Placeholder de imágenes |
| `--text-dark-stone` | `hsl(210, 11%, 15%)` | Texto principal |
| `--text-deep-sea` | `hsl(210, 30%, 20%)` | Precios, acentos de texto |

---

## Tipografías

| Fuente | Uso | Archivo |
|---|---|---|
| **ClashDisplay Semibold** | Títulos, botones, precios | `ClashDisplay-Semibold.woff2` |
| **LookbookFont** | Título de la página Lookbook | `lookbook.ttf` |
| **Inter** (Google Fonts) | Texto de cuerpo, navegación | CDN |

---

## Descuento ecológico

La sección de oferta menciona un **13% de descuento** para personas que manden una foto reciclando o donando. Para activarlo, el usuario escribe a `1981@support.com` con su foto y se le envía el código manualmente.

---

## Tecnologías

- HTML5 semántico
- CSS3 (custom properties, grid, flexbox, media queries)
- JavaScript ES6+ vanilla
- [Ionicons 5.5.2](https://ionic.io/ionicons) para íconos
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)

---

## Estado del proyecto

- [x] Página principal (home)
- [x] Lookbook dinámico con descarga
- [x] Blog
- [ ] Página de producto individual
- [ ] Carrito de compras
- [ ] Formulario de contacto funcional
- [ ] Página "Nuestro equipo"
- [ ] Página "Medidas"
- [ ] Términos & Condiciones / Política de privacidad

---

<div align="center">

*"Tu estilo, tu regla, nuestra ropa."*

**© 2026 1981.**

</div>
