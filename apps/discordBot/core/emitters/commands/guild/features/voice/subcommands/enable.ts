import BaseSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/base.js';
import { ChannelType } from 'discord.js';

export default class EnableSubcommandVoiceFeatureGuildCommand extends BaseSlashSubcommand {
	command = this.commands.guild.voice;

	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand
					.setName('enable')
					.setNameLocalization('ru', 'включить')
					.setDescription('Enable temporary voice')
					.setDescriptionLocalization('ru', 'Включить временные голосовые команды')
					.addChannelOption((channel) =>
						channel
							.setRequired(true)
							.setName('channel')
							.setNameLocalization('ru', 'канал')
							.setDescription('')
							.addChannelTypes(ChannelType.GuildVoice)
					)
			)
			.setAction((interaction) => {
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
