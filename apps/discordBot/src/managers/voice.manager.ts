import { Guild, type GuildBasedChannel } from 'discord.js';
import {
	entersState,
	joinVoiceChannel,
	VoiceConnection,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import { Features } from '@zed31rus/types/features.discordBot.js';
import type { DiscordBotDBType } from '@packages/db';
import BaseManager, { type BaseManagerArgs } from '#base/manager.base.js';

interface GuildVoiceData {
	voiceConnection: VoiceConnection;
	guild: Guild;
	reconnectAttempts: number;
	maxReconnectAttempts: number;
}

export default class VoiceManager extends BaseManager {
	private guilds: Map<string, GuildVoiceData> = new Map();
	private readonly MAX_RECONNECT_ATTEMPTS = 5;
	private readonly RECONNECT_DELAY_MS = 5000;

	constructor(...baseServiceArgs: BaseManagerArgs) {
		super(...baseServiceArgs);
	}

	async init() {
		const activeGuilds = await this.db.guilds.get.whereFeature(this.db.client, Features.voice);

		for (const guild of activeGuilds) {
			await this.connectOneServerVoice(guild).catch((err) =>
				this.logger.error('Failed to connect voice on init', {
					guildId: guild.guildId,
					error: err,
				})
			);
		}
	}

	async connectOneServerVoice(guildRecord: DiscordBotDBType.GuildModel) {
		if (!guildRecord.features.voice.status) return;

		const guild = await this.client.guilds.fetch(guildRecord.guildId);
		const channel = await guild.channels.fetch(guildRecord.features.voice.settings.channelId);

		if (!channel) {
			throw this.errors.api.NotFound('voice channel not found');
		}

		const connection = this.connect(guild, channel);

		const guildVoiceData: GuildVoiceData = {
			voiceConnection: connection,
			guild,
			reconnectAttempts: 0,
			maxReconnectAttempts: this.MAX_RECONNECT_ATTEMPTS,
		};

		this.guilds.set(guild.id, guildVoiceData);

		try {
			await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
			this.logger.info('Voice connection ready', { guildId: guild.id });
		} catch (err) {
			this.logger.error('Failed to enter ready state', { guildId: guild.id, error: err });
			connection.destroy();
			this.guilds.delete(guild.id);
			throw err;
		}

		this.setupConnectionHandlers(guildVoiceData, channel);
	}

	private setupConnectionHandlers(guildVoiceData: GuildVoiceData, channel: GuildBasedChannel) {
		const { voiceConnection, guild } = guildVoiceData;

		voiceConnection.on(VoiceConnectionStatus.Disconnected, async () => {
			this.logger.warn('Voice connection disconnected', { guildId: guild.id });

			voiceConnection.destroy();
			guildVoiceData.reconnectAttempts++;

			if (guildVoiceData.reconnectAttempts >= guildVoiceData.maxReconnectAttempts) {
				this.logger.error('Max reconnection attempts reached', { guildId: guild.id });
				this.guilds.delete(guild.id);
				return;
			}

			const delay = this.RECONNECT_DELAY_MS * guildVoiceData.reconnectAttempts;
			this.logger.info('Scheduling reconnect', {
				guildId: guild.id,
				delayMs: delay,
				attempt: guildVoiceData.reconnectAttempts,
			});

			setTimeout(() => {
				this.connect(guild, channel);
				guildVoiceData.voiceConnection = this.connect(guild, channel);
			}, delay);
		});

		voiceConnection.on(VoiceConnectionStatus.Ready, () => {
			this.logger.info('Voice connection ready', { guildId: guild.id });
			guildVoiceData.reconnectAttempts = 0;
		});

		voiceConnection.on('error', (error) => {
			this.logger.error('Voice connection error', { guildId: guild.id, error });
		});
	}

	private connect(guild: Guild, channel: GuildBasedChannel) {
		return joinVoiceChannel({
			channelId: channel.id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
		});
	}

	async destroy() {
		for (const [guildId, data] of this.guilds.entries()) {
			this.logger.info('Disconnecting voice', { guildId });
			data.voiceConnection.destroy();
			this.guilds.delete(guildId);
		}
	}
}
