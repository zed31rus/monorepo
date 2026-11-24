/* eslint-disable @typescript-eslint/no-namespace */
import type { DiscordBotDBType } from '../db.js';

declare global {
	namespace PrismaJson {
		type settings = DiscordBotDBType.FeaturesSettings[keyof DiscordBotDBType.FeaturesSettings];
	}
}

export {};
