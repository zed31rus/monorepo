import { OpenAPIHono } from '@hono/zod-openapi';
import WebDtoContainer from '#web/containers/dto.js';
import CookieWebDto from '#web/dto/cookie.js';
import FileWebDto from '#web/dto/file.js';
import WebWrapperContainer from '#web/containers/wrapper.js';
import ValidatorWebWrapper from '#web/wrappers/validator.js';
import RateLimiterWebWrapper from '#web/wrappers/rateLimiter.js';
import CorsWebWrapper from '#web/wrappers/cors.js';
import WebManagerContainer from '#web/containers/managers.js';
import SessionWebManager from '#web/managers/session.js';
import WebMiddlewareContainer from '#web/containers/middleware.js';
import FileWebMiddleware from '#web/middleware/file.js';
import AuthWebMiddleware from '#web/middleware/auth.js';
import WebHandlerContainer from '#web/containers/handler.js';
import AuthWebHandler from '#web/handlers/auth.js';
import FileWebHandler from '#web/handlers/file.js';
import ErrorWebHandler from '#web/handlers/error.js';
import WebOpenAPIContainer from '#web/containers/openapi.js';
import WebModuleContainer from './module.js';
import WebServerContainer from '#web/containers/server.js';
import ExternalServer from '#web/servers/external.js';
import coreContainer from '#core/containers/index.js';
import UsersInternalModule from '#web/modules/internal/users.js';
import AccountExternalWebOpenAPI from '#web/openapi/external/account.js';
import AuthExternalWebOpenAPI from '#web/openapi/external/auth.js';
import MeExternalWebOpenAPI from '#web/openapi/external/me.js';
import UsersExternalWebOpenAPI from '#web/openapi/external/users.js';
import DiscordOauthExternalWebOpenAPI from '#web/openapi/external/oauth/discord.js';
import UsersInternalWebOpenAPI from '#web/openapi/internal/users.js';
import AccountExternalModule from '#web/modules/external/account.js';
import AuthExternalModule from '#web/modules/external/auth.js';
import MeExternalModule from '#web/modules/external/me.js';
import UsersExternalModule from '#web/modules/external/users.js';
import DiscordOauthExternalModule from '#web/modules/external/oauth/discord.js';
import InternalWebServer from '#web/servers/internal.js';

const dto = new WebDtoContainer(new CookieWebDto(), new FileWebDto());

const utilsDeps = [coreContainer] as const;

const wrappers = new WebWrapperContainer(
	new ValidatorWebWrapper(...utilsDeps),
	new RateLimiterWebWrapper(...utilsDeps),
	new CorsWebWrapper(...utilsDeps)
);

const managers = new WebManagerContainer(new SessionWebManager(...utilsDeps));

const middlewareDeps = [dto, wrappers, managers, ...utilsDeps] as const;

const middlewares = new WebMiddlewareContainer(
	new AuthWebMiddleware(...middlewareDeps),
	new FileWebMiddleware(...middlewareDeps)
);

const handlersDeps = [middlewares, ...middlewareDeps] as const;

const handlers = new WebHandlerContainer(
	new AuthWebHandler(...handlersDeps),
	new FileWebHandler(...handlersDeps),
	new ErrorWebHandler(...handlersDeps)
);

const openapiDeps = [handlers, ...handlersDeps] as const;

const openapi = new WebOpenAPIContainer(
	{
		account: new AccountExternalWebOpenAPI(...openapiDeps),
		auth: new AuthExternalWebOpenAPI(...openapiDeps),
		me: new MeExternalWebOpenAPI(...openapiDeps),
		users: new UsersExternalWebOpenAPI(...openapiDeps),
		oauth: { discord: new DiscordOauthExternalWebOpenAPI(...openapiDeps) },
	},
	{
		users: new UsersInternalWebOpenAPI(...openapiDeps),
	}
);

const modulesDeps = [openapi, ...openapiDeps] as const;

const modules = new WebModuleContainer(
	{
		account: new AccountExternalModule(...modulesDeps),
		auth: new AuthExternalModule(...modulesDeps),
		me: new MeExternalModule(...modulesDeps),
		users: new UsersExternalModule(...modulesDeps),

		oauth: {
			discord: new DiscordOauthExternalModule(...modulesDeps),
		},
	},
	{
		users: new UsersInternalModule(...modulesDeps),
	}
);

const serverDeps = [modules, ...modulesDeps] as const;

const serverContainer = new WebServerContainer(
	new ExternalServer(new OpenAPIHono(), ...serverDeps),
	new InternalWebServer(new OpenAPIHono(), ...serverDeps)
);

export default { serverContainer };
