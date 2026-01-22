import type { Client } from "@libsql/client/web";

export interface Env {
    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;
    RESEND_API_KEY: string;
    RESEND_AUDIENCE_ID: string;
    CONTACT_EMAIL: string;
    SITE_URL?: string;
}

declare global {
    namespace App {
        interface Locals {
            turso: Client;
            resendApiKey?: string;
            resendAudienceId?: string;
            contactEmail?: string;
            siteUrl?: string;
            lang?: string;
            runtime: {
                env: Env;
                cf?: any;
                ctx?: any;
            };
        }
    }
}
