import BaseSlashSubcommand from '#core/base/emitters/commands/slash/subcommand.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseSlashSubcommand {
	command = this.commands.guild.voice;
	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand
					.setName('disable')
					.setNameLocalization('ru', 'отключить')
					.setDescription('Disable temporary voice')
					.setNameLocalization('ru', 'Отключить временные голосовые команды')
			)
			.setAction((interaction) => {
				this.services.guild.disableFeature(interaction.guildId, 'temporaryVoiceChannels');
			});
	}
}
