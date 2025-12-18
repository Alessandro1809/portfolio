# Guía de Integración del Blog

Esta guía explica cómo funciona la integración de los artículos del blog en el portafolio y cómo los componentes se enlazan entre sí.

## Flujo de Datos

1.  **Base de Datos (Turso):** Los artículos se almacenan en la tabla `posts` con campos como `title`, `content`, `slug`, `published`, etc.
2.  **Obtención de Datos (`BlogGrid.astro`):**
    *   Este componente realiza una consulta SQL a Turso para obtener todos los posts publicados.
    *   Se extrae el campo `slug` junto con otros metadatos (título, extracto, fecha).
3.  **Renderizado (`BlogCard.tsx`):**
    *   `BlogGrid` pasa los datos de cada post (incluido el `slug`) al componente `BlogCard`.
    *   `BlogCard` utiliza el `slug` para construir el enlace: `/blog/${post.slug}`.
    *   Al hacer clic en la tarjeta, el usuario es redirigido a la página dinámica del artículo.
4.  **Página Dinámica (`/pages/blog/[slug].astro`):**
    *   Esta página captura el `slug` de la URL.
    *   Realiza una nueva consulta a la base de datos para buscar el artículo específico por su `slug`.
    *   Renderiza el contenido completo del artículo.

## Cómo agregar un nuevo post

Para que un nuevo artículo aparezca y se enlace correctamente:

1.  Inserte una nueva fila en la tabla `posts` de su base de datos Turso.
2.  Asegúrese de que el campo `status` sea `'PUBLISHED'`.
3.  Proporcione un `slug` único (ej: `mi-nuevo-articulo`). Este será parte de la URL.
4.  El sistema automáticamente lo mostrará en el grid y generará el enlace correcto.

## Estructura de Componentes Clave

*   **`src/components/BlogGrid.astro`**: Controlador principal del grid.
*   **`src/components/cards/Blogcard.tsx`**: Componente visual de la tarjeta.
*   **`src/pages/blog/[slug].astro`**: Plantilla para la página individual del artículo.
