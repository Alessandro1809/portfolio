import { createClient, type Client } from '@libsql/client/web';

export function createDbClient(env: { TURSO_DB_URL: string; TURSO_AUTH_TOKEN?: string }): Client {
    return createClient({
        url: env.TURSO_DB_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    });
}