import BaseSlashSubcommand from '#core/base/commands/slash/subcommand.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseSlashSubcommand {
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
