import type GuildService from '#core/services/guild.js';

export default class ServiceContainer {
	constructor(readonly guild: GuildService) {}
}
