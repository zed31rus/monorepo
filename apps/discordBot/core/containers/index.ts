import { Client, GatewayIntentBits, REST } from 'discord.js';
import DbContainer from '@packages/db';
import InfraContainer from '@packages/infra';
import ConfigContainer from '@shared/config';
import Logger from '@shared/logger';
import ErrorsContainer from '@shared/errors';
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
import DiscordEventEmitterContainer from './emitters/event/discord.js';
import OnConnectGuildVoiceDiscordEvent from '#core/emitters/events/discord/guild/voice/hub/onConnect.js';
import OnDisconnectGuildVoiceDiscordEvent from '#core/emitters/events/discord/guild/voice/hub/onDisconnect.js';
import RabbitMqInternalEventEmitterContainer from './emitters/event/internal/rabbitMq.js';
import CommandEmitterContainer from './emitters/command.js';
import VoiceFeatureGuildCommand from '#core/emitters/commands/guild/features/voice/main.js';
import InstanceContaner from './instance.js';
import EventRouterInstance from '#core/instances/eventRouter.js';
import EventEmitter from 'node:events';
import RegisteredNewUserOauthFromAuthRabbitMqEvent from '#core/emitters/events/internal/rabbitMq/auth/from/oauth/registeredNewUser.js';

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

const locales = {};

const libs = new LibContainer(
	new LibContainer.deps.Hash(...packagesDeps),
	new LibContainer.deps.JWT(...packagesDeps),
	new LibContainer.deps.Mail(...packagesDeps),
	new LibContainer.deps.RefreshToken(...packagesDeps),
	new LibContainer.deps.VerificationCode(...packagesDeps),
	await LibContainer.deps.localisation.create(locales, ...packagesDeps)
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
		resolve(readyClient);
	});
	client.login(configs.env.DISCORD_BOT_TOKEN);
});

const rest = new REST().setToken(configs.env.DISCORD_BOT_TOKEN);
const eventEmitter = new EventEmitter();

const botDeps = [rest, readyClient, db, libs, infra, ...packagesDeps] as const;
const registriesDeps = [...botDeps] as const;

const instanceDeps = [eventEmitter, ...botDeps] as const;

const instances = new InstanceContaner(new EventRouterInstance(...instanceDeps));
const registries = new RegistryContainer(
	{
		global: new GlobalCommandsRegistry(...registriesDeps),
		guild: new GuildCommandsRegistry(...registriesDeps),
	},
	new FeatureRegistry(...registriesDeps)
);
const singletonManagerDeps = [instances, registries, ...botDeps] as const;
const ManagerDeps = [instances, registries, ...botDeps];

const singletonManagers = new SingletonManagerContainer(
	await ActivitySingletonManager.create(...singletonManagerDeps)
);

const servicesDeps = [instances, registries, singletonManagers, ...botDeps] as const;

const services = new ServiceContainer(
	await DeployCommandsService.create(...servicesDeps),
	await GuildService.create(ManagerDeps as BaseGuildManagerArgs, ...servicesDeps)
);

const emittersDeps = [services, ...servicesDeps] as const;

const commands = new CommandEmitterContainer({
	voice: new VoiceFeatureGuildCommand(...emittersDeps),
});

const discordEventContainer = new DiscordEventEmitterContainer({
	voice: {
		hub: {
			onConnect: new OnConnectGuildVoiceDiscordEvent(...emittersDeps),
			onDisconnect: new OnDisconnectGuildVoiceDiscordEvent(...emittersDeps),
		},
	},
});

const rabbitMqInternalEventContainer = new RabbitMqInternalEventEmitterContainer({
	from: {
		oauth: {
			registeredNewUser: new RegisteredNewUserOauthFromAuthRabbitMqEvent(...emittersDeps),
		},
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
	commands,
	discordEventContainer,
	rabbitMqInternalEventContainer,
};

export default coreContainer;
