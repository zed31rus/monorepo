import { Client, GatewayIntentBits, REST } from 'discord.js';
import DbContainer from '@packages/db';
import InfraContainer, { type RabbitMessages } from '@packages/infra';
import ConfigContainer from '@shared/config';
import Logger from '@shared/logger';
import ErrorsContainer from '@shared/errors';
import EventEmitter from 'node:events';
import GlobalCommandsRegistry from '#core/registry/command/global.js';
import RegistryContainer from './registry.js';
import GuildCommandsRegistry from '#core/registry/command/guild.js';
import LibContainer from '@packages/libs';
import FeatureRegistry from '#core/registry/feature.js';
import ServiceContainer from './service.js';
import DeployCommandsService from '#core/services/deployCommands.js';
import GuildService from '#core/services/guild.js';
import SingletonManagerContainer from './manager.js';
import ActivitySingletonManager from '#core/managers/activity.js';
import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import DiscordEventContainer from './event/discord.js';
import OnConnectGuildVoiceDiscordEvent from '#core/events/discord/guild/voice/hub/onConnect.js';
import OnDisconnectGuildVoiceDiscordEvent from '#core/events/discord/guild/voice/hub/onDisconnect.js';
import RabbitMqInternalEventContainer from './event/internal/rabbitMq.js';
import OauthRegisteredNewUserRabbitMqEvent from '#core/events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.js';

const errors = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors(),
	new ErrorsContainer.deps.InternalErrors()
);

const configDeps = [errors] as const;

const configs = new ConfigContainer(
	new ConfigContainer.deps.EnvConfig(...configDeps),
	new ConfigContainer.deps.PathConfig(...configDeps)
);

const logger = new Logger('discordBot').appLogger;

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
	},
	{
		oauth: new InfraContainer.deps.spotify.oauth(...packagesDeps),
	}
);

const libs = new LibContainer(
	new LibContainer.deps.Hash(...packagesDeps),
	new LibContainer.deps.JWT(...packagesDeps),
	new LibContainer.deps.Mail(...packagesDeps),
	new LibContainer.deps.RefreshToken(...packagesDeps),
	new LibContainer.deps.VerificationCode(...packagesDeps)
);

const db = new DbContainer.discordBot(...packagesDeps);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
	],
});

const readyClient = await new Promise<Client<true>>((resolve) => {
	client.once('ready', (readyClient) => {
		resolve(readyClient as Client<true>);
	});
	client.login(configs.env.DISCORD_BOT_TOKEN);
});

const eventEmitter = new EventEmitter<RabbitMessages>();

const rest = new REST().setToken(configs.env.DISCORD_BOT_TOKEN);

const botDeps = [rest, readyClient, db, libs, infra, eventEmitter, ...packagesDeps] as const;
const registriesDeps = [...botDeps] as const;
const singletonManagerDeps = [...botDeps] as const;
const guildManagerDeps = [...botDeps];

const registries = new RegistryContainer(
	{
		global: new GlobalCommandsRegistry(...registriesDeps),
		guild: new GuildCommandsRegistry(...registriesDeps),
	},
	new FeatureRegistry(...registriesDeps)
);

const singletonManagers = new SingletonManagerContainer(
	await ActivitySingletonManager.create(...singletonManagerDeps)
);

const servicesDeps = [registries, singletonManagers, ...botDeps] as const;

const services = new ServiceContainer(
	await DeployCommandsService.create(...servicesDeps),
	await GuildService.create(guildManagerDeps as BaseGuildManagerArgs, ...servicesDeps)
);

const emittersDeps = [services, ...servicesDeps] as const;

const discordEventContainer = new DiscordEventContainer({
	voice: {
		hub: {
			onConnect: new OnConnectGuildVoiceDiscordEvent(...emittersDeps),
			onDisconnect: new OnDisconnectGuildVoiceDiscordEvent(...emittersDeps),
		},
	},
});

const rabbitMqInternalEventContainer = new RabbitMqInternalEventContainer({
	from: {
		oauthRegisteredNewUser: new OauthRegisteredNewUserRabbitMqEvent(...emittersDeps),
	},
});

const coreContainer = {
	errors,
	configs,
	logger,
	infra,
	libs,
	db,
	registries,
	singletonManagers,
	services,
	discordEventContainer,
	rabbitMqInternalEventContainer,
};

export default coreContainer;
