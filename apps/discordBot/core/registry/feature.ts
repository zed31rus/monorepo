import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseRegistry from '#core/base/registry.js';
import ServerNameGuildManager from '#core/managers/guild/name.js';
import TemporaryVoiceChannelsGuildManager from '#core/managers/guild/voice.js';
import { DiscordBotDBType } from '@packages/db';

export default class FeatureRegistry extends BaseRegistry {
	features = {
		[DiscordBotDBType.types.Features.serverName]: ServerNameGuildManager,
		[DiscordBotDBType.types.Features.temporaryVoiceChannels]:
			TemporaryVoiceChannelsGuildManager,
	} satisfies {
		[F in DiscordBotDBType.types.Features]: new (
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
			...args: BaseGuildManagerArgs
		) => object;
	};
}
