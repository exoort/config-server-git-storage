import redisModule from '@fastify/redis';

export const useRedisModule = async (app) => {
    app.register(redisModule, {
        url: '127.0.0.1',
        port: 6379,
        password: ''
    });

    return app;
};
