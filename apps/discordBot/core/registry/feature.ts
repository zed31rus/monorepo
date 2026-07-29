import type { BaseGuildManagerArgs } from '#core/base/manager/guild.js';
import BaseRegistry from '#core/base/registry.js';
import ServerNameGuildManager from '#core/managers/guild/name.js';
import TemporaryVoiceChannelsGuildManager from '#core/managers/guild/voice.js';
import type { DiscordBotDBType } from '@packages/db';
import { Features } from '@zed31rus/types';

export default class FeatureRegistry extends BaseRegistry {
	features = {
		[Features.serverName]: ServerNameGuildManager,
		[Features.temporaryVoiceChannels]: TemporaryVoiceChannelsGuildManager,
	} satisfies {
		[F in Features]: new (
			guildId: DiscordBotDBType.Prisma.GuildModel['guildId'],
			...args: BaseGuildManagerArgs
		) => object;
	};
}
