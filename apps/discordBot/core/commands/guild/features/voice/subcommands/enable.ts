import BaseSubcommand from '#core/base/commands/guild/subcommand.js';
import { ChannelType } from 'discord.js';

export default class EnableSubcommandVoiceFeatureGuildCommand extends BaseSubcommand {
	command = this.commands.guild.voice;

	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand.data
					.setName('enable')
					.setNameLocalization('ru', 'включить')
					.setDescription('Enable temporary voice')
					.setDescriptionLocalization('ru', 'Включить временные голосовые команды')
					.addChannelOption((channel) =>
						channel
							.setRequired(true)
							.setName('channel')
							.setNameLocalization('ru', 'канал')
							.addChannelTypes(ChannelType.GuildVoice)
					)
			)
			.setAction((interaction) => {
				if (!interaction.isChatInputCommand()) return;
				if (!interaction.inCachedGuild()) return;
				const manager = this.services.guild.getWhereGuildIdFeatureOrThrow(
					interaction.guildId,
					'temporaryVoiceChannels'
				);
				const channel = interaction.options.getChannel('channel', true);
				manager.configure(channel.id);
				this.services.guild.enableFeature(interaction.guildId, 'temporaryVoiceChannels');
			});
	}
}
