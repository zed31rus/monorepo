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
import OauthRegisteredNewUser from '#events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.from.auth.rabbitMq.internal.event.js';

const errorsContainer = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors()
);

const configContainers = new ConfigContainer(new ConfigContainer.deps.EnvConfig(errorsContainer));

const logger = new Logger('auth').appLogger;

const infraContainer = new InfraContainer(
	InfraContainer.deps.RabbitMqInfra.getInstance(configContainers, errorsContainer, logger),
	{ discord: new InfraContainer.deps.oauth.discord(configContainers, errorsContainer, logger) }
);

const db = new DbContainer(
	new DbContainer.deps.authDB(configContainers, errorsContainer, logger),
	new DbContainer.deps.discordbotDB(configContainers, errorsContainer, logger)
).discordBot;

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

const managerContainer = new ManagerContainer(
	new ActivityManager(readyClient, db, infraContainer, configContainers, errorsContainer, logger),
	new ServerNameManager(
		readyClient,
		db,
		infraContainer,
		configContainers,
		errorsContainer,
		logger
	),
	new VoiceManager(readyClient, db, infraContainer, configContainers, errorsContainer, logger)
);

new EventContainer(
	{
		guild: {
			voice: {
				hub: {
					onConnect: new OnConnectGuildVoiceEvent(
						managerContainer,
						readyClient,
						db,
						infraContainer,
						configContainers,
						errorsContainer,
						logger
					),
					onDisconnect: new OnDisconnectGuildVoiceEvent(
						managerContainer,
						readyClient,
						db,
						infraContainer,
						configContainers,
						errorsContainer,
						logger
					),
				},
			},
		},
	},
	{
		rabbitMq: {
			auth: {
				from: {
					oauthRegisteredNewUser: new OauthRegisteredNewUser(),
				},
			},
		},
	}
);
