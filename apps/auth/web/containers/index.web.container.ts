import { OpenAPIHono } from '@hono/zod-openapi';
import DtoContainer from '#web/containers/dto.container.js';
import CookieDto from '#web/dto/cookie.dto.js';
import FileDto from '#web/dto/file.dto.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import ValidatorWrapper from '#web/wrappers/validator.wrapper.js';
import RateLimiterWrapper from '#web/wrappers/rateLimiter.wrapper.js';
import CorsWrapper from '#web/wrappers/cors.wrapper.js';
import WebManagerContainer from '#web/containers/managers.container.js';
import SessionWebManager from '#root/web/managers/session.manager.js';
import MiddlewareContainer from '#web/containers/middleware.container.js';
import FileMiddleware from '#web/middleware/file.middleware.js';
import AuthMiddleware from '#web/middleware/auth.middleware.js';
import HandlerContainer from '#web/containers/handler.container.js';
import AuthHandler from '#web/handlers/auth.handler.js';
import FileHandler from '#web/handlers/file.handler.js';
import ErrorHandler from '#web/handlers/error.handler.js';
import OpenAPIContainer from '#web/containers/openapi.container.js';
import ModuleContainer from './module.container.js';
import ServerContainer from '#web/containers/server.container.js';
import ExternalServer from '#web/servers/external.server.js';
import coreContainer from '#core/containers/index.container.js';
import UsersInternalModule from '#web/modules/internal/users.internal.module.js';
import AccountExternalOpenAPI from '#web/openapi/external/account.external.openapi.js';
import AuthExternalOpenAPI from '#web/openapi/external/auth.external.openapi.js';
import MeExternalOpenAPI from '#web/openapi/external/me.external.openapi.js';
import UsersExternalOpenAPI from '#web/openapi/external/users.external.openapi.js';
import DiscordOauthExternalOpenAPI from '#web/openapi/external/oauth/discord.oauth.external.openapi.js';
import UsersInternalOpenAPI from '#web/openapi/internal/users.internal.openapi.js';
import AccountExternalModule from '#web/modules/external/account.external.module.js';
import AuthExternalModule from '#web/modules/external/auth.external.module.js';
import MeExternalModule from '#web/modules/external/me.external.module.js';
import UsersExternalModule from '#web/modules/external/users.external.module.js';
import DiscordOauthExternalModule from '#web/modules/external/oauth/discord.oauth.external.module.js';
import InternalServer from '#web/servers/internal.server.js';

const dto = new DtoContainer(new CookieDto(), new FileDto());

const utilsDeps = [coreContainer] as const;

const wrappers = new WrapperContainer(
	new ValidatorWrapper(...utilsDeps),
	new RateLimiterWrapper(...utilsDeps),
	new CorsWrapper(...utilsDeps)
);

const managers = new WebManagerContainer(new SessionWebManager(...utilsDeps));

const middlewareDeps = [dto, wrappers, managers, ...utilsDeps] as const;

const middlewares = new MiddlewareContainer(
	new AuthMiddleware(...middlewareDeps),
	new FileMiddleware(...middlewareDeps)
);

const handlersDeps = [middlewares, ...middlewareDeps] as const;

const handlers = new HandlerContainer(
	new AuthHandler(...handlersDeps),
	new FileHandler(...handlersDeps),
	new ErrorHandler(...handlersDeps)
);

const openapiDeps = [handlers, ...handlersDeps] as const;

const openapi = new OpenAPIContainer(
	{
		account: new AccountExternalOpenAPI(...openapiDeps),
		auth: new AuthExternalOpenAPI(...openapiDeps),
		me: new MeExternalOpenAPI(...openapiDeps),
		users: new UsersExternalOpenAPI(...openapiDeps),
		oauth: { discord: new DiscordOauthExternalOpenAPI(...openapiDeps) },
	},
	{
		users: new UsersInternalOpenAPI(...openapiDeps),
	}
);

const modulesDeps = [openapi, ...openapiDeps] as const;

const modules = new ModuleContainer(
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

const serverContainer = new ServerContainer(
	new ExternalServer(new OpenAPIHono(), ...serverDeps),
	new InternalServer(new OpenAPIHono(), ...serverDeps)
);

export default { serverContainer };
