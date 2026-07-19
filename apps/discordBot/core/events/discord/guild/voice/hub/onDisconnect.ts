import BaseDiscordEvent, { type BaseDiscordEventArgs } from '#core/base/event/discord.js';
import { type VoiceState } from 'discord.js';

export default class OnDisconnectGuildVoiceDiscordEvent extends BaseDiscordEvent {
	constructor(...baseEventArgs: BaseDiscordEventArgs) {
		super('voiceStateUpdate', ...baseEventArgs);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected async action(oldState: VoiceState, newState: VoiceState) {
		const { guild, channel } = oldState;

		if (!channel) return;

		const guildRecord = await this.db.guilds.get.orThrow.byId(this.db.client, channel.guildId);
		if (!guildRecord.features.temporaryVoiceChannels.status) return;

		const hubChannel = await guild.channels.fetch(
			guildRecord.features.temporaryVoiceChannels.settings.channelId
		);

		if (!hubChannel || !hubChannel.parent) return;

		const category = hubChannel.parent;

		if (channel.parentId !== category.id) return;

		if (channel.id === hubChannel.id) return;
		if (channel.members.size !== 0) return;

		await channel.delete();
	}
}
