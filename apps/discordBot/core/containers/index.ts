import { Client, GatewayIntentBits } from 'discord.js';
import DiscordEventContainer from './event/discord.js';
import DbContainer from '@packages/db';
import InfraContainer from '@packages/infra';
import ConfigContainer from '@shared/config';
import Logger from '@shared/logger';
import ErrorsContainer from '@shared/errors';
import OnConnectGuildVoiceEvent from '#core/events/discord/guild/voice/hub/onConnect.js';
import OnDisconnectGuildVoiceEvent from '#core/events/discord/guild/voice/hub/onDisconnect.js';
import OauthRegisteredNewUser from '#core/events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.js';
import EventEmitter from 'node:events';
import RabbitMqInternalEventContainer from './event/internal/rabbitMq.js';

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

const servicesDeps = [readyClient, db, infraContainer, eventEmitter, ...packagesDeps] as const;

const emitterDeps = [...servicesDeps] as const;

new DiscordEventContainer({
	voice: {
		hub: {
			onConnect: new OnConnectGuildVoiceEvent(...emitterDeps),
			onDisconnect: new OnDisconnectGuildVoiceEvent(...emitterDeps),
		},
	},
});

new RabbitMqInternalEventContainer({
	from: {
		oauthRegisteredNewUser: new OauthRegisteredNewUser(...emitterDeps),
	},
});
