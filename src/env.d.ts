/// <reference types="astro/client" />
import type { Client } from "@libsql/client/web";

declare global {
    namespace App {
        interface Locals {
            TURSO_DB_URL: string;
            TURSO_AUTH_TOKEN: string;
            turso: Client;
            runtime: import("@astrojs/cloudflare").Runtime<Env>;
        }
    }
}

interface Env {
    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;
}
