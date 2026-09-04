import BaseGuildSlashCommand, {
	type BaseGuildSlashCommandArgs,
} from '#core/base/emitters/commands/slash/guild.js';
import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';

export default class VoiceFeatureGuildCommand extends BaseGuildSlashCommand {
	constructor(...baseGuildSlashCommandArgs: BaseGuildSlashCommandArgs) {
		super(...baseGuildSlashCommandArgs);

		this.setData((builder) => {
			return builder
				.setName(
					this.libs.localisation.t('en-US:emitters.commands.guild.features.voice.name')
				)
				.setNameLocalization(
					'ru',
					this.libs.localisation.t('ru:emitters.commands.guild.features.voice.name')
				)
				.setDescription(
					this.libs.localisation.t(
						'en-US:emitters.commands.guild.features.voice.description'
					)
				)
				.setDescriptionLocalization(
					'ru',
					this.libs.localisation.t(
						'ru:emitters.commands.guild.features.voice.description'
					)
				);
		});
	}

	action(interaction: ChatInputCommandInteraction<'cached'>) {
		interaction.deferReply({
			flags: [MessageFlags.Ephemeral],
		});
		interaction.editReply({
			message: this.libs.localisation.t(
				'emitters.commands.guild.features.voice.replies.success',
				{
					lng: interaction.locale,
				}
			),
		});
	}
}
