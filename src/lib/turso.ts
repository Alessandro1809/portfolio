import { createClient } from "@libsql/client/web";

export default {
    async fetch(req, env) {
        const db = createClient({
            url: env.TURSO_DB_URL,
            authToken: env.TURSO_AUTH_TOKEN,
        });

        // test real
        return db.execute("SELECT 1")
            .then(() => new Response("OK"))
            .catch(err => new Response(err.message));
    }
};
