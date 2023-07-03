import fastify from 'fastify';

import { startMemoryProfiler } from './utils/profiler.utile.mjs';

export const createApp = () => fastify({
  logger: true,
  disableRequestLogging: true,
});

const start = (app) => {
  const onListen = async (err) => {
    if (app.configModule.memoryProfilerEnabled) {
      startMemoryProfiler();
    }

    await app.cmsConfigsModule.refreshConfigStorage();
    setInterval(async () => {
      await app.cmsConfigsModule.refreshConfigStorage()
    }, 2 * 60 * 1000);

    // eslint-disable-next-line no-console
    console.log(`app running on port ${app.configModule.serverPort}`);

    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  app.listen(
    {
      port: app.configModule.serverPort,
    },
    onListen,
  );
};

export const startApp = (app) => {
  start(app);
};
