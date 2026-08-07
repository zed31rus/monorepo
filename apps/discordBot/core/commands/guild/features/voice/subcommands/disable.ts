import BaseSubcommand from '#core/base/commands/guild/subcommand.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseSubcommand {
	command = this.commands.guild.voice;
	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand.data
					.setName('disable')
					.setNameLocalization('ru', 'отключить')
					.setDescription('Disable temporary voice')
					.setNameLocalization('ru', 'Отключить временные голосовые команды')
			)
			.setAction((interaction) => {
				if (!interaction.isChatInputCommand()) return;
				if (!interaction.inCachedGuild()) return;
				this.services.guild.disableFeature(interaction.guildId, 'temporaryVoiceChannels');
			});
	}
}
