// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { createDbClient } from "./lib/turso";

export const onRequest = defineMiddleware(async (context, next) => {
    const { TURSO_DB_URL, TURSO_AUTH_TOKEN } = context.env;

    if (!TURSO_DB_URL || !TURSO_AUTH_TOKEN) {
        console.error("[Middleware] Missing Turso env vars");
        return next();
    }

    context.locals.turso = createDbClient({
        TURSO_DB_URL,
        TURSO_AUTH_TOKEN,
    });

    return next();
});
