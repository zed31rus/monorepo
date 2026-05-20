import { Client, GatewayIntentBits } from 'discord.js';
import EventContainer from './event.container.js';
import DbContainer from '@packages/db';
import InfraContainer from '@packages/infra';
import LibContainer from '@packages/libs';
import ConfigContainer from '@shared/config';
import Logger from '@shared/logger';
import ErrorsContainer from '@shared/errors';
import OnConnectGuildVoiceEvent from '#events/guild/voice/hub/onConnect.hub.voice.guild.event.js';
import OnDisconnectGuildVoiceEvent from '#events/guild/voice/hub/onDisconnect.hub.voice.guild.event.js';
import ManagerContainer from './manager.container.js';
import ActivityManager from '#managers/activity.manager.js';
import ServerNameManager from '#managers/serverName.manager.js';
import VoiceManager from '#managers/voice.manager.js';

const errors = new ErrorsContainer(
	new ErrorsContainer.deps.ApiErrors(),
	new ErrorsContainer.deps.ConfigErrors(),
	new ErrorsContainer.deps.PrismaErrors()
);

const configs = new ConfigContainer(new ConfigContainer.deps.EnvConfig(errors));

const logger = new Logger('auth').appLogger;

const libs = new LibContainer(
	new LibContainer.deps.Hash(configs, errors, logger),
	new LibContainer.deps.JWT(configs, errors, logger),
	new LibContainer.deps.Mail(configs, errors, logger),
	new LibContainer.deps.RefreshToken(configs, errors, logger),
	new LibContainer.deps.VerificationCode(configs, errors, logger)
);

const infra = new InfraContainer(
	InfraContainer.deps.RabbitMqInfra.getInstance(configs, errors, logger),
	{ discord: new InfraContainer.deps.oauth.discord(configs, errors, logger) }
);

const db = new DbContainer(
	new DbContainer.deps.authDB(configs, errors, logger),
	new DbContainer.deps.discordbotDB(configs, errors, logger)
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
	client.login(configs.env.DISCORD_BOT_TOKEN);
});

const managerContainer = new ManagerContainer(
	new ActivityManager(),
	new ServerNameManager(),
	new VoiceManager()
);

const eventContainer = new EventContainer({
	voice: {
		hub: {
			onConnect: new OnConnectGuildVoiceEvent(readyClient, db, configs, errors, logger),
			onDisconnect: new OnDisconnectGuildVoiceEvent(readyClient, db, configs, errors, logger),
		},
	},
});
