import type GuildsService from '#core/services/guild.js';

export default class ServiceContainer {
	constructor(readonly guild: GuildsService) {}
}
