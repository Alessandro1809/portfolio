import { defineMiddleware } from "astro:middleware";
import { createDbClient } from "./lib/turso";

export const onRequest = defineMiddleware(async (context, next) => {
    // Robust environment variable detection
    const runtime = context.locals.runtime;

    const TURSO_DB_URL =
        runtime?.env?.TURSO_DB_URL ||
        (globalThis as any).TURSO_DB_URL ||
        (context as any).env?.TURSO_DB_URL ||
        import.meta.env.TURSO_DB_URL;

    const TURSO_AUTH_TOKEN =
        runtime?.env?.TURSO_AUTH_TOKEN ||
        (globalThis as any).TURSO_AUTH_TOKEN ||
        (context as any).env?.TURSO_AUTH_TOKEN ||
        import.meta.env.TURSO_AUTH_TOKEN;

    context.locals.TURSO_DB_URL = TURSO_DB_URL;
    context.locals.TURSO_AUTH_TOKEN = TURSO_AUTH_TOKEN;

    // Initialize Turso client and attach to locals.turso
    if (TURSO_DB_URL) {
        context.locals.turso = createDbClient({
            TURSO_DB_URL,
            TURSO_AUTH_TOKEN
        });
    } else {
        console.error("[Middleware] TURSO_DB_URL is missing! Blog posts will not load.");
    }

    return next();
});
