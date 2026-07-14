import BaseRabbitMqInternalEvent, {
	type BaseRabbitMqInternalEventArgs,
} from '#core/base/event/internal/rabbitMq.js';
import { Oauth } from '@zed31rus/types';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export default class OauthRegisteredNewUserRabbitMqEvent extends BaseRabbitMqInternalEvent {
	protected async action(uuid: string) {
		this.logger.info(`oauthRegisteredNewUser event received: uuid=${uuid}`);

		const { user } = await this.infra.internal.auth.users.getByUUID(
			uuid,
			Oauth.Providers.discord
		);
		const { oauthAccounts } = user;
		const oauthAccount = oauthAccounts[0];

		this.logger.info(
			`Fetched user: nickname=${user.nickname}, providerUserId=${oauthAccount.providerUserId}`
		);

		const providerUser = await this.client.users.fetch(oauthAccount.providerUserId);
		this.logger.info(`Fetched Discord user: discordUserId=${oauthAccount.providerUserId}`);

		const guild = await this.client.guilds.fetch(this.config.env.PRIMARY_SERVER_ID);

		if (oauthAccount.accessToken) {
			await guild.members.add(providerUser, {
				accessToken: oauthAccount.accessToken,
			});
			this.logger.info(
				`Added user to guild: discordUserId=${oauthAccount.providerUserId}, guildId=${this.config.env.PRIMARY_SERVER_ID}`
			);
		} else {
			this.logger.warn(
				`No accessToken for user, skipping guild add: discordUserId=${oauthAccount.providerUserId}`
			);
		}

		const testEmbed = new EmbedBuilder()
			.setTitle('zed31rus.ru')
			.setDescription(
				`Привет ${user.nickname}, огромное спасибо за то, что ты зарегистрировался на сайте [zed31rus.ru](https://zed31rus.ru) используя discord!\n`
			);
		const testButton = new ButtonBuilder()
			.setLabel('zed31rus.ru')
			.setStyle(ButtonStyle.Link)
			.setURL('https://zed31rus.ru');

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(testButton);
		await providerUser.send({
			embeds: [testEmbed],
			components: [row],
		});
		this.logger.info(`Welcome DM sent to user: discordUserId=${oauthAccount.providerUserId}`);
	}

	constructor(...baseRabbitMqEventDeps: BaseRabbitMqInternalEventArgs) {
		super('oauthRegisteredNewUser', ...baseRabbitMqEventDeps);
	}
}
