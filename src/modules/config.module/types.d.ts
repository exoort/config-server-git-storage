declare namespace fastify {
    export const configModule: {
        serverPort?:  number | string,
        memoryProfilerEnabled?: boolean,
        repoLink?: string,
        allowedCors?: string,
        apiToken?: boolean,
    }
}
