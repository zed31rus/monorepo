import type DeployCommandsService from '#core/services/deployCommands.js';
import type GuildService from '#core/services/guild.js';

export default class ServiceContainer {
	constructor(
		readonly deployCommands: DeployCommandsService,
		readonly guild: GuildService
	) {}
}
