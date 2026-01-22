# Portfolio Personal — Alessandro Diaz

Sitio: https://alessandrodiaz.dev  
Estado: activo y en desarrollo continuo. Despliegue preparado para Cloudflare Pages.

## Resumen
Este repositorio contiene el portafolio personal de Alessandro Diaz. Es un sitio creado con Astro + React que muestra proyectos, experiencia, blog y canales de contacto, con soporte bilingue (ES/EN) y componentes interactivos.

## Funcionalidades reales
- Rutas principales: `/`, `/my-projects`, `/blog`, `/blog/[slug]`, `/hire-me`, `/unsubscribe`.
- Selector de idioma ES/EN con persistencia en cookie y SEO por locale.
- Blog dinamico desde Turso (libSQL) y render de contenido Tiptap.
- Newsletter y formulario de contacto via Resend (Astro Actions).
- SEO completo: Open Graph, JSON-LD, sitemap y metadata por pagina.
- Animaciones y UI interactiva con AOS, Motion y componentes React.

## Stack
- Astro 5 (output server) + React 19 + TypeScript
- Tailwind CSS v4 (configless)
- Motion, AOS
- Turso/libSQL para posts del blog
- Resend para emails (contacto y newsletter)
- Adapter de Cloudflare Pages

## Estructura del proyecto
```text
portfolio/
├── public/
├── src/
│   ├── actions/           # Astro Actions (contacto, newsletter)
│   ├── components/        # UI, cards y componentes React
│   ├── layouts/           # Layout base y SEO
│   ├── lib/               # i18n, DB y helpers
│   ├── pages/             # Rutas del sitio
│   └── styles/            # Estilos globales
├── astro.config.mjs
├── wrangler.toml
└── package.json
```

## Configuracion local
### Requisitos
- Node.js 18+
- pnpm

### Variables de entorno
Estas variables habilitan las funciones dinamicas del sitio:

| Variable | Uso | Requerida |
| --- | --- | --- |
| `TURSO_DB_URL` | Conexion a Turso para posts del blog | Si (blog) |
| `TURSO_AUTH_TOKEN` | Token de Turso | Si (blog) |
| `RESEND_API_KEY` | Envio de correos con Resend | Si (contacto/newsletter) |
| `RESEND_AUDIENCE_ID` | Audiencia de newsletter en Resend | Si (newsletter) |
| `CONTACT_EMAIL` | Email destino del formulario | Si (contacto) |
| `SITE_URL` | URL base para links de unsubscribe | Si (newsletter) |
| `PUBLIC_BLOG_API_URL` | Endpoint para tracking de vistas | Opcional |

Nota: si las variables no estan configuradas, el blog puede mostrarse vacio y los formularios devolveran error.

## Comandos
| Comando | Accion |
| --- | --- |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Servidor local en `localhost:4321` |
| `pnpm build` | Build de produccion |
| `pnpm preview` | Preview local del build |
| `pnpm astro ...` | CLI de Astro |

## Despliegue
- Configurado con `@astrojs/cloudflare` y `output: "server"` en `astro.config.mjs`.
- `wrangler.toml` contiene la configuracion base para Cloudflare Pages.

## Contacto
- LinkedIn: https://www.linkedin.com/in/alessandrodg/
- GitHub: https://github.com/Alessandro1809
- X (Twitter): https://x.com/ddiaz_ale
