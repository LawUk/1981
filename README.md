<div align="center">

# 1981.
**Clothing for the 20s**

*Moda ecológica · underground · Y2K · un poco de café y poesía*

</div>

---

## Estructura del proyecto

```
1981-main/
│
├── index.html          # Home
├── lookbook.html       # Galería por volúmenes
├── blog.html           # Blog (desde blog.json)
├── entrada.html        # Entrada individual del blog
├── medidas.html        # Guía de tallas
├── terminos.html       # Términos & Privacidad
├── equipo.html         # Nuestro equipo
├── contacto.html       # Formulario de contacto
├── producto.html       # Página de producto (desde productos.json)
├── carrito.html        # Carrito de compras
│
├── blog.json           # Entradas del blog
├── imagenes.json       # Volúmenes del lookbook
├── productos.json      # Catálogo de productos
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos globales
│   │   ├── blog.css
│   │   ├── lookbook.css
│   │   ├── entrada.css
│   │   ├── medidas.css
│   │   ├── terminos.css
│   │   ├── equipo.css
│   │   ├── contacto.css
│   │   ├── producto.css
│   │   └── carrito.css
│   ├── js/
│   │   └── script.js       # Todo el JS del sitio
│   ├── fonts/
│   └── images/
│       ├── lookbook/       # Fotos del lookbook (foto1.png, foto2.png, …)
│       └── product-1.png … # Imágenes de productos
│
└── README.md
```

> **Nota:** Los archivos CSS y JS están en `assets/` — no usar las carpetas `css/`, `js/`, `fonts/` sueltas de la raíz.

---

## Cómo agregar fotos al Lookbook

Edita `imagenes.json`:

```json
[
  {
    "volumen": "Vol. 2 — 2026",
    "carpeta": "lookbook",
    "fotos": ["nueva-foto.png"]
  },
  {
    "volumen": "Vol. 1 — 2025",
    "carpeta": "lookbook",
    "fotos": ["foto1.png", "foto2.png", "foto3.png"]
  }
]
```

Sube la imagen a `assets/images/lookbook/` y agrega el nombre al array `fotos`.

---

## Cómo agregar entradas al Blog

Agrega un objeto al **inicio** de `blog.json`:

```json
{
  "id": "slug-unico",
  "tag": "Moda",
  "fecha": "Mar 2026",
  "minutos": 4,
  "imagen": "blog/foto-portada.png",
  "titulo": "Título",
  "resumen": "Texto de la tarjeta.",
  "cuerpo": ["Párrafo 1.", "Párrafo 2."],
  "link": null
}
```

El campo `imagen` es opcional. Si lo incluyes, sube la imagen a `assets/images/blog/` y pon la ruta relativa desde `assets/images/`.

---

## Cómo agregar productos

Edita `productos.json`:

```json
{
  "id": "slug-producto",
  "nombre": "Nombre del producto",
  "categoria": "Superior",
  "precio": "$580",
  "precio_num": 580,
  "descripcion": "Descripción corta.",
  "imagenes": ["product-X.png"],
  "tallas": [
    {"nombre": "S", "stock": true},
    {"nombre": "M", "stock": true}
  ],
  "detalles": [
    {"label": "Material", "valor": "100% lino"}
  ],
  "stock": true
}
```

El link a la página del producto es: `producto.html?id=slug-producto`

---

## Formulario de contacto

El formulario abre el cliente de correo del usuario con los datos pre-llenados (sistema `mailto:`). Para un formulario con backend real, conecta un servicio como Formspree o Netlify Forms.

---

## Correr localmente

Necesitas servidor local por los `fetch()` de JSON.

```bash
python -m http.server 3000
# o
npx serve .
```

---

## Checklist

- [x] Home
- [x] Lookbook por volúmenes
- [x] Blog dinámico con imágenes
- [x] Entrada individual de blog
- [x] Guía de medidas
- [x] Términos & Privacidad
- [x] Nuestro equipo
- [x] Formulario de contacto
- [x] Página de producto individual
- [x] Carrito de compras
- [ ] Backend real para formulario (Formspree / Netlify)
- [ ] Pasarela de pago

---

*© 2026 1981.*
