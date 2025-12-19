import { createClient, type Client } from "@libsql/client/web";

export const getTursoClient = (url: string, authToken: string): Client => {
    return createClient({
        url,
        authToken,
    });
};