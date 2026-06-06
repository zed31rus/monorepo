import authDBs from './auth/auth.db.js';
import DiscordBotDBs from './discordBot/discordbot.db.js';

class DbContainer {
	constructor(
		readonly auth: authDBs,
		readonly discordBot: DiscordBotDBs
	) {}

	static deps = { authDB: authDBs, discordbotDB: DiscordBotDBs };
}

export type authDB = authDBs;
export type discordbotDB = DiscordBotDBs;

export default DbContainer;
