import {useConfigModule} from './modules/config.module/index.mjs';
import {useEndpointsModule} from './modules/endpoints.module/index.mjs';
import {useSecurityModule} from './modules/security.module/index.mjs';
import {useErrorHandlers} from './modules/errors.module/index.mjs';
import {useRedisModule} from "./modules/redis.module/index.mjs";

import {createApp, startApp} from './app.mjs';
import {pipe} from './utils/pipe.utile.mjs';
import {useCmsConfigsModule} from "./modules/cmsConfigs.module/index.mjs";

const init = () => {
    pipe(
        useConfigModule,
        useErrorHandlers,
        useSecurityModule,
        useRedisModule,
        useCmsConfigsModule,
        useEndpointsModule,
        startApp,
    )(createApp());
};

init();
