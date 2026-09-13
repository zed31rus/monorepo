import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseRegistry from '#core/base/registry.js';
import ServerNameGuildManager from '#core/managers/guild/name.js';
import TemporaryVoiceChannelsGuildManager from '#core/managers/guild/voice.js';
import { DiscordBotDBType } from '@packages/db';

const featuresMap = {
	[DiscordBotDBType.types.Features.serverName]: ServerNameGuildManager,
	[DiscordBotDBType.types.Features.temporaryVoiceChannels]: TemporaryVoiceChannelsGuildManager,
} satisfies {
	[F in DiscordBotDBType.types.Features]: new (
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		...args: BaseGuildManagerArgs
	) => object;
};

export type FeatureManagerClass<F extends DiscordBotDBType.types.Features> =
	(typeof featuresMap)[F];

export type FeatureManagerInstance<F extends DiscordBotDBType.types.Features> = InstanceType<
	FeatureManagerClass<F>
>;

export default class FeatureRegistry extends BaseRegistry {
	features = featuresMap;
}
