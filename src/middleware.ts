// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { createDbClient } from "./lib/turso";

export const onRequest = defineMiddleware(async (context, next) => {
    // Cloudflare Pages stores variables in slightly different places depending on version/config
    const runtime = context.locals.runtime;

    // Attempt to get variables from all possible locations
    const TURSO_DB_URL =
        runtime?.env?.TURSO_DB_URL ||
        (context as any).env?.TURSO_DB_URL ||
        (globalThis as any).TURSO_DB_URL ||
        import.meta.env.TURSO_DB_URL;

    const TURSO_AUTH_TOKEN =
        runtime?.env?.TURSO_AUTH_TOKEN ||
        (context as any).env?.TURSO_AUTH_TOKEN ||
        (globalThis as any).TURSO_AUTH_TOKEN ||
        import.meta.env.TURSO_AUTH_TOKEN;

    if (!TURSO_DB_URL) {
        console.warn("[Middleware] TURSO_DB_URL is missing. Check Cloudflare Dashboard > Settings > Variables.");
        return next();
    }

    // Initialize Turso client and attach to locals.turso
    try {
        context.locals.turso = createDbClient({
            TURSO_DB_URL,
            TURSO_AUTH_TOKEN: TURSO_AUTH_TOKEN || "" // Ensure it's at least a string
        });
    } catch (e) {
        console.error("[Middleware] Failed to initialize Turso client:", e);
    }

    return next();
});
