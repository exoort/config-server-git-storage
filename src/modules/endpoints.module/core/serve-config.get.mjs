import {ConfigNotFoundError} from "../../errors.module/index.mjs";

const schema = {
    headers: {
        type: 'object',
        required: ['x-api-token'],
        properties: {
            'x-api-token': {type: 'string'},
        },
    },
    querystring: {
        type: 'object',
        required: ['domain'],
        properties: {
            domain: {type: 'string'},
        },
    },
};

export const serveConfigGetEndpoint = async (app) => {
    const url = '/config';

    await app.route({
        method: 'GET',
        path: url,
        schema,
        handler: async (request, reply) => {
            const {domain} = request.query;
            const response = await app.cmsConfigsModule.getConfigByDomain(domain);

            if (!response) {
                throw new ConfigNotFoundError(domain);
            }

            reply.send(response);
        },
    });

    return app;
};
