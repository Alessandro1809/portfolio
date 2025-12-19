import { defineMiddleware } from "astro:middleware";
import { getTursoClient } from "./lib/turso";

export const onRequest = defineMiddleware(async (context, next) => {
    // Attempt to get variables from multiple common Cloudflare/Astro locations
    const runtime = context.locals.runtime;


    const TURSO_DB_URL =
        runtime?.env?.TURSO_DB_URL ||
        (globalThis as any).TURSO_DB_URL ||
        (runtime as any)?.TURSO_DB_URL ||
        import.meta.env.TURSO_DB_URL;

    const TURSO_AUTH_TOKEN =
        runtime?.env?.TURSO_AUTH_TOKEN ||
        (globalThis as any).TURSO_AUTH_TOKEN ||
        (runtime as any)?.TURSO_AUTH_TOKEN ||
        import.meta.env.TURSO_AUTH_TOKEN;

    context.locals.TURSO_DB_URL = TURSO_DB_URL;
    context.locals.TURSO_AUTH_TOKEN = TURSO_AUTH_TOKEN;

    // Initialize Turso client per request
    context.locals.turso = getTursoClient(context.locals);

    if (!TURSO_DB_URL || !TURSO_AUTH_TOKEN) {
        console.warn("[Middleware] Turso credentials missing. Runtime:", !!runtime, "Env:", !!runtime?.env);
    }

    return next();
});
