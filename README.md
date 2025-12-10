# 🚀 Portfolio Personal

<div align="center">

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Un portafolio moderno y dinámico construido con las últimas tecnologías web**

[Ver Demo](#) · [Reportar Bug](#) · [Solicitar Feature](#)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Comenzando](#-comenzando)
- [Comandos Disponibles](#-comandos-disponibles)
- [Componentes Destacados](#-componentes-destacados)
- [Personalización](#-personalización)
- [Despliegue](#-despliegue)
- [Contacto](#-contacto)

---

## 🎯 Acerca del Proyecto

Este portafolio personal representa una solución moderna y profesional para mostrar proyectos, experiencia laboral y habilidades técnicas. Construido con **Astro** como framework principal, combina la velocidad de sitios estáticos con la interactividad de componentes React, ofreciendo una experiencia de usuario excepcional.

### ✨ ¿Por qué este proyecto?

- **Rendimiento Óptimo**: Utiliza la arquitectura de islas de Astro para cargar JavaScript solo donde es necesario
- **Diseño Responsivo**: Adaptado perfectamente a dispositivos móviles, tablets y escritorio
- **Animaciones Fluidas**: Implementa animaciones suaves y profesionales con Motion y AOS
- **SEO Optimizado**: Estructura semántica y meta tags optimizados para motores de búsqueda
- **Mantenible**: Código limpio, modular y bien documentado

---

## 🌟 Características Principales

### 🎨 Interfaz de Usuario

- **Hero Section Dinámico**: Presentación impactante con animaciones y efectos visuales
- **Timeline Interactivo**: Visualización cronológica de experiencia laboral con efectos de scroll
- **Proyectos Destacados**: Showcase de proyectos con descripciones y enlaces
- **Sección About Me**: Presentación personal con información relevante
- **Formulario de Contacto**: Sistema de contacto integrado y funcional

### 🛠️ Componentes Avanzados

- **Radial Menu**: Menú radial animado para navegación interactiva
- **Mobile Dock**: Navegación móvil con efecto de magnificación tipo macOS
- **Header Responsivo**: Navegación adaptativa con transiciones suaves
- **Social Links**: Enlaces a redes sociales con iconos personalizados
- **Cards Interactivas**: Tarjetas con efectos hover y animaciones

### ⚡ Optimizaciones

- **Lazy Loading**: Carga diferida de componentes React
- **Optimización de Imágenes**: Procesamiento automático de assets
- **CSS Modular**: Estilos organizados con Tailwind CSS v4
- **TypeScript**: Tipado estático para mayor robustez

---

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **[Astro 5.15.8](https://astro.build)** - Framework web moderno para sitios rápidos
- **[React 19.2.0](https://react.dev)** - Biblioteca para componentes interactivos
- **[TypeScript](https://www.typescriptlang.org)** - Superset tipado de JavaScript

### Styling & Animations
- **[Tailwind CSS 4.1.17](https://tailwindcss.com)** - Framework CSS utility-first
- **[Motion 12.23.24](https://motion.dev)** - Biblioteca de animaciones para React
- **[AOS 2.3.4](https://michalsnik.github.io/aos/)** - Animate On Scroll library
- **[Class Variance Authority](https://cva.style)** - Gestión de variantes de componentes

### UI Components & Icons
- **[Lucide React](https://lucide.dev)** - Iconos modernos y personalizables
- **Custom Components** - Componentes propios desarrollados a medida

### Development Tools
- **[pnpm](https://pnpm.io)** - Gestor de paquetes eficiente
- **[Vite](https://vitejs.dev)** - Build tool ultrarrápido

---

## 📁 Estructura del Proyecto

```text
portfolio/
├── public/                    # Archivos estáticos
│   └── favicon.svg
├── src/
│   ├── assets/               # Recursos multimedia
│   │   ├── images/
│   │   └── icons/
│   ├── components/           # Componentes reutilizables
│   │   ├── cards/           # Componentes de tarjetas
│   │   ├── layoutComponents/ # Header, Footer, etc.
│   │   ├── react/           # Componentes React
│   │   │   ├── RadialMenu.tsx
│   │   │   ├── TimeLine.tsx
│   │   │   └── MobileDock.tsx
│   │   └── ui/              # Componentes UI
│   │       ├── Hero.astro
│   │       ├── FeaturedProjects.astro
│   │       ├── ContactSecction.astro
│   │       ├── buttons/
│   │       ├── forms/
│   │       └── icons/
│   ├── layouts/             # Layouts de página
│   │   └── Layout.astro
│   ├── lib/                 # Utilidades y helpers
│   ├── pages/               # Rutas de la aplicación
│   │   └── index.astro
│   └── styles/              # Estilos globales
├── astro.config.mjs         # Configuración de Astro
├── tsconfig.json            # Configuración de TypeScript
├── components.json          # Configuración de componentes
└── package.json             # Dependencias del proyecto
```

---

## 🚀 Comenzando

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **pnpm** (recomendado) o npm

```bash
# Instalar pnpm globalmente si no lo tienes
npm install -g pnpm
```

### Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/portfolio.git
cd portfolio
```

2. **Instala las dependencias**

```bash
pnpm install
```

3. **Inicia el servidor de desarrollo**

```bash
pnpm dev
```

4. **Abre tu navegador**

Visita `http://localhost:4321` para ver el proyecto en acción.

---

## 🧞 Comandos Disponibles

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias del proyecto |
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Construye el sitio de producción en `./dist/` |
| `pnpm preview` | Previsualiza la build de producción localmente |
| `pnpm astro ...` | Ejecuta comandos CLI de Astro (`astro add`, `astro check`) |
| `pnpm astro -- --help` | Obtén ayuda sobre los comandos de Astro |

---

## 🎨 Componentes Destacados

### RadialMenu

Menú radial interactivo con animaciones suaves y posicionamiento dinámico.

**Características:**
- Posicionamiento configurable (top, bottom, center)
- Radio ajustable
- Colores personalizables
- Animaciones de entrada/salida

### TimeLine

Componente de línea de tiempo para mostrar experiencia laboral de forma visual.

**Características:**
- Layout responsivo (vertical en móvil, zig-zag en desktop)
- Animaciones al hacer scroll
- Cards interactivas
- Iconos personalizables

### MobileDock

Dock de navegación móvil inspirado en macOS con efecto de magnificación.

**Características:**
- Efecto de magnificación al hover
- Animaciones fluidas
- Iconos SVG optimizados
- Totalmente responsivo

---

## 🎨 Personalización

### Colores y Tema

Los colores principales se pueden modificar en el archivo de configuración de Tailwind. El proyecto utiliza una paleta personalizada con:

- **Verde primario**: `#00D47C`
- **Púrpura secundario**: `#BC52EE`
- **Fondos oscuros** con gradientes radiales

### Contenido

1. **Información Personal**: Edita `src/components/ui/Hero.astro` y `src/components/AboutMe.astro`
2. **Proyectos**: Modifica `src/components/ui/FeaturedProjects.astro`
3. **Experiencia**: Actualiza los datos en `src/components/react/TimeLine.tsx`
4. **Redes Sociales**: Configura tus enlaces en `src/components/ui/SocialLinks.astro`

### Componentes

Todos los componentes están diseñados para ser modulares y reutilizables. Puedes:

- Agregar nuevos componentes en `src/components/`
- Crear variantes usando Class Variance Authority
- Extender funcionalidades con React hooks

---

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura el framework preset como "Astro"
3. Despliega automáticamente

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `pnpm build`
3. Publish directory: `dist`

### Otros Servicios

El proyecto es compatible con cualquier servicio que soporte sitios estáticos:
- GitHub Pages
- Cloudflare Pages
- AWS Amplify
- Firebase Hosting

Para más información, consulta la [documentación oficial de Astro sobre despliegue](https://docs.astro.build/en/guides/deploy/).

---

## 📞 Contacto

**Alessandro Díaz**

- Portfolio: [tu-portfolio.com](#)
- LinkedIn: [linkedin.com/in/tu-perfil](#)
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- [Astro](https://astro.build) por el increíble framework
- [Tailwind CSS](https://tailwindcss.com) por el sistema de diseño
- [Lucide](https://lucide.dev) por los hermosos iconos
- La comunidad de desarrolladores por la inspiración

---

<div align="center">

**⭐ Si este proyecto te resultó útil, considera darle una estrella ⭐**

Hecho con ❤️ y ☕ por Alessandro Díaz

</div>
