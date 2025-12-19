import { createClient, type Client } from "@libsql/client/web";

export const getTursoClient = (env: any): Client => {
    const url = env?.runtime?.env?.TURSO_DB_URL || env?.TURSO_DB_URL || import.meta.env.TURSO_DB_URL;
    const authToken = env?.runtime?.env?.TURSO_AUTH_TOKEN || env?.TURSO_AUTH_TOKEN || import.meta.env.TURSO_AUTH_TOKEN;

    return createClient({
        url,
        authToken,
    });
};