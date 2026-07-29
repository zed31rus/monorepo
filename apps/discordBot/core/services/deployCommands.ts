import BaseService, { type BaseServiceArgs } from '#core/base/service.js';
import { Routes } from 'discord.js';

export default class DeployCommandsService extends BaseService {
	private constructor(...baseServiceArgs: BaseServiceArgs) {
		super(...baseServiceArgs);
	}

	static async create(...baseServiceArgs: BaseServiceArgs) {
		const service = new DeployCommandsService(...baseServiceArgs);
		await service.init();
		return service;
	}

	async init() {
		await this.client.guilds.fetch();

		const applicationGuildCommandsBody = this.registries.commands.guild
			.getAll()
			.map((command) => command.data.toJSON());

		await Promise.all(
			this.client.guilds.cache.map(async (guild) => {
				const result = await this.rest.put(
					Routes.applicationGuildCommands(
						this.config.env.DISCORD_OAUTH_CLIENT_ID,
						guild.id
					),
					{ body: applicationGuildCommandsBody }
				);

				this.logger.info(`Deployed ${applicationGuildCommandsBody.length} guild commands`, {
					guildId: guild.id,
					result,
				});
			})
		);

		const applicationGlobalCommandsBody = this.registries.commands.global
			.getAll()
			.map((command) => command.data.toJSON());

		const result = await this.rest.put(
			Routes.applicationCommands(this.config.env.DISCORD_OAUTH_CLIENT_ID),
			{
				body: applicationGlobalCommandsBody,
			}
		);

		this.logger.info(`Deployed ${applicationGlobalCommandsBody.length} global commands`, {
			result,
		});
	}
}
