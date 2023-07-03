import ConfigNotFoundError from './errors/ConfigNotFoundError.mjs';

export { ConfigNotFoundError };

export const useErrorHandlers = (app) => {
  app.setErrorHandler((error, request, reply) => {
    let statusCode = error.statusCode || 500;

    reply.status(statusCode).send(error);
  });

  return app;
};
