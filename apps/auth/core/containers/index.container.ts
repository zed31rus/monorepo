import ManagerContainer from "#core/containers/manager.container.js";
import OtpManager from "#root/core/managers/otp.manager.js";
import SessionManager from "#root/core/managers/session.manager.js";
import ServiceContainer from "#core/containers/services.container.js";
import AccountService from "#core/services/account.service.js";
import AuthService from "#core/services/auth.service.js";
import MeService from "#core/services/me.service.js";
import UsersService from "#core/services/users.service.js";
import DiscordOauthService from "#core/services/oauth/discord.oauth.service.js";
import LibContainer from "@packages/libs";
import ErrorsContainer from "@shared/errors";
import ConfigContainer from "@shared/config";
import DbContainer from "@packages/db";
import InfraContainer from "@packages/infra";
import Logger from "@shared/logger";

const errors = new ErrorsContainer(
    new ErrorsContainer.deps.ApiErrors(),
    new ErrorsContainer.deps.ConfigErrors(),
    new ErrorsContainer.deps.PrismaErrors()
)

const configs = new ConfigContainer(
    new ConfigContainer.deps.EnvConfig(errors)
)

const logger = new Logger('auth').appLogger;

const libs = new LibContainer(
    new LibContainer.deps.Hash(configs, errors, logger),
    new LibContainer.deps.JWT(configs, errors, logger),
    new LibContainer.deps.Mail(configs, errors, logger),
    new LibContainer.deps.RefreshToken(configs, errors, logger),
    new LibContainer.deps.VerificationCode(configs, errors, logger)
)

const infra = new InfraContainer(
    InfraContainer.deps.RabbitMqInfra.getInstance(configs, errors, logger),
    { discord: new InfraContainer.deps.oauth.discord(configs, errors, logger) }
)

const db = new DbContainer(
    new DbContainer.deps.authDB(configs, errors, logger),
    new DbContainer.deps.discordbotDB(configs, errors, logger)
).auth

const managers = new ManagerContainer(
    new OtpManager(db, libs, infra, configs, errors, logger),
    new SessionManager(db, libs, infra, configs, errors, logger)
);

const services = new ServiceContainer(
    new AccountService( managers, db, libs,  infra, configs, errors, logger),
    new AuthService(managers, db, libs, infra, configs, errors, logger),
    new MeService(managers, db, libs, infra, configs, errors, logger),
    new UsersService(managers, db, libs, infra, configs, errors, logger),
    {
        discord: new DiscordOauthService(managers, db, libs, infra, configs, errors, logger)
    }
);

const coreContainer = { libs, db, infra, managers, services, configs, errors, logger };

export default coreContainer