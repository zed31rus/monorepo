import authDB from "./auth/auth.db.js";
import DiscordBotDB from "./discordBot/discordbot.db.js";

class DbContainer {
    constructor(
        readonly auth: authDB,
        readonly discordBot: DiscordBotDB
    ) {}

    static deps = { authDB: authDB, discordbotDB: DiscordBotDB }
}

export default DbContainer

