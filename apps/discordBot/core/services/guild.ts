import type BaseGuildManager from '#core/base/manager/guild.js';
import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseService, { type BaseServiceArgs } from '#core/base/service.js';
import { DiscordBotDBType } from '@packages/db';

export default class GuildService extends BaseService {
	private constructor(
		readonly baseGuildManagerArgs: BaseGuildManagerArgs,
		...baseServiceArgs: BaseServiceArgs
	) {
		super(...baseServiceArgs);
	}

	static async create(
		baseGuildManagerArgs: BaseGuildManagerArgs,
		...baseServiceArgs: BaseServiceArgs
	) {
		const service = new GuildService(baseGuildManagerArgs, ...baseServiceArgs);
		await service.init();
		return service;
	}

	features = new Map<
		DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		Map<DiscordBotDBType.types.Features, BaseGuildManager>
	>();

	async init() {
		await Promise.all(
			Object.values(DiscordBotDBType.types.Features).map(async (feature) => {
				const guilds = await this.db.guilds.get.many.whereFeature(this.db.client, feature);

				for (const guild of guilds) {
					await this.createManager(guild.guildId, feature);
				}
			})
		);
	}

	async enableFeature<F extends DiscordBotDBType.types.Features>(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: F
	) {
		const guildRecord = await this.resolveGuildRecord(guildId);
		await this.db.guilds.features.status.enable(this.db.client, guildRecord, feature);
		await this.createManager(guildId, feature);
	}

	async disableFeature(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: DiscordBotDBType.types.Features
	) {
		await this.db.guilds.features.status.disable(this.db.client, guildId, feature);
		const guildFeatures = this.features.get(guildId);
		guildFeatures?.delete(feature);
	}

	private async createManager(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: DiscordBotDBType.types.Features
	) {
		const ManagerClass = this.registries.feature.features[feature];

		let guildFeatures = this.features.get(guildId);

		if (!guildFeatures) {
			guildFeatures = new Map();
			this.features.set(guildId, guildFeatures);
		}

		guildFeatures.set(feature, new ManagerClass(guildId, ...this.baseGuildManagerArgs));
	}

	getWhereFeature<F extends DiscordBotDBType.types.Features>(feature: F) {
		const result: Array<{
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'];
			instance: BaseGuildManager;
		}> = [];

		for (const [guildId, guildFeatures] of this.features) {
			const state = guildFeatures.get(feature);
			if (state) {
				result.push({ guildId, instance: state });
			}
		}

		return result;
	}

	private async resolveGuildRecord(guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId']) {
		return await this.db.client.$transaction(async (tx) => {
			let guildRecord = await this.db.guilds.get.orNull.byGuildId(tx, guildId);
			if (!guildRecord) {
				guildRecord = await this.db.guilds.create.create(tx, guildId);
			}
			return guildRecord;
		});
	}
}
