import { Client, GatewayIntentBits } from 'discord.js';
import EventContainer from './event/discord.event.container.js';
import DbContainer from '@packages/db';
import InfraContainer from '@packages/infra';
import ConfigContainer from '@shared/config';
import Logger from '@shared/logger';
import ErrorsContainer from '@shared/errors';
import OnConnectGuildVoiceEvent from '#events/discord/guild/voice/hub/onConnect.hub.voice.guild.discord.event.js';
import OnDisconnectGuildVoiceEvent from '#events/discord/guild/voice/hub/onDisconnect.hub.voice.guild.discord.event.js';
import ManagerContainer from './manager.container.js';
import ActivityManager from '#managers/activity.manager.js';
import ServerNameManager from '#managers/serverName.manager.js';
import VoiceManager from '#managers/voice.manager.js';
import OauthRegisteredNewUser from '#events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.rabbitmq.event.js';
import EventEmitter from 'node:events';

const errorsContainer = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors(),
	new ErrorsContainer.deps.InternalErrors()
);

const configDeps = [errorsContainer] as const;

const configContainers = new ConfigContainer(new ConfigContainer.deps.EnvConfig(...configDeps));

const logger = new Logger('discordBot').appLogger;

const packagesDeps = [configContainers, logger, ...configDeps] as const;

const infraContainer = new InfraContainer(
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
	client.login(configContainers.env.DISCORD_BOT_TOKEN);
});

const eventEmitter = new EventEmitter();

const managerDeps = [readyClient, db, infraContainer, eventEmitter, ...packagesDeps] as const;

const managerContainer = new ManagerContainer(
	new ActivityManager(...managerDeps),
	new ServerNameManager(...managerDeps),
	new VoiceManager(...managerDeps)
);

const emitterDeps = [managerContainer, ...managerDeps] as const;

new EventContainer(
	{
		guild: {
			voice: {
				hub: {
					onConnect: new OnConnectGuildVoiceEvent(...emitterDeps),
					onDisconnect: new OnDisconnectGuildVoiceEvent(...emitterDeps),
				},
			},
		},
	},
	{
		rabbitMq: {
			auth: {
				from: {
					oauthRegisteredNewUser: new OauthRegisteredNewUser(...emitterDeps),
				},
			},
		},
	}
);
