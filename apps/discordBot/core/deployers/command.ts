import BaseDeployer, { type BaseDeployerArgs } from '#core/base/deployer.js';
import { Guild, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';

export default class CommandDeployer extends BaseDeployer {
	private constructor(...baseDeployerArgs: BaseDeployerArgs) {
		super(...baseDeployerArgs);
	}

	static async create(...baseDeployerArgs: BaseDeployerArgs) {
		const service = new CommandDeployer(...baseDeployerArgs);
		await service.init();
		return service;
	}

	async init() {
		await this.client.guilds.fetch();

		const applicationGuildCommandsBody = this.registries.commands.guild
			.getAll()
			.map((command) => command.getData.toJSON());

		await this.deployToAllGuild(applicationGuildCommandsBody);

		const applicationGlobalCommandsBody = this.registries.commands.global
			.getAll()
			.map((command) => command.getData.toJSON());

		await this.deployGlobal(applicationGlobalCommandsBody);
	}

	async deployToGuild(
		guild: Guild,
		applicationGuildCommandsBody: RESTPostAPIChatInputApplicationCommandsJSONBody[]
	) {
		const result = await this.rest.put(
			Routes.applicationGuildCommands(this.config.env.DISCORD_OAUTH_CLIENT_ID, guild.id),
			{ body: applicationGuildCommandsBody }
		);
		this.logger.info(`Deployed ${applicationGuildCommandsBody.length} guild commands`, {
			guildId: guild.id,
			result,
		});

		return result;
	}

	async deployToAllGuild(
		applicationGuildCommandsBody: RESTPostAPIChatInputApplicationCommandsJSONBody[]
	) {
		await Promise.allSettled(
			this.client.guilds.cache.map(async (guild) => {
				await this.deployToGuild(guild, applicationGuildCommandsBody);
			})
		);
	}

	async deployGlobal(
		applicationGlobalCommandsBody: RESTPostAPIChatInputApplicationCommandsJSONBody[]
	) {
		const result = await this.rest.put(
			Routes.applicationCommands(this.config.env.DISCORD_OAUTH_CLIENT_ID),
			{
				body: applicationGlobalCommandsBody,
			}
		);

		this.logger.info(`Deployed ${applicationGlobalCommandsBody.length} global commands`, {
			result,
		});

		return result;
	}
}
