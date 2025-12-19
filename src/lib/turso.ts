import { createClient } from "@libsql/client/web";

export function createDbClient({
    TURSO_DB_URL,
    TURSO_AUTH_TOKEN,
}: {
    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;
}) {
    return createClient({
        url: TURSO_DB_URL,
        authToken: TURSO_AUTH_TOKEN,
    });
}
