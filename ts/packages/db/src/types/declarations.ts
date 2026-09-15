/* eslint-disable @typescript-eslint/no-namespace */
import type { DiscordBotDBType } from '../discordBot/db.js';

declare global {
	namespace PrismaJson {
		type settings = DiscordBotDBType.FeaturesSettings[keyof DiscordBotDBType.FeaturesSettings];
	}
}

export {};
