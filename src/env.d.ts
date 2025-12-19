export interface Env {

    TURSO_DB_URL: string;
    TURSO_AUTH_TOKEN: string;

}

declare module 'astro' {
    interface Locals {
        runtime: {
            env: Env;
        };
    }
}