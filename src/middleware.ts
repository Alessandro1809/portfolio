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

    const RESEND_API_KEY =
        runtime?.env?.RESEND_API_KEY ||
        (context as any).env?.RESEND_API_KEY ||
        (globalThis as any).RESEND_API_KEY ||
        import.meta.env.RESEND_API_KEY;

    const CONTACT_EMAIL =
        runtime?.env?.CONTACT_EMAIL ||
        (context as any).env?.CONTACT_EMAIL ||
        (globalThis as any).CONTACT_EMAIL ||
        import.meta.env.CONTACT_EMAIL;

    if (TURSO_DB_URL) {
        if (runtime?.env?.TURSO_DB_URL) console.log("[Middleware] Found TURSO_DB_URL in runtime.env");
        else if ((context as any).env?.TURSO_DB_URL) console.log("[Middleware] Found TURSO_DB_URL in context.env");
        else if (import.meta.env.TURSO_DB_URL) console.log("[Middleware] Found TURSO_DB_URL in import.meta.env");
    } else {
        console.warn("[Middleware] TURSO_DB_URL is missing. Sources checked: runtime.env, context.env, globalThis, import.meta.env");
        return next();
    }

    // Attach email config to locals
    context.locals.resendApiKey = RESEND_API_KEY;
    context.locals.contactEmail = CONTACT_EMAIL;
    
    if (RESEND_API_KEY) {
        console.log("[Middleware] RESEND_API_KEY found");
    } else {
        console.warn("[Middleware] RESEND_API_KEY is missing");
    }
    
    if (CONTACT_EMAIL) {
        console.log("[Middleware] CONTACT_EMAIL found:", CONTACT_EMAIL);
    } else {
        console.warn("[Middleware] CONTACT_EMAIL is missing");
    }

    // Initialize Turso client and attach to locals.turso
    try {
        context.locals.turso = createDbClient({
            TURSO_DB_URL,
            TURSO_AUTH_TOKEN: TURSO_AUTH_TOKEN || "" // Ensure it's at least a string
        });
        console.log("[Middleware] Turso client initialized successfully");
    } catch (e) {
        console.error("[Middleware] Failed to initialize Turso client:", e);
    }

    return next();
});
