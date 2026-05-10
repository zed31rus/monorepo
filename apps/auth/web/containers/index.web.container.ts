import { OpenAPIHono } from "@hono/zod-openapi";
import DtoContainer from "#web/containers/dto.container.js";
import CookieDto from "#web/dto/cookie.dto.js";
import fileDto from "#web/dto/file.dto.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import ValidatorWrapper from "#web/wrappers/validator.wrapper.js";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper.js";
import CorsWrapper from "#web/wrappers/cors.wrapper.js";
import WebManagerContainer from "#web/containers/managers.container.js";
import SessionWebManager from "#root/web/managers/session.manager.js";
import MiddlewareContainer from "#web/containers/middleware.container.js";
import FileMiddleware from "#web/middleware/file.middleware.js";
import AuthMiddleware from "#web/middleware/auth.middleware.js";
import HandlerContainer from "#web/containers/handler.container.js";
import AuthHandler from "#web/handlers/auth.handler.js";
import FileHandler from "#web/handlers/file.handler.js";
import ErrorHandler from "#web/handlers/error.handler.js";
import OpenAPIContainer from "#web/containers/openapi.container.js";
import AccountOpenAPI from "#web/openapi/account.openapi.js";
import AuthOpenAPI from "#web/openapi/auth.openapi.js";
import MeOpenAPI from "#web/openapi/me.openapi.js";
import UsersOpenAPI from "#web/openapi/users.openapi.js";
import DiscordOauthOpenAPI from "#web/openapi/oauth/discord.oauth.openapi.js";
import ModuleContainer from "./module.container.js";
import AccountModule from "#web/modules/account.module.js";
import AuthModule from "#web/modules/auth.module.js";
import MeModule from "#web/modules/me.module.js";
import UsersModule from "#web/modules/users.module.js";
import DiscordOauthModule from "#web/modules/oauth/discord.oauth.module.js";
import ServerContainer from "#web/containers/server.container.js";
import MainServer from "#web/servers/main.server.js";
import coreContainer from "#core/containers/index.container.js";

const hono = new OpenAPIHono();

const dto = new DtoContainer(
    new CookieDto(),
    new fileDto()
)

const wrappers = new WrapperContainer(
    new ValidatorWrapper(coreContainer),
    new RateLimiterWrapper(coreContainer),
    new CorsWrapper(coreContainer)
)

const managers = new WebManagerContainer(
    new SessionWebManager(coreContainer)
)

const middlewares = new MiddlewareContainer(
    new AuthMiddleware(dto, wrappers, managers, coreContainer),
    new FileMiddleware(dto, wrappers, managers, coreContainer)
)

const handlers = new HandlerContainer(
    new AuthHandler(middlewares, wrappers, dto, managers, coreContainer),
    new FileHandler(middlewares, wrappers, dto, managers, coreContainer),
    new ErrorHandler(middlewares, wrappers, dto, managers, coreContainer)
)

const openapi = new OpenAPIContainer(
    new AccountOpenAPI(dto, middlewares, handlers, coreContainer),
    new AuthOpenAPI(dto, middlewares, handlers, coreContainer),
    new MeOpenAPI(dto, middlewares, handlers, coreContainer),
    new UsersOpenAPI(dto, middlewares, handlers, coreContainer),
    { discord: new DiscordOauthOpenAPI(dto, middlewares, handlers, coreContainer) }
)

const modules = new ModuleContainer(
    new AccountModule(dto, wrappers, managers, handlers, middlewares, openapi, coreContainer),
    new AuthModule(dto, wrappers, managers, handlers, middlewares, openapi, coreContainer),
    new MeModule(dto, wrappers, managers, handlers, middlewares, openapi, coreContainer),
    new UsersModule(dto, wrappers, managers, handlers, middlewares, openapi, coreContainer),
    { discord: new DiscordOauthModule(dto, wrappers, managers, handlers, middlewares, openapi, coreContainer)}
)

const serverContainer = new ServerContainer(
    new MainServer(hono, managers, modules, handlers, wrappers, coreContainer)
)

export default { serverContainer }