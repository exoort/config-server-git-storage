/* eslint-disable */

declare namespace NodeJS {
    export interface ProcessEnv {
        SERVER_PORT?: string ;
        SERVER_HOST?: string;
        REPO_LINK?: string;
        ALLOWED_CORS?: string;
        API_TOKEN?: string;
    }
}
