import { defineMiddleware } from "astro/middleware";
import { createClient } from "@libsql/client/web";

export const onRequest = defineMiddleware(async (context, next) => {
    context.locals.turso = createClient({
        url: context.env.TURSO_DB_URL,
        authToken: context.env.TURSO_AUTH_TOKEN,
    });

    return next();
});
