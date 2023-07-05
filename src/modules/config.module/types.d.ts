declare namespace fastify {
    export const configModule: {
        serverPort?:  number | string,
        memoryProfilerEnabled?: boolean,
        repoLink?: string,
        allowedCors?: string,
        apiToken?: boolean,
        redis: {
            host: string,
            port: number,
            password?: string,
        }
    }
}
