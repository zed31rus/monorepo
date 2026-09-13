import CorsWebWrapper from '#web/wrappers/cors.js';
import RateLimiterWebWrapper from '#web/wrappers/rateLimiter.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import WebWrapperContainer from './wrapper.js';
import coreContainer from '#core/containers/index.js';
import WebHandlerContainer from './handler.js';
import ErrorWebHandler from '#web/handlers/error.js';
import WebOpenApiContainer from './openapi.js';
import DailyTrackWebOpenAPI from '#web/openapi/external/dailyTrack.js';
import WebModuleContainer from './module.js';
import DailyTrackWebModule from '#web/modules/dailyTrack.js';
import WebServerContainer from './server.js';
import ExternalWebServer from '#web/servers/external.js';

const utilsDeps = [coreContainer] as const;

const wrappers = new WebWrapperContainer(
	new RateLimiterWebWrapper(...utilsDeps),
	new CorsWebWrapper(...utilsDeps)
);

const handlersDeps = [wrappers, ...utilsDeps] as const;

const handlers = new WebHandlerContainer(new ErrorWebHandler(...handlersDeps));

const openapiDeps = [handlers, ...handlersDeps] as const;

const openapi = new WebOpenApiContainer(new DailyTrackWebOpenAPI(...openapiDeps));

const modulesDeps = [openapi, ...openapiDeps] as const;

const modules = new WebModuleContainer(new DailyTrackWebModule(...modulesDeps));

const serverDeps = [modules, ...modulesDeps] as const;

const serverContainer = new WebServerContainer(
	new ExternalWebServer(new OpenAPIHono(), ...serverDeps)
);

export default { serverContainer };
