import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseService, { type BaseServiceArgs } from '#core/base/service.js';
import { DiscordBotDBType } from '@packages/db';
import { InternalErrors } from '@shared/errors';

type FeatureRegistry = GuildService['registries']['feature']['features'];

type FeatureManagerClass = FeatureRegistry[keyof FeatureRegistry];

type AnyFeatureManager = InstanceType<FeatureManagerClass>;

type FeatureManager<F extends keyof FeatureRegistry> = InstanceType<FeatureRegistry[F]>;

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
		Map<DiscordBotDBType.types.Features, AnyFeatureManager>
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

	async enableFeature(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: DiscordBotDBType.types.Features
	) {
		const guildFeatures = this.features.get(guildId);

		if (guildFeatures?.has(feature)) return;

		const guildRecord = await this.resolveGuildRecord(guildId);

		const error = await this.createManager(guildId, feature);

		await this.db.guilds.features.status.enable(this.db.client, guildRecord, feature);
		if (error) {
			return error;
		}
	}

	async disableFeature(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: DiscordBotDBType.types.Features
	) {
		await this.db.guilds.features.status.disable(this.db.client, guildId, feature);

		const guildFeatures = this.features.get(guildId);

		guildFeatures?.delete(feature);
	}

	getWhereFeature<F extends keyof FeatureRegistry>(feature: F) {
		const result: Array<{
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'];
			instance: FeatureManager<F>;
		}> = [];

		for (const [guildId, guildFeatures] of this.features) {
			const state = guildFeatures.get(feature);

			if (state) {
				result.push({
					guildId,
					instance: state as FeatureManager<F>,
				});
			}
		}

		return result;
	}

	getWhereGuildIdFeature<F extends keyof FeatureRegistry>(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: F
	) {
		const guildFeatures = this.features.get(guildId);

		if (!guildFeatures) return;

		return guildFeatures.get(feature) as FeatureManager<F>;
	}

	getWhereGuildIdFeatureOrThrow<F extends keyof FeatureRegistry>(
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: F
	) {
		const instance = this.getWhereGuildIdFeature(guildId, feature);

		if (!instance) {
			throw this.errors.internal.businessLogic(
				InternalErrors.BusinessLogicErrorMessage.NO_AVAILABLE_OPTIONS
			);
		}

		return instance;
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
		try {
			const managerInstance = new ManagerClass(guildId, ...this.baseGuildManagerArgs);
			guildFeatures.set(feature, managerInstance);
		} catch (e) {
			return e;
		}
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
