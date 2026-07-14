import { Guild, type GuildBasedChannel } from 'discord.js';
import {
	entersState,
	joinVoiceChannel,
	VoiceConnection,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import BaseManager, { type BaseManagerArgs } from '#core/base/manager.js';
import { InternalErrors } from '@shared/errors';

interface VoiceData {
	connection: VoiceConnection;
	guild: Guild;
	reconnectAttempts: number;
}

export default class VoiceGuildManager extends BaseManager {
	private voice: VoiceData | null = null;

	private readonly MAX_RECONNECT_ATTEMPTS = 5;
	private readonly RECONNECT_DELAY_MS = 5000;
	private readonly guildId: string;
	private readonly voiceChannelId: string;

	constructor(guildid: string, voiceChannelId: string, ...baseManagerArgs: BaseManagerArgs) {
		super(...baseManagerArgs);
		this.guildId = guildid;
		this.voiceChannelId = voiceChannelId;
	}

	async connect() {
		const guild = await this.client.guilds.fetch(this.guildId);

		const channel = await guild.channels.fetch(this.voiceChannelId);

		if (!channel) {
			throw this.errors.internal.discord.voice(
				InternalErrors.DiscordVoiceErrorMessage.CHANNEL_NOT_FOUND
			);
		}

		if (!channel.isVoiceBased()) {
			throw this.errors.internal.discord.voice(
				InternalErrors.DiscordVoiceErrorMessage.INVALID_CHANNEL_TYPE
			);
		}

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
		});

		this.voice = {
			connection,
			guild,
			reconnectAttempts: 0,
		};

		try {
			await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		} catch {
			connection.destroy();
			this.voice = null;
			throw this.errors.internal.discord.voice(
				InternalErrors.DiscordVoiceErrorMessage.CONNECTION_TIMEOUT
			);
		}

		this.setupConnectionHandlers(channel);
	}

	private setupConnectionHandlers(channel: GuildBasedChannel) {
		if (!this.voice) return;

		const { connection, guild } = this.voice;

		connection.on(VoiceConnectionStatus.Disconnected, async () => {
			if (!this.voice) return;

			connection.destroy();

			this.voice.reconnectAttempts++;

			if (this.voice.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
				this.logger.error('Max reconnect attempts reached', {
					error: this.errors.internal.discord.voice(
						InternalErrors.DiscordVoiceErrorMessage.MAX_RECONNECT_ATTEMPTS_REACHED
					),
				});
				this.voice = null;
				return;
			}

			setTimeout(async () => {
				if (!this.voice) return;

				try {
					const newConnection = this.connectToChannel(guild, channel);

					await entersState(newConnection, VoiceConnectionStatus.Ready, 30_000);

					this.voice.connection = newConnection;

					this.setupConnectionHandlers(channel);
				} catch (error) {
					this.logger.error('Voice reconnect failed', {
						error: this.errors.internal.discord.voice(
							InternalErrors.DiscordVoiceErrorMessage.RECONNECT_FAILED
						),
						cause: error,
					});

					if (!this.voice) return;

					if (this.voice.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
						this.voice = null;
					}
				}
			}, this.RECONNECT_DELAY_MS);
		});

		connection.on(VoiceConnectionStatus.Ready, () => {
			if (this.voice) {
				this.voice.reconnectAttempts = 0;
			}
		});
	}

	private connectToChannel(guild: Guild, channel: GuildBasedChannel) {
		return joinVoiceChannel({
			channelId: channel.id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfMute: false,
			selfDeaf: false,
		});
	}

	async destroy() {
		this.voice?.connection.destroy();
		this.voice = null;
	}
}
