import HttpErrors from 'http-errors';

export const checkRequestAuth = (request, app) => {
  const token = request.headers['x-api-token'];

  if (token !== app.configModule.apiToken) {
    throw new HttpErrors.Unauthorized('authorization required');
  }
};
