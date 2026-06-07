import ManagerContainer from '#core/containers/manager.container.js';
import OtpManager from '#root/core/managers/otp.manager.js';
import SessionManager from '#root/core/managers/session.manager.js';
import ServiceContainer from '#core/containers/services.container.js';
import AccountService from '#core/services/account.service.js';
import AuthService from '#core/services/auth.service.js';
import MeService from '#core/services/me.service.js';
import UsersService from '#core/services/users.service.js';
import DiscordOauthService from '#core/services/oauth/discord.oauth.service.js';
import LibContainer from '@packages/libs';
import ErrorsContainer from '@shared/errors';
import ConfigContainer from '@shared/config';
import DbContainer from '@packages/db';
import InfraContainer from '@packages/infra';
import Logger from '@shared/logger';
import type winston from 'winston';

const errors = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors()
);

const configDeps = [errors] as const;

const configs = new ConfigContainer(new ConfigContainer.deps.EnvConfig(...configDeps));

const logger = new Logger('auth').appLogger;

const packagesDeps = [configs, logger, ...configDeps] as const;

const infra = new InfraContainer(
	InfraContainer.deps.rabbitmq.getInstance(...packagesDeps),
	{
		oauth: new InfraContainer.deps.discord.oauth(...packagesDeps),
		users: new InfraContainer.deps.discord.users(...packagesDeps),
	},
	{
		auth: {
			users: new InfraContainer.deps.internal.auth.users(...packagesDeps),
		},
	}
);

const libs = new LibContainer(
	new LibContainer.deps.Hash(...packagesDeps),
	new LibContainer.deps.JWT(...packagesDeps),
	new LibContainer.deps.Mail(...packagesDeps),
	new LibContainer.deps.RefreshToken(...packagesDeps),
	new LibContainer.deps.VerificationCode(...packagesDeps)
);

const db = new DbContainer(
	new DbContainer.deps.authDB(...packagesDeps),
	new DbContainer.deps.discordbotDB(...packagesDeps)
).auth;

const managersDeps = [db, libs, infra, ...packagesDeps] as const;

const managers = new ManagerContainer(
	new OtpManager(...managersDeps),
	new SessionManager(...managersDeps)
);

const servicesDeps = [managers, ...managersDeps] as const;

const services = new ServiceContainer(
	new AccountService(...servicesDeps),
	new AuthService(...servicesDeps),
	new MeService(...servicesDeps),
	new UsersService(...servicesDeps),
	{
		discord: new DiscordOauthService(...servicesDeps),
	}
);

const coreContainer: {
	libs: LibContainer;
	db: DbContainer['auth'];
	infra: InfraContainer;
	managers: ManagerContainer;
	services: ServiceContainer;
	configs: ConfigContainer;
	errors: ErrorsContainer;
	logger: winston.Logger;
} = { libs, db, infra, managers, services, configs, errors, logger };

export default coreContainer;
