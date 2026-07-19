import BaseDiscordEvent, { type BaseDiscordEventArgs } from '#core/base/event/discord.js';
import { ChannelType, type VoiceState } from 'discord.js';

export default class OnConnectGuildVoiceDiscordEvent extends BaseDiscordEvent {
	constructor(...baseEventArgs: BaseDiscordEventArgs) {
		super('voiceStateUpdate', ...baseEventArgs);
	}

	protected async action(oldState: VoiceState, newState: VoiceState) {
		const { member, guild, channel } = newState;

		if (!member) return;
		if (!channel) return;

		if (member.user.bot) return;

		const guildRecord = await this.db.guilds.get.orThrow.byId(this.db.client, channel.guildId);
		if (!guildRecord.features.temporaryVoiceChannels.status) return;

		const hubChannel = await guild.channels.fetch(
			guildRecord.features.temporaryVoiceChannels.settings.channelId
		);

		if (!hubChannel || !hubChannel.parent) return;
		if (channel.id !== hubChannel.id) return;

		const category = hubChannel.parent;

		if (channel.parentId !== category.id) return;

		const memberName = member.displayName;
		const tempChannelName = member.user?.primaryGuild?.tag
			? `${member.user.primaryGuild.tag}・${memberName}`
			: `${memberName}`;

		const tempChannel = await guild.channels.create({
			name: tempChannelName,
			type: ChannelType.GuildVoice,
			parent: category.id,
		});

		await member.voice.setChannel(tempChannel);
	}
}
