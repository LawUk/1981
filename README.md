<div align="center">

# 1981.

**Clothing for the 20s**

*Moda ecológica · underground · Y2K · un poco de café y poesía*

---

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-blue)](#)
[![Páginas](https://img.shields.io/badge/páginas-4-green)](#estructura-del-proyecto)
[![Licencia](https://img.shields.io/badge/licencia-personal-lightgrey)](#)

</div>

---

## ¿Qué es esto?

Sitio web oficial de **1981.**, una marca de ropa creada por hobbie que mezcla estética Y2K, diseño underground y principios ecológicos. Construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin dependencias pesadas.

---

## Estructura del proyecto

```
1981-main/
│
├── index.html              # Página principal (home)
├── lookbook.html           # Galería masonry + sección del blog
├── blog.html               # Blog de la marca (carga desde blog.json)
├── medidas.html            # Guía de tallas y medidas
│
├── imagenes.json           # Lista de fotos del lookbook (se carga dinámicamente)
├── blog.json               # Contenido de todas las entradas del blog
│
├── favicon.svg
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos globales, variables, componentes base
│   │   ├── blog.css        # Estilos del blog (blog.html + sección en lookbook)
│   │   ├── lookbook.css    # Estilos específicos de lookbook.html
│   │   └── medidas.css     # Estilos de la guía de medidas
│   │
│   ├── js/
│   │   └── script.js       # Navbar toggle, scroll header, lookbook y blog dinámicos
│   │
│   ├── fonts/
│   │   ├── font.css        # Declaraciones @font-face
│   │   ├── ClashDisplay-Semibold.woff2   # Fuente de títulos
│   │   └── lookbook.ttf    # Fuente decorativa del lookbook
│   │
│   └── images/
│       ├── logo.svg
│       ├── hero-banner.png
│       ├── hero-shape-1.png / hero-shape-2.png
│       ├── offer-bg.png
│       ├── footer-shape-1.png / footer-shape-2.png / footer-shape-3.png
│       ├── product-1.png … product-9.png
│       │
│       └── lookbook/
│           ├── foto3.png
│           ├── foto4.png
│           └── foto5.png
│
└── README.md
```

---

## Páginas

| Archivo | Descripción | Link activo en navbar |
|---|---|---|
| `index.html` | Home: hero, productos top, sección "New", oferta 13% | — |
| `lookbook.html` | Galería masonry + 3 entradas del blog al final | **Lookbook** (dorado) |
| `blog.html` | Grid de entradas cargado dinámicamente desde `blog.json` | **Blog** (dorado) |
| `medidas.html` | Guía de cómo medirse + tablas de tallas (superiores e inferiores) | — |

---

## Archivos de datos

### `imagenes.json`
Controla qué fotos aparecen en el lookbook. El JS las carga, inserta las tarjetas en el DOM y actualiza el contador de fotos. Si una imagen no existe, se oculta automáticamente sin romper la página.

```json
[
  "foto3.png",
  "foto4.png",
  "foto5.png"
]
```

Para agregar fotos: copia el archivo a `assets/images/lookbook/` y agrega su nombre al JSON.

### `blog.json`
Fuente de verdad de todas las entradas del blog. Tanto `blog.html` como el lookbook leen de aquí.

```json
[
  {
    "id": "slug-de-la-entrada",
    "tag": "Moda",
    "fecha": "Mar 2026",
    "minutos": 4,
    "titulo": "Título de la entrada",
    "resumen": "Texto corto que aparece en las tarjetas.",
    "cuerpo": ["Párrafo 1.", "Párrafo 2."],
    "link": null,
    "link_texto": "Leer"
  }
]
```

Para agregar una entrada nueva: agrega un objeto al inicio del array. El blog y el lookbook se actualizan automáticamente.

---

## Cómo correr el proyecto localmente

El lookbook y el blog usan `fetch()` para leer los JSON, por lo que necesitan un servidor local.

**Opción A — VS Code:**
Instala [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) → clic en "Go Live".

**Opción B — Python:**
```bash
python -m http.server 3000
# Abre http://localhost:3000
```

**Opción C — Node.js:**
```bash
npx serve .
```

---

## Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--bg-deep-sea` | `hsl(210, 25%, 35%)` | Heroes, botones secundarios |
| `--bg-light-sand` | `hsl(38, 40%, 95%)` | Fondo principal |
| `--bg-sky-blue` | `hsl(190, 20%, 55%)` | Botones primarios, íconos |
| `--bg-accent-gold` | `hsl(35, 30%, 70%)` | Hover, links activos del navbar |
| `--bg-stone-gray` | `hsl(210, 5%, 80%)` | Placeholder de imágenes, skeletons |
| `--text-dark-stone` | `hsl(210, 11%, 15%)` | Texto principal |
| `--text-deep-sea` | `hsl(210, 30%, 20%)` | Precios, acentos de texto |

---

## Tipografías

| Fuente | Uso | Fuente |
|---|---|---|
| **ClashDisplay Semibold** | Títulos, botones, precios, labels | `ClashDisplay-Semibold.woff2` |
| **LookbookFont** | Título del lookbook | `lookbook.ttf` |
| **Inter** | Cuerpo de texto | Google Fonts CDN |

---

## Descuento ecológico

**13% de descuento** para quienes manden una foto reciclando o donando a `1981@support.com`. Se responde manualmente con un código. Sin formularios complicados.

---

## Estado del proyecto

- [x] Página principal (home)
- [x] Lookbook dinámico con descarga y sección del blog
- [x] Blog dinámico cargado desde `blog.json`
- [x] Guía de medidas con tablas de tallas
- [ ] Página de producto individual
- [ ] Carrito de compras
- [ ] Formulario de contacto funcional
- [ ] Página "Nuestro equipo"
- [ ] Términos & Condiciones / Política de privacidad

---

<div align="center">

*"Tu estilo, tu regla, nuestra ropa."*

**© 2026 1981.**

</div>
