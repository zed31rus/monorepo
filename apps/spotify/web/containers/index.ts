import CorsWrapper from '#web/wrappers/cors.js';
import RateLimiterWrapper from '#web/wrappers/rateLimiter.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import WrapperContainer from './wrapper.js';
import coreContainer from '#core/containers/index.js';
import HandlerContainer from './handler.js';
import ErrorHandler from '#web/handlers/error.js';
import OpenApiContainer from './openapi.js';
import DailyTrackOpenAPI from '#web/openapi/dailyTrack.js';
import ModuleContainer from './module.js';
import DailyTrackModule from '#web/modules/dailyTrack.js';
import ServerContainer from './server.js';
import ExternalServer from '#web/servers/external.js';

const utilsDeps = [coreContainer] as const;

const wrappers = new WrapperContainer(
	new RateLimiterWrapper(...utilsDeps),
	new CorsWrapper(...utilsDeps)
);

const handlersDeps = [wrappers, ...utilsDeps] as const;

const handlers = new HandlerContainer(new ErrorHandler(...handlersDeps));

const openapiDeps = [handlers, ...handlersDeps] as const;

const openapi = new OpenApiContainer(new DailyTrackOpenAPI(...openapiDeps));

const modulesDeps = [openapi, ...openapiDeps] as const;

const modules = new ModuleContainer(new DailyTrackModule(...modulesDeps));

const serverDeps = [modules, ...modulesDeps] as const;

const serverContainer = new ServerContainer(new ExternalServer(new OpenAPIHono(), ...serverDeps));

export default { serverContainer };
