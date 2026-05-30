import DbContainer from './src/db.container.js';
import { type PrismaJsonFeatures as PJF } from './types/declarations.js';
import {
	AuthDBType as AuthDbT,
	type InternalUser as IntUser,
	type PersonalUser as PerUser,
	type PublicUser as PubUser,
	type RawUser as RUser,
} from './src/auth/auth.db.js';
import { DiscordBotDBType as DiscordBotDbT } from './src/discordBot/discordbot.db.js';

export default DbContainer;
export type PrismaJsonFeatures = PJF;
export import AuthDBType = AuthDbT;
export import DiscordBotDBType = DiscordBotDbT;
export type RawUser = RUser;
export type PublicUser = PubUser;
export type PersonalUser = PerUser;
export type InternalUser = IntUser;
