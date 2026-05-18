import DbContainer from './src/db.container.js';
import { type PrismaJsonFeatures as PJF } from './types/declarations.js'
import { AuthDBType as AuthDbT } from './src/auth/auth.db.js';
import { DiscordBotDBType as DiscordBotDbT } from './src/discordBot/discordbot.db.js';

export default DbContainer
export type PrismaJsonFeatures = PJF;
export import AuthDBType = AuthDbT;
export import DiscordBotDBType =  DiscordBotDbT;

