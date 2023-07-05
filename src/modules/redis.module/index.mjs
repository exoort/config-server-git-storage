import redisModule from '@fastify/redis';

export const useRedisModule = async (app) => {
    app.register(redisModule, {
        url: app.configModule.redis.host,
        port: app.configModule.redis.port,
        password: app.configModule.redis.password
    });

    return app;
};
