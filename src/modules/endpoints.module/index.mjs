import { pipe } from '../../utils/pipe.utile.mjs';
import {serveConfigGetEndpoint} from "./core/serve-config.get.mjs";


export const useEndpointsModule = async (app) => {
  await pipe(
    serveConfigGetEndpoint,
  )(app);

  return app;
};
