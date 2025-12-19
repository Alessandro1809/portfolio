import type { Client } from "@libsql/client/web";

export interface Env {
    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;
}

declare global {
    namespace App {
        interface Locals {
            turso: Client;
        }
    }
}
