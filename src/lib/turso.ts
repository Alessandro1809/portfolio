import { createClient } from "@libsql/client";

// En Cloudflare Workers (SSR), las variables de entorno de wrangler.jsonc 
// pueden estar en globalThis o en el objeto env del fetch handler.
// Astro las inyecta en import.meta.env solo si están disponibles en tiempo de build.
export const turso = createClient({
    url: import.meta.env.TURSO_DB_URL || (globalThis as any).TURSO_DB_URL,
    authToken: import.meta.env.TURSO_AUTH_TOKEN || (globalThis as any).TURSO_AUTH_TOKEN,
})