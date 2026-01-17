import type { Client } from "@libsql/client/web";

export interface Env {
    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;
    RESEND_API_KEY: string;
    CONTACT_EMAIL: string;
}

declare global {
    namespace App {
        interface Locals {
            turso: Client;
            resendApiKey?: string;
            contactEmail?: string;
            lang?: string;
            runtime: {
                env: Env;
                cf?: any;
                ctx?: any;
            };
        }
    }
}
