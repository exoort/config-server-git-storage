import fastifyEnv from '@fastify/env';

const envSchema = {
  type: 'object',
  required: ['SERVER_PORT'],
  properties: {
    SERVER_PORT: {
      type: 'number',
      default: 3000,
    },
    MEMORY_PROFILER: {
      type: 'boolean',
      default: true,
    },
    ALLOWED_CORS: {
      type: 'string',
      separator: ',',
      default: '',
    },
    API_TOKEN: {
      type: 'string',
      default: '',
    },
    REPO_LINK: {
      type: 'string',
      default: '',
    },
  },
};

export const useConfigModule = async (app) => {
  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });

  await app.decorate('configModule', {
    get serverPort() {
      return app.config.SERVER_PORT;
    },

    get memoryProfilerEnabled() {
      return app.config.MEMORY_PROFILER;
    },

    get repoLink() {
      return app.config.REPO_LINK;
    },

    get allowedCors() {
      return app.config.ALLOWED_CORS;
    },

    get apiToken() {
      return app.config.API_TOKEN;
    },
  });

  return app;
};
