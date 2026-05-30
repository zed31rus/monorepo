import { OpenAPIHono } from '@hono/zod-openapi';
import DtoContainer from '#web/containers/dto.container.js';
import CookieDto from '#web/dto/cookie.dto.js';
import fileDto from '#web/dto/file.dto.js';
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
import AccountPublicOpenAPI from '#web/openapi/public/account.public.openapi.js';
import AuthPublicOpenAPI from '#web/openapi/public/auth.public.openapi.js';
import MePublicOpenAPI from '#web/openapi/public/me.public.openapi.js';
import UsersPublicOpenAPI from '#web/openapi/public/users.public.openapi.js';
import DiscordOauthPublicOpenAPI from '#web/openapi/public/oauth/discord.oauth.public.openapi.js';
import ModuleContainer from './module.container.js';
import AccountMainModule from '#web/modules/public/account.public.module.js';
import AuthMainModule from '#web/modules/public/auth.public.module.js';
import MeMainModule from '#web/modules/public/me.public.module.js';
import UsersMainModule from '#web/modules/public/users.public.module.js';
import DiscordOauthMainModule from '#web/modules/public/oauth/discord.oauth.main.module.js';
import ServerContainer from '#web/containers/server.container.js';
import PublicServer from '#web/servers/public.server.js';
import coreContainer from '#core/containers/index.container.js';
import UsersInternalModule from '#web/modules/internal/users.internal.module.js';

const hono = new OpenAPIHono();

const dto = new DtoContainer(new CookieDto(), new fileDto());

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
	new AccountPublicOpenAPI(...openapiDeps),
	new AuthPublicOpenAPI(...openapiDeps),
	new MePublicOpenAPI(...openapiDeps),
	new UsersPublicOpenAPI(...openapiDeps),
	{ discord: new DiscordOauthPublicOpenAPI(...openapiDeps) }
);

const modulesDeps = [openapi, ...openapiDeps] as const;

const modules = new ModuleContainer(
	{
		account: new AccountMainModule(...modulesDeps),
		auth: new AuthMainModule(...modulesDeps),
		me: new MeMainModule(...modulesDeps),
		users: new UsersMainModule(...modulesDeps),

		oauth: {
			discord: new DiscordOauthMainModule(...modulesDeps),
		},
	},
	{
		users: new UsersInternalModule(...modulesDeps),
	}
);

const serverDeps = [hono, modules, ...modulesDeps] as const;

const serverContainer = new ServerContainer(new PublicServer(...serverDeps));

export default { serverContainer };
