# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and Commands

This project is an Astro 5 site using `pnpm` as the package manager (see `pnpm-lock.yaml`). All commands below are run from the project root.

### Dependency installation

- Install dependencies: `pnpm install`

### Local development

- Start the development server: `pnpm dev`
  - Serves the site at `http://localhost:4321` by default.
- VS Code users can also use the "Development server" launch configuration defined in `.vscode/launch.json`, which runs `./node_modules/.bin/astro dev`.

### Build and preview

- Build for production: `pnpm build`
  - Outputs the static site to `dist/`.
- Preview the production build locally: `pnpm preview`

### Astro CLI utilities

- Run arbitrary Astro CLI commands: `pnpm astro <subcommand>`
  - Examples: `pnpm astro check`, `pnpm astro add <integration-name>`.

### Testing and linting

- There are currently **no** `test`, `lint`, or related scripts defined in `package.json`.
- If a test runner or linter is added (e.g. Vitest, ESLint), define the corresponding `pnpm` scripts (such as `test`, `test:watch`, `lint`) and update this section with the exact commands, including how to run a single test file.

## High-Level Architecture

### Framework and integrations

- The app is built with **Astro** using an **Astro + React** stack.
  - `astro.config.mjs` enables the React integration via `@astrojs/react` and configures the Vite plugin `@tailwindcss/vite` to power Tailwind CSS v4.
- TypeScript configuration (`tsconfig.json`) extends `astro/tsconfigs/strict` and sets up a `src`-rooted module resolution:
  - `baseUrl: ./src`
  - Path alias: `@/*` → `src/*`

### Routing and entry points

- Astro follows file-based routing under `src/pages`.
  - `src/pages/index.astro` is the current main (and only) page, rendered at `/`.
  - New routes should be created as additional `.astro` files under `src/pages`.
- `index.astro` composes the homepage from high-level sections:
  - Wraps everything in the shared layout from `@/layouts/Layout.astro`.
  - Renders feature sections from `@/components/ui` (e.g. `Hero`, `FeaturedProjects`) and the `AboutMe` section from `@/components/AboutMe.astro`.

### Layout and shared chrome

- `src/layouts/Layout.astro` defines the document skeleton and shared chrome:
  - Imports global styles from `src/styles/global.css`.
  - Renders shared `Header` and `Footer` components from `src/components/layoutComponents/`.
  - Wraps page content in a full-viewport container with a layered radial-gradient background.
- Use this layout as the base for additional pages to keep a consistent shell (header/footer, background, and global styles).

### Components and UI structure

The `src/components` tree is organized by role:

- **Layout components** (`src/components/layoutComponents/`)
  - `Header.astro` and `Footer.astro` provide the global navigation/footer frame used by `Layout.astro`.

- **Page sections and UI components** (`src/components/ui/`)
  - Section-level components such as `Hero.astro`, `FeaturedProjects.astro`, and `SocialLinks.astro` encapsulate major homepage sections and reusable UI blocks.
  - Subdirectories like `ui/buttons/` and `ui/icons/` contain smaller, composable pieces (e.g. `Button.astro` and SVG icon components such as `LinkedIn.astro`, `Twitter.astro`, `gitHub.astro`, `goIcon.astro`, `goToAll.astro`).

- **Content and card components** (`src/components/cards/`)
  - Components like `ImageCard.astro` encapsulate repeatable content patterns used by higher-level sections (e.g. the `AboutMe` section).

- **React components** (`src/components/react/`)
  - React-specific components (e.g. `Particles.tsx`) live here and are intended for interactive or stateful UI pieces that benefit from React.
  - They are consumed from `.astro` files via the React integration configured in `astro.config.mjs`.

- **Section composition**
  - `src/components/AboutMe.astro` is an example of a composed section that pulls together a card (`ImageCard`), a button component, and icon-based links to build a complete content block.

### Styling and design system

- Global styling is centralized in `src/styles/global.css`:
  - Imports Tailwind CSS via `@import "tailwindcss";` and animation utilities via `@import "tw-animate-css";`.
  - Defines a custom `dark` variant and theme tokens (e.g. `--color-primary-green`, `--color-dark-green`) used throughout the site.
- Tailwind CSS v4 is configured in a **configless** setup through the Vite plugin, so Tailwind configuration is handled via CSS and plugin options instead of a traditional `tailwind.config.*` file.

### Utilities and aliases

- `src/lib/utils.ts` exposes a single utility `cn`:
  - `cn(...inputs: ClassValue[])` combines `clsx` with `tailwind-merge` to safely merge conditional class names and resolve Tailwind conflicts.
  - Prefer using `cn` when building complex `class` / `className` values, especially in React components.
- `components.json` configures design-system metadata and aliases for the shadcn-style component tooling:
  - Declares aliases such as `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, and `@/hooks`.
  - Specifies the `new-york` style, `lucide` icon library, and Tailwind-related configuration (e.g. global CSS path and CSS variables).

### Assets and public files

- `public/` holds static assets served as-is (e.g. `favicon.svg`).
- `src/assets/` holds imported assets used within components (e.g. images referenced from `.astro` or `.tsx` files).

## Notes for Future Warp Sessions

- When introducing new pages or sections, prefer composing them from existing layout and UI primitives (layout components, `ui` components, and card components) to keep styling and structure consistent.
- If you add testing or linting infrastructure, update the "Testing and linting" section with concrete commands so future Warp agents can run checks and individual tests reliably.
