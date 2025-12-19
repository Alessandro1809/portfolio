import { defineMiddleware } from "astro:middleware";
import { createDbClient } from "./lib/turso";

export const onRequest = defineMiddleware(async (context, next) => {
    // Attempt to get variables from Cloudflare Runtime (Production)
    // or from import.meta.env (Development)
    const runtime = context.locals.runtime;

    const TURSO_DB_URL = runtime?.env?.TURSO_DB_URL || import.meta.env.TURSO_DB_URL;
    const TURSO_AUTH_TOKEN = runtime?.env?.TURSO_AUTH_TOKEN || import.meta.env.TURSO_AUTH_TOKEN;

    context.locals.TURSO_DB_URL = TURSO_DB_URL;
    context.locals.TURSO_AUTH_TOKEN = TURSO_AUTH_TOKEN;

    // Initialize Turso client per request
    if (TURSO_DB_URL && TURSO_AUTH_TOKEN) {
        context.locals.turso = createDbClient({ TURSO_DB_URL, TURSO_AUTH_TOKEN });
    }

    return next();
});
