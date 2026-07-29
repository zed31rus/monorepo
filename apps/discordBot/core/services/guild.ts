import type BaseGuildManager from '#core/base/manager/guild.js';
import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseService, { type BaseServiceArgs } from '#core/base/service.js';
import type { DiscordBotDBType } from '@packages/db';
import { Features } from '@zed31rus/types';

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
		DiscordBotDBType.Prisma.GuildModel['guildId'],
		{
			[F in Features]?: {
				status: boolean;
				instance: BaseGuildManager;
			};
		}
	>();

	async init() {
		await Promise.all(
			Object.values(Features).map(async (feature) => {
				const guilds = await this.db.guilds.get.whereFeature(this.db.client, feature);

				for (const guild of guilds) {
					const ManagerClass = this.registries.feature.features[feature];
					const instance = new ManagerClass(guild.guildId, ...this.baseGuildManagerArgs);

					const existing = this.features.get(guild.guildId) ?? {};

					this.features.set(guild.guildId, {
						...existing,
						[feature]: { status: true, instance },
					});
				}
			})
		);
	}

	getWhereFeature<F extends Features>(feature: F) {
		const result: Array<{
			guildId: DiscordBotDBType.Prisma.GuildModel['guildId'];
			instance: BaseGuildManager;
		}> = [];

		for (const [guildId, guildFeatures] of this.features) {
			const state = guildFeatures[feature];
			if (state?.status) {
				result.push({ guildId, instance: state.instance });
			}
		}

		return result;
	}
}
