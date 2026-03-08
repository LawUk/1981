<div align="center">

# 1981.

**Clothing for the 20s**

*Moda ecológica · underground · Y2K · un poco de café y poesía*

---

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-blue)](#)
[![Páginas](https://img.shields.io/badge/páginas-5-green)](#estructura-del-proyecto)
[![Licencia](https://img.shields.io/badge/licencia-personal-lightgrey)](#)

</div>

---

## ¿Qué es esto?

Sitio web oficial de **1981.**, una marca de ropa creada por hobbie. Construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin dependencias pesadas.

---

## Estructura del proyecto

```
1981-main/
│
├── index.html              # Página principal (home)
├── lookbook.html           # Galería por volúmenes + sección del blog
├── blog.html               # Blog (carga desde blog.json)
├── medidas.html            # Guía de tallas
├── terminos.html           # Términos & Política de privacidad
│
├── imagenes.json           # Volúmenes del lookbook (ver abajo)
├── blog.json               # Entradas del blog (ver abajo)
├── favicon.svg
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos globales y componentes base
│   │   ├── blog.css        # Estilos del blog
│   │   ├── lookbook.css    # Estilos del lookbook
│   │   ├── medidas.css     # Estilos de medidas
│   │   └── terminos.css    # Estilos de términos
│   │
│   ├── js/
│   │   └── script.js       # Navbar, scroll, lookbook y blog dinámicos
│   │
│   ├── fonts/
│   │   ├── font.css
│   │   ├── ClashDisplay-Semibold.woff2
│   │   └── lookbook.ttf
│   │
│   └── images/
│       ├── logo.svg
│       ├── hero-banner.png
│       ├── hero-shape-1.png / hero-shape-2.png
│       ├── offer-bg.png
│       ├── footer-shape-1/2/3.png
│       ├── product-1.png … product-9.png
│       │
│       └── lookbook/
│           ├── 2025/
│           │   ├── foto3.png
│           │   ├── foto4.png
│           │   └── foto5.png
│           └── 2026/        ← carpeta para fotos nuevas
│
└── README.md
```

---

## Páginas

| Archivo | Descripción | Link activo en navbar |
|---|---|---|
| `index.html` | Home: hero, productos, oferta | — |
| `lookbook.html` | Galería por volúmenes + 3 entradas del blog | **Lookbook** (dorado) |
| `blog.html` | Grid de entradas desde `blog.json` | **Blog** (dorado) |
| `medidas.html` | Guía de cómo medirse + tablas de tallas | — |
| `terminos.html` | Términos y condiciones + política de privacidad | — |

---

## Cómo agregar fotos al Lookbook

### Agregar fotos al Vol. 1 (2025)
1. Copia la imagen a `assets/images/lookbook/2025/`
2. Agrega el nombre al array `fotos` del volumen 2025 en `imagenes.json`

### Agregar fotos al Vol. 2 (2026) — nuevo volumen
1. Copia la imagen a `assets/images/lookbook/2026/`
2. Agrega el nombre al array `fotos` del volumen 2026 en `imagenes.json`

```json
[
  {
    "volumen": "Vol. 2 — 2026",
    "carpeta": "lookbook/2026",
    "fotos": [
      "nueva-foto.png"
    ]
  },
  {
    "volumen": "Vol. 1 — 2025",
    "carpeta": "lookbook/2025",
    "fotos": [
      "foto3.png",
      "foto4.png",
      "foto5.png"
    ]
  }
]
```

Los volúmenes sin fotos se ocultan automáticamente. El más reciente va primero.

---

## Cómo agregar entradas al Blog

Agrega un objeto al **inicio** del array en `blog.json`:

```json
{
  "id": "slug-unico",
  "tag": "Moda",
  "fecha": "Mar 2026",
  "minutos": 4,
  "titulo": "Título de la entrada",
  "resumen": "Texto que aparece en las tarjetas.",
  "cuerpo": ["Párrafo 1.", "Párrafo 2."],
  "link": null,
  "link_texto": "Leer"
}
```

La nueva entrada aparece automáticamente en `blog.html` y en la sección del lookbook.

---

## Cómo correr el proyecto localmente

Necesitas un servidor local por los `fetch()`.

**VS Code:** [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) → "Go Live"

**Python:** `python -m http.server 3000` → `http://localhost:3000`

**Node:** `npx serve .`

---

## Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--bg-deep-sea` | `hsl(210, 25%, 35%)` | Heroes, botones secundarios |
| `--bg-light-sand` | `hsl(38, 40%, 95%)` | Fondo principal |
| `--bg-sky-blue` | `hsl(190, 20%, 55%)` | Botones primarios, íconos |
| `--bg-accent-gold` | `hsl(35, 30%, 70%)` | Hover, links activos |
| `--bg-stone-gray` | `hsl(210, 5%, 80%)` | Placeholders, skeletons |
| `--text-dark-stone` | `hsl(210, 11%, 15%)` | Texto principal |
| `--text-deep-sea` | `hsl(210, 30%, 20%)` | Precios, acentos |

---

## Estado del proyecto

- [x] Página principal (home)
- [x] Lookbook por volúmenes con descarga
- [x] Blog dinámico desde `blog.json`
- [x] Guía de medidas con tablas
- [x] Términos & Política de privacidad
- [ ] Página de producto individual
- [ ] Carrito de compras
- [ ] Formulario de contacto funcional
- [ ] Página "Nuestro equipo"

---

<div align="center">

*"Tu estilo, tu regla, nuestra ropa."*

**© 2026 1981.**

</div>
