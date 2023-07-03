export default class ConfigNotFoundError extends Error {
  constructor(domain) {
    const message = `Config not found for ${domain}`;

    super(message);

    this.statusCode = 404;

    Error.captureStackTrace(this, this.constructor);
  }
}
