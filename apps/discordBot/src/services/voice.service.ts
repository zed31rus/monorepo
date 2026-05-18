import { Guild, type GuildBasedChannel } from 'discord.js';
import {
	entersState,
	joinVoiceChannel,
	VoiceConnection,
	VoiceConnectionStatus,
} from '@discordjs/voice';
import BaseService, { type BaseServiceArgs } from '../base/service.base.js';
import { Features } from '@zed31rus/types/features.discordBot.js';
import type { DiscordBotDBType } from '@packages/db';

export default class VoiceService extends BaseService {
	private guilds: Map<string, { voiceConnection: VoiceConnection; guild: Guild }> = new Map();

	constructor(...baseServiceArgs: BaseServiceArgs) {
		super(...baseServiceArgs);
	}

	async init() {
		const activeGuilds = await this.db.guilds.get.whereFeature(this.db.client, Features.voice);

		for (const guild of activeGuilds) {
			if (guild.features.voice.status) this.connectOneServerVoice(guild);
		}
	}

	async connectOneServerVoice(guildRecord: DiscordBotDBType.GuildModel) {
		const guild = await this.client.guilds.fetch(guildRecord.guildId);
		const channel = await guild.channels.fetch(guildRecord.features.voice.settings.channelId);

		if (!channel) throw this.errors.api.NotFound('channel not found');

		const connection = this.connect(guild, channel);

		this.guilds.set(guild.id, { voiceConnection: connection, guild: guild });

		try {
			await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
			this.logger.info('voiceChat');
		} catch (err) {
			console.error('Error:', err);
			connection.destroy();
		}

		connection.on(VoiceConnectionStatus.Disconnected, () => {
			console.log('BotDisconnected\nreconnecting');
			connection.destroy();
			this.connect(guild, channel);
		});
	}

	connect(guild: Guild, channel: GuildBasedChannel) {
		return joinVoiceChannel({
			channelId: channel.id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
		});
	}
}
