<div align="center">

# 1981.
**Clothing for the 20s**

*Moda ecológica · underground · Y2K*

🌐 [lawuk.github.io/1981](https://lawuk.github.io/1981)

</div>

---

## Estructura del proyecto

```
1981/
├── index.html          # Home — hero, productos, oferta 13%
├── lookbook.html       # Galería por volúmenes
├── blog.html           # Blog
├── entrada.html        # Entrada individual del blog
├── medidas.html        # Guía de tallas
├── terminos.html       # Términos & Privacidad
├── equipo.html         # Nuestro equipo
├── contacto.html       # Formulario de contacto
├── producto.html       # Página de producto individual
├── carrito.html        # Carrito de compras
│
├── data/               # ← Todos los JSON aquí
│   ├── productos.json
│   ├── blog.json
│   └── imagenes.json
│
└── assets/
    ├── css/            # Un archivo CSS por página
    │   ├── style.css
    │   ├── blog.css
    │   ├── lookbook.css
    │   ├── entrada.css
    │   ├── medidas.css
    │   ├── terminos.css
    │   ├── equipo.css
    │   ├── contacto.css
    │   ├── producto.css
    │   └── carrito.css
    ├── js/
    │   └── script.js   # Todo el JS del sitio
    ├── fonts/
    │   ├── font.css
    │   ├── ClashDisplay-Semibold.woff2
    │   └── lookbook.ttf
    └── images/
        ├── logo.svg
        ├── product-1.png … product-9.png
        └── lookbook/   # Fotos del lookbook
```

---

## Agregar / editar productos

Edita **`data/productos.json`**. Cada producto:

```json
{
  "id": "slug-unico",
  "nombre": "Nombre",
  "categoria": "Superior",
  "precio": "$580",
  "precio_num": 580,
  "imagen_home": "product-X.png",
  "imagenes": ["product-X.png"],
  "descripcion": "Descripción corta.",
  "tallas": [
    { "nombre": "S", "stock": true },
    { "nombre": "M", "stock": true },
    { "nombre": "L", "stock": false }
  ],
  "detalles": [
    { "label": "Material", "valor": "100% algodón" }
  ],
  "stock": true
}
```

- Link al producto: `producto.html?id=slug-unico`
- Las imágenes van en `assets/images/`

---

## Agregar entradas al Blog

Agrega al **inicio** de **`data/blog.json`**:

```json
{
  "id": "slug-unico",
  "tag": "Moda",
  "fecha": "Mar 2026",
  "minutos": 4,
  "imagen": null,
  "titulo": "Título del artículo",
  "resumen": "Texto de la tarjeta.",
  "cuerpo": ["Párrafo 1.", "Párrafo 2."],
  "link": null
}
```

El campo `imagen` es opcional — si lo usas, sube la foto a `assets/images/` y pon la ruta relativa.

---

## Agregar fotos al Lookbook

Edita **`data/imagenes.json`**:

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

Sube las fotos a `assets/images/lookbook/`.

---

## Carrito de compras

El carrito guarda los productos en `sessionStorage` del navegador (se limpia al cerrar la pestaña). Para finalizar un pedido, genera un correo con el resumen a `1981@support.com`.

- **Ícono de carrito** visible en la navbar de todas las páginas con badge de cantidad
- **Código de descuento ecológico:** `ECO1981` aplica el 13%
- Para agregar un producto al carrito hay que seleccionar talla primero en `producto.html`

---

## Formulario de contacto

Usa `mailto:` — abre el cliente de correo del usuario con los datos pre-llenados. Para un formulario con backend real, conectar [Formspree](https://formspree.io) o [Netlify Forms](https://www.netlify.com/products/forms/).

---

## Correr localmente

Necesitas servidor local (por los `fetch()` de JSON):

```bash
python -m http.server 3000
# o
npx serve .
```

---

## Estado del proyecto

- [x] Home con productos dinámicos
- [x] Lookbook por volúmenes
- [x] Blog con entradas individuales
- [x] Guía de medidas
- [x] Términos & Privacidad
- [x] Nuestro equipo
- [x] Formulario de contacto
- [x] Página de producto individual
- [x] Carrito con badge en navbar
- [ ] Backend real para formulario
- [ ] Pasarela de pago

---

*© 2026 1981.*
