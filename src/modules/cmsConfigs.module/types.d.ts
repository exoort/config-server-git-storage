declare namespace fastify {
    export const cmsConfigsModule: {
        refreshConfigStorage: () => Promise<void>,
        getConfigByDomain: (domain: string) => Promise<string>,
    }
}
