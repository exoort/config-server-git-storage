import { readdir, readFile } from "fs";
import {gitClone} from "../../utils/commands.util.mjs";

const pathToConfigs = `${process.cwd()}/cmsConfigs`;

async function getFileContent(filePath) {
  return new Promise((resolve, reject) => {
    readFile(`${pathToConfigs}/${filePath}`, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const configJSON = data.toString();

      try {
        const testIsJSON = JSON.parse(configJSON);
      } catch (error) {
        reject(`must contains valid JSON`);
      }

      const domain = filePath.slice(0, -5).trim();

      try {
        const testLink = new URL(`https://${domain}/`);

        if (testLink.host !== domain) {
          reject(`must be a valid domain. Example: some-domain.com`);
        }
      } catch (error) {
        reject(`must be a valid domain. Example: some-domain.com`);
      }

      resolve({
        configJSON,
        domain,
      });
    });
  });
}

async function getConfigs()  {
  return new Promise((resolve) => {

    readdir(pathToConfigs, async (err, files) => {
      const getFileContents = files
          .filter((file) => file.endsWith('.json'))
          .map(async (file) => await getFileContent(file))

      const result = await Promise.allSettled(getFileContents);

      resolve(
          result.filter((item, index) => {
            if (item.status === "rejected") {
              console.error(`Failed to load config file ${files[index]}: ${item.reason.message}`);
            }

            return item.status === "fulfilled";
          }).map((item) => item.value)
      );
    });
  })
}

const REDIS_NAMESPACE = 'CMS_CONFIGS';

export const useCmsConfigsModule = async (app) => {
  const setCmsConfigs = async () => {
    const configs = await getConfigs();

    await app.redis.set('test', 'test')

    configs.forEach((cfgForDomain) => {
      const key = `${REDIS_NAMESPACE}:${cfgForDomain.domain}`;

      app.redis.set(key, cfgForDomain.configJSON);
    });
  };

  const refreshConfigStorage = async () => {
    await gitClone(app.configModule.repoLink);

    await setCmsConfigs();
  };

  const getConfigByDomain = async (domain) =>  {
    return new Promise((resolve, reject) => {
      const key = `${REDIS_NAMESPACE}:${domain}`;

      app.redis.get(key, (err, configJSON) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          resolve(configJSON);
        } catch (error) {
          reject(error);
        }
      });
    })
  }

  app.decorate('cmsConfigsModule', {
    refreshConfigStorage,
    getConfigByDomain,
  });

  return app;
};
